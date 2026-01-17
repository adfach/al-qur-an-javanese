import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle, Send, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const FeedbackModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        try {
            // Using formsubmit.co to send emails without a backend
            const response = await fetch("https://formsubmit.co/ajax/aditya17fakhri@gmail.com", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setIsSent(true);
                toast({
                    title: "Berhasil Terkirim!",
                    description: "Terima kasih atas saran dan masukan Anda.",
                });
                setTimeout(() => {
                    setIsOpen(false);
                    setIsSent(false);
                }, 2000);
            } else {
                throw new Error("Failed to send");
            }
        } catch (error) {
            toast({
                title: "Gagal Mengirim",
                description: "Maaf, terjadi kesalahan saat mengirim masukan. Silakan coba lagi nanti.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-primary transition-colors relative"
                    title="Saran & Masukan"
                >
                    <AlertCircle className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-primary" />
                        Saran & Masukan
                    </DialogTitle>
                    <DialogDescription>
                        Bantu kami mengembangkan Al-Qur'an Javanese menjadi lebih baik.
                    </DialogDescription>
                </DialogHeader>

                {isSent ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center animate-fade-in">
                        <CheckCircle2 className="w-16 h-16 text-primary mb-4" />
                        <h3 className="text-lg font-semibold">Terkirim!</h3>
                        <p className="text-sm text-muted-foreground">Masukan Anda sangat berharga bagi kami.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        {/* Hidden field for formsubmit.co configuration */}
                        <input type="hidden" name="_subject" value="Saran Masukan Baru - Al-Quran Javanese" />
                        <input type="hidden" name="_template" value="table" />

                        <div className="space-y-2">
                            <Label htmlFor="name">Nama / Anonim</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Masukkan nama Anda..."
                                required
                                className="bg-muted/50 focus:bg-background"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Alamat Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="email@contoh.com"
                                required
                                className="bg-muted/50 focus:bg-background"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">Saran & Masukan</Label>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="Tuliskan saran atau masukan Anda di sini..."
                                required
                                className="min-h-[120px] bg-muted/50 focus:bg-background"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>Menghubungkan...</>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Kirim Masukan
                                </>
                            )}
                        </Button>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
};
