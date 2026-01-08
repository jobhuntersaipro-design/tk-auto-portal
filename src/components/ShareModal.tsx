'use client';

import { useEffect, useState } from 'react';
import { Car } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { X, Copy, Check, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    car: Car;
}

export default function ShareModal({ isOpen, onClose, car }: ShareModalProps) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const shareMessage = `*${car.year} ${car.make} ${car.model}*

Status: ${car.status === 'in-stock' ? 'Available Now' : car.status === 'customs' ? 'Coming Soon (In Customs)' : car.status === 'in-transit' ? 'In Transit' : 'Sold'}
Color: ${car.color}
Mileage: ${car.mileage.toLocaleString()} km
${car.isImport ? 'Type: Imported Vehicle' : 'Type: Local Unit'}

Price: ${formatCurrency(car.sellingPrice)}

Contact us for more details or to schedule a viewing.
VIN: ${car.vin}

AutoTrack Dealership`;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(shareMessage);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleWhatsApp = () => {
        const encodedMessage = encodeURIComponent(shareMessage);
        window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            <Send className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Share Listing</h3>
                            <p className="text-sm text-gray-500 dark:text-slate-400">{car.make} {car.model}</p>
                        </div>
                    </div>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={onClose}
                        className="w-8 h-8 hover:bg-gray-100 dark:hover:bg-slate-800"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Preview */}
                    <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 mb-4 border border-gray-200 dark:border-slate-700">
                        <pre className="text-sm text-gray-700 dark:text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                            {shareMessage}
                        </pre>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Button
                            onClick={handleCopy}
                            className="flex-1 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4 mr-2" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy Message
                                </>
                            )}
                        </Button>
                        <Button
                            onClick={handleWhatsApp}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white"
                        >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            WhatsApp
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
