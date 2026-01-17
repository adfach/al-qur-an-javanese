import { useState, useRef, useEffect, useCallback } from 'react';

export interface AudioPlayerState {
    isPlaying: boolean;
    isPaused: boolean;
    isLoading: boolean;
    error: string | null;
    currentTime: number;
    duration: number;
    volume: number;
}

export interface AudioPlayerControls {
    play: (url: string) => Promise<void>;
    pause: () => void;
    resume: () => void;
    stop: () => void;
    seek: (time: number) => void;
    setVolume: (volume: number) => void;
    playNext?: () => void;
}

export interface UseAudioPlayerOptions {
    autoPlayNext?: boolean;
    onEnded?: () => void;
    onError?: (error: string) => void;
}

/**
 * Hook untuk audio player dengan kontrol pemutaran
 * Mendukung play, pause, stop, seek, dan volume control
 */
export function useAudioPlayer(options: UseAudioPlayerOptions = {}) {
    const { autoPlayNext = false, onEnded, onError } = options;

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [state, setState] = useState<AudioPlayerState>({
        isPlaying: false,
        isPaused: false,
        isLoading: false,
        error: null,
        currentTime: 0,
        duration: 0,
        volume: 1,
    });

    // Initialize audio element
    useEffect(() => {
        audioRef.current = new Audio();

        const audio = audioRef.current;

        // Event listeners
        const handleLoadStart = () => setState(prev => ({ ...prev, isLoading: true }));
        const handleLoadedMetadata = () => {
            setState(prev => ({
                ...prev,
                duration: audio.duration || 0,
                isLoading: false,
            }));
        };
        const handleTimeUpdate = () => {
            setState(prev => ({ ...prev, currentTime: audio.currentTime }));
        };
        const handleEnded = () => {
            setState(prev => ({ ...prev, isPlaying: false, isPaused: false }));
            if (onEnded) onEnded();
            if (autoPlayNext && options.onEnded) {
                options.onEnded();
            }
        };
        const handleError = () => {
            const errorMsg = 'Error loading audio';
            setState(prev => ({ ...prev, error: errorMsg, isLoading: false, isPlaying: false }));
            if (onError) onError(errorMsg);
        };

        audio.addEventListener('loadstart', handleLoadStart);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);

        return () => {
            audio.removeEventListener('loadstart', handleLoadStart);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
            audio.pause();
        };
    }, [autoPlayNext, onEnded, onError]);

    const play = useCallback(async (url: string) => {
        if (!audioRef.current) return;

        try {
            setState(prev => ({ ...prev, isLoading: true, error: null }));

            // Stop current audio if playing
            if (audioRef.current.src) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }

            audioRef.current.src = url;
            await audioRef.current.play();

            setState(prev => ({
                ...prev,
                isPlaying: true,
                isPaused: false,
                isLoading: false,
            }));
        } catch (error) {
            const errorMsg = 'Failed to play audio';
            setState(prev => ({ ...prev, error: errorMsg, isLoading: false, isPlaying: false }));
            if (onError) onError(errorMsg);
        }
    }, [onError]);

    const pause = useCallback(() => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        setState(prev => ({ ...prev, isPlaying: false, isPaused: true }));
    }, []);

    const resume = useCallback(() => {
        if (!audioRef.current) return;
        audioRef.current.play();
        setState(prev => ({ ...prev, isPlaying: true, isPaused: false }));
    }, []);

    const stop = useCallback(() => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setState(prev => ({
            ...prev,
            isPlaying: false,
            isPaused: false,
            currentTime: 0,
        }));
    }, []);

    const seek = useCallback((time: number) => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = time;
        setState(prev => ({ ...prev, currentTime: time }));
    }, []);

    const setVolume = useCallback((volume: number) => {
        if (!audioRef.current) return;
        const clampedVolume = Math.max(0, Math.min(1, volume));
        audioRef.current.volume = clampedVolume;
        setState(prev => ({ ...prev, volume: clampedVolume }));
    }, []);

    const controls: AudioPlayerControls = {
        play,
        pause,
        resume,
        stop,
        seek,
        setVolume,
    };

    return {
        ...state,
        ...controls,
    };
}
