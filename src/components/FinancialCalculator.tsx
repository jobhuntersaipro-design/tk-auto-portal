'use client';

import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatCurrency, calculateProfit, getProfitColorClass } from '@/lib/utils';
import { DollarSign, TrendingUp, TrendingDown, Calculator, Package, Wrench, Tag } from 'lucide-react';

interface FinancialCalculatorProps {
    cifPrice: number | '';
    customsDuty: number | '';
    refurbishmentCosts: number | '';
    sellingPrice: number | '';
    isImport: boolean;
    onCifPriceChange: (value: number | '') => void;
    onCustomsDutyChange: (value: number | '') => void;
    onRefurbishmentCostsChange: (value: number | '') => void;
    onSellingPriceChange: (value: number | '') => void;
}

export default function FinancialCalculator({
    cifPrice,
    customsDuty,
    refurbishmentCosts,
    sellingPrice,
    isImport,
    onCifPriceChange,
    onCustomsDutyChange,
    onRefurbishmentCostsChange,
    onSellingPriceChange,
}: FinancialCalculatorProps) {
    const calculations = useMemo(() => {
        const cif = typeof cifPrice === 'number' ? cifPrice : 0;
        const duty = isImport && typeof customsDuty === 'number' ? customsDuty : 0;
        const refurb = typeof refurbishmentCosts === 'number' ? refurbishmentCosts : 0;
        const selling = typeof sellingPrice === 'number' ? sellingPrice : 0;

        return calculateProfit(cif, duty, refurb, selling);
    }, [cifPrice, customsDuty, refurbishmentCosts, sellingPrice, isImport]);

    const handleNumberChange = (
        value: string,
        setter: (value: number | '') => void
    ) => {
        if (value === '') {
            setter('');
        } else {
            const num = parseFloat(value);
            if (!isNaN(num) && num >= 0) {
                setter(num);
            }
        }
    };

    const profitColor = getProfitColorClass(calculations.margin);
    const isProfit = calculations.profit > 0;

    return (
        <div className="space-y-6">
            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CIF Price */}
                <div className="space-y-2">
                    <Label htmlFor="cif-price" className="text-gray-700 dark:text-slate-300 flex items-center gap-2">
                        <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        CIF Price (Cost, Insurance, Freight)
                    </Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-slate-500 text-sm">
                            RM
                        </span>
                        <Input
                            id="cif-price"
                            type="number"
                            min="0"
                            value={cifPrice}
                            onChange={(e) => handleNumberChange(e.target.value, onCifPriceChange)}
                            className="pl-12 bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white"
                            placeholder="0"
                        />
                    </div>
                </div>

                {/* Customs Duty - Only shown for imports */}
                {isImport && (
                    <div className="space-y-2">
                        <Label htmlFor="customs-duty" className="text-gray-700 dark:text-slate-300 flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            Customs Duty Amount
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-slate-500 text-sm">
                                RM
                            </span>
                            <Input
                                id="customs-duty"
                                type="number"
                                min="0"
                                value={customsDuty}
                                onChange={(e) => handleNumberChange(e.target.value, onCustomsDutyChange)}
                                className="pl-12 bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white"
                                placeholder="0"
                            />
                        </div>
                    </div>
                )}

                {/* Refurbishment Costs */}
                <div className="space-y-2">
                    <Label htmlFor="refurb-costs" className="text-gray-700 dark:text-slate-300 flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        Refurbishment Costs
                    </Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-slate-500 text-sm">
                            RM
                        </span>
                        <Input
                            id="refurb-costs"
                            type="number"
                            min="0"
                            value={refurbishmentCosts}
                            onChange={(e) => handleNumberChange(e.target.value, onRefurbishmentCostsChange)}
                            className="pl-12 bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white"
                            placeholder="0"
                        />
                    </div>
                </div>

                {/* Selling Price */}
                <div className="space-y-2">
                    <Label htmlFor="selling-price" className="text-gray-700 dark:text-slate-300 flex items-center gap-2">
                        <Tag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        Target Selling Price
                    </Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-slate-500 text-sm">
                            RM
                        </span>
                        <Input
                            id="selling-price"
                            type="number"
                            min="0"
                            value={sellingPrice}
                            onChange={(e) => handleNumberChange(e.target.value, onSellingPriceChange)}
                            className="pl-12 bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white"
                            placeholder="0"
                        />
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Landed Cost */}
                <div className="rounded-xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Calculator className="w-4 h-4 text-gray-500 dark:text-slate-400" />
                        <span className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                            Landed Cost
                        </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(calculations.landedCost)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">
                        CIF {isImport ? '+ Duty ' : ''}+ Refurb
                    </p>
                </div>

                {/* Projected Profit */}
                <div
                    className={`rounded-xl p-4 border ${calculations.margin < 10
                            ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30'
                            : calculations.margin > 15
                                ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30'
                                : 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30'
                        }`}
                >
                    <div className="flex items-center gap-2 mb-2">
                        {isProfit ? (
                            <TrendingUp className={`w-4 h-4 ${profitColor}`} />
                        ) : (
                            <TrendingDown className={`w-4 h-4 ${profitColor}`} />
                        )}
                        <span className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                            Projected Profit
                        </span>
                    </div>
                    <p className={`text-2xl font-bold ${profitColor}`}>
                        {formatCurrency(calculations.profit)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">
                        {isProfit ? 'Net gain' : 'Net loss'}
                    </p>
                </div>

                {/* Profit Margin */}
                <div
                    className={`rounded-xl p-4 border ${calculations.margin < 10
                            ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30'
                            : calculations.margin > 15
                                ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30'
                                : 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30'
                        }`}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div
                            className={`w-4 h-4 rounded-full ${calculations.margin < 10
                                    ? 'bg-red-500'
                                    : calculations.margin > 15
                                        ? 'bg-emerald-500'
                                        : 'bg-amber-500'
                                }`}
                        />
                        <span className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                            Profit Margin
                        </span>
                    </div>
                    <p className={`text-2xl font-bold ${profitColor}`}>
                        {calculations.margin.toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">
                        {calculations.margin < 10
                            ? 'Below target (< 10%)'
                            : calculations.margin > 15
                                ? 'Excellent margin (> 15%)'
                                : 'Target range (10-15%)'}
                    </p>
                </div>
            </div>

            {/* Warning for low margin */}
            {calculations.margin > 0 && calculations.margin < 10 && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30">
                    <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-red-700 dark:text-red-400">Low Profit Margin Warning</p>
                        <p className="text-xs text-gray-600 dark:text-slate-400 mt-0.5">
                            Consider adjusting the selling price or negotiating lower costs to achieve a healthier margin.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
