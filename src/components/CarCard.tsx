'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Car } from '@/types';
import { formatCurrency, calculateProfit, getProfitColorClass } from '@/lib/utils';
import StatusBadge from './StatusBadge';
import ShareModal from './ShareModal';
import { Share2, TrendingUp, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CarCardProps {
    car: Car;
}

export default function CarCard({ car }: CarCardProps) {
    const [isShareOpen, setIsShareOpen] = useState(false);
    const { profit, margin } = calculateProfit(
        car.cifPrice,
        car.customsDuty,
        car.refurbishmentCosts,
        car.sellingPrice
    );

    return (
        <>
            <div className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg hover:border-gray-300 dark:hover:border-slate-700 transition-all duration-300">
                {/* Image Container */}
                <div className="relative h-48 bg-gray-100 dark:bg-slate-800 overflow-hidden">
                    <Image
                        src={car.image}
                        alt={`${car.year} ${car.make} ${car.model}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Import badge */}
                    {car.isImport && (
                        <div className="absolute top-3 left-3">
                            <span className="px-2 py-1 rounded-md bg-blue-600 text-white text-xs font-medium shadow-sm">
                                Imported
                            </span>
                        </div>
                    )}

                    {/* Share button */}
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setIsShareOpen(true)}
                        className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    >
                        <Share2 className="w-4 h-4 text-gray-700 dark:text-slate-300" />
                    </Button>
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Header */}
                    <div className="mb-3">
                        <p className="text-xs font-medium text-gray-500 dark:text-slate-500 uppercase tracking-wider mb-1">
                            {car.make}
                        </p>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                            {car.model}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-slate-400">{car.year} • {car.color}</p>
                    </div>

                    {/* Status */}
                    <div className="mb-4">
                        <StatusBadge
                            status={car.status}
                            importStatus={car.importStatus}
                            showImportStatus={car.isImport}
                        />
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400">
                            <Gauge className="w-4 h-4" />
                            <span className="text-sm">{car.mileage.toLocaleString()} km</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                            <span className={`text-sm font-medium ${getProfitColorClass(margin)}`}>
                                {margin.toFixed(1)}% margin
                            </span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 dark:text-slate-500">Selling Price</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(car.sellingPrice)}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-500 dark:text-slate-500">Net Profit</p>
                            <p className={`text-lg font-bold ${getProfitColorClass(margin)}`}>
                                {formatCurrency(profit)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <ShareModal
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                car={car}
            />
        </>
    );
}
