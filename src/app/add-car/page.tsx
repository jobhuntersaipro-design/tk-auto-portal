'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Car, CarFormData, DEFAULT_FORM_DATA } from '@/types';
import {
    loadFormData,
    saveFormData,
    clearFormData,
    loadCars,
    saveCars,
    generateId,
} from '@/lib/localStorage';
import ImportToggle from '@/components/ImportToggle';
import LogisticsCard from '@/components/LogisticsCard';
import FinancialCalculator from '@/components/FinancialCalculator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Car as CarIcon,
    Save,
    RotateCcw,
    Check,
    AlertCircle,
    Palette,
    Gauge,
    Hash,
    Building,
} from 'lucide-react';

export default function AddCarPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<CarFormData>(DEFAULT_FORM_DATA);
    const [showRecovery, setShowRecovery] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Load saved form data on mount
    useEffect(() => {
        const saved = loadFormData();
        if (saved) {
            setShowRecovery(true);
        }
    }, []);

    // Auto-save on form changes
    useEffect(() => {
        const hasData = Object.keys(formData).some((key) => {
            const value = formData[key as keyof CarFormData];
            if (key === 'isImport') return formData.isImport;
            if (key === 'importStatus') return false;
            if (key === 'documents') return (value as string[]).length > 0;
            return value !== '' && value !== DEFAULT_FORM_DATA[key as keyof CarFormData];
        });

        if (hasData) {
            saveFormData(formData);
        }
    }, [formData]);

    const handleRecover = () => {
        const saved = loadFormData();
        if (saved) {
            setFormData(saved);
        }
        setShowRecovery(false);
    };

    const handleDiscard = () => {
        clearFormData();
        setShowRecovery(false);
    };

    const handleReset = () => {
        setFormData(DEFAULT_FORM_DATA);
        clearFormData();
    };

    const updateField = useCallback(
        <K extends keyof CarFormData>(field: K, value: CarFormData[K]) => {
            setFormData((prev) => ({ ...prev, [field]: value }));
        },
        []
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        // Simulate save delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newCar: Car = {
            id: generateId(),
            make: formData.make,
            model: formData.model,
            year: typeof formData.year === 'number' ? formData.year : new Date().getFullYear(),
            image: '/cars/mustang.png',
            status: formData.isImport
                ? formData.importStatus === 'ready'
                    ? 'in-stock'
                    : formData.importStatus === 'customs-clearance'
                        ? 'customs'
                        : 'in-transit'
                : 'in-stock',
            isImport: formData.isImport,
            importStatus: formData.isImport ? formData.importStatus : undefined,
            cifPrice: typeof formData.cifPrice === 'number' ? formData.cifPrice : 0,
            customsDuty: typeof formData.customsDuty === 'number' ? formData.customsDuty : 0,
            refurbishmentCosts:
                typeof formData.refurbishmentCosts === 'number' ? formData.refurbishmentCosts : 0,
            sellingPrice: typeof formData.sellingPrice === 'number' ? formData.sellingPrice : 0,
            color: formData.color,
            mileage: typeof formData.mileage === 'number' ? formData.mileage : 0,
            vin: formData.vin,
            dateAdded: new Date().toISOString().split('T')[0],
            documents: formData.documents,
        };

        const existingCars = loadCars() || [];
        saveCars([newCar, ...existingCars]);
        clearFormData();

        setIsSaving(false);
        setShowSuccess(true);

        setTimeout(() => {
            router.push('/inventory');
        }, 1500);
    };

    if (showSuccess) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="text-center">
                    <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                        <Check className="w-8 sm:w-10 h-8 sm:h-10 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">Vehicle Added!</h2>
                    <p className="text-gray-600 dark:text-slate-400">Redirecting to inventory...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
            {/* Recovery Banner */}
            {showRecovery && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Unsaved form data found</p>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400">
                                Recover your previous progress?
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 ml-13 sm:ml-0">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDiscard}
                            className="border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300"
                        >
                            Discard
                        </Button>
                        <Button size="sm" onClick={handleRecover} className="bg-blue-600 hover:bg-blue-700 text-white">
                            Recover
                        </Button>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">Add New Vehicle</h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-slate-400">
                        Data auto-saves as you type
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={handleReset}
                    className="border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 w-full sm:w-auto"
                >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Form
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
                {/* Basic Info Card */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm transition-colors duration-200">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
                            <CarIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Vehicle Information</h2>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400">Basic details about the vehicle</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="make" className="text-gray-700 dark:text-slate-300 flex items-center gap-2 text-sm">
                                <Building className="w-4 h-4 text-gray-500 dark:text-slate-400" />
                                Make / Brand
                            </Label>
                            <Input
                                id="make"
                                value={formData.make}
                                onChange={(e) => updateField('make', e.target.value)}
                                placeholder="e.g., Toyota"
                                className="bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="model" className="text-gray-700 dark:text-slate-300 flex items-center gap-2 text-sm">
                                <CarIcon className="w-4 h-4 text-gray-500 dark:text-slate-400" />
                                Model
                            </Label>
                            <Input
                                id="model"
                                value={formData.model}
                                onChange={(e) => updateField('model', e.target.value)}
                                placeholder="e.g., GR Supra"
                                className="bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="year" className="text-gray-700 dark:text-slate-300 text-sm">Year</Label>
                            <Input
                                id="year"
                                type="number"
                                min="1900"
                                max="2030"
                                value={formData.year}
                                onChange={(e) =>
                                    updateField('year', e.target.value ? parseInt(e.target.value) : '')
                                }
                                placeholder="e.g., 2024"
                                className="bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="color" className="text-gray-700 dark:text-slate-300 flex items-center gap-2 text-sm">
                                <Palette className="w-4 h-4 text-gray-500 dark:text-slate-400" />
                                Color
                            </Label>
                            <Input
                                id="color"
                                value={formData.color}
                                onChange={(e) => updateField('color', e.target.value)}
                                placeholder="e.g., Phantom Grey"
                                className="bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="mileage" className="text-gray-700 dark:text-slate-300 flex items-center gap-2 text-sm">
                                <Gauge className="w-4 h-4 text-gray-500 dark:text-slate-400" />
                                Mileage (km)
                            </Label>
                            <Input
                                id="mileage"
                                type="number"
                                min="0"
                                value={formData.mileage}
                                onChange={(e) =>
                                    updateField('mileage', e.target.value ? parseInt(e.target.value) : '')
                                }
                                placeholder="e.g., 5000"
                                className="bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="vin" className="text-gray-700 dark:text-slate-300 flex items-center gap-2 text-sm">
                                <Hash className="w-4 h-4 text-gray-500 dark:text-slate-400" />
                                VIN Number
                            </Label>
                            <Input
                                id="vin"
                                value={formData.vin}
                                onChange={(e) => updateField('vin', e.target.value.toUpperCase())}
                                placeholder="e.g., 1HGBH41JXMN109186"
                                className="bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white font-mono text-sm"
                                maxLength={17}
                            />
                        </div>
                    </div>
                </div>

                {/* Import Toggle */}
                <ImportToggle
                    isImport={formData.isImport}
                    onChange={(value) => updateField('isImport', value)}
                />

                {/* Logistics Card - Conditional */}
                <div
                    className={`transition-all duration-500 ease-out overflow-hidden ${formData.isImport
                            ? 'max-h-[1000px] opacity-100'
                            : 'max-h-0 opacity-0'
                        }`}
                >
                    {formData.isImport && (
                        <LogisticsCard
                            importStatus={formData.importStatus}
                            documents={formData.documents}
                            onImportStatusChange={(status) => updateField('importStatus', status)}
                            onDocumentsChange={(docs) => updateField('documents', docs)}
                        />
                    )}
                </div>

                {/* Financial Calculator */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm transition-colors duration-200">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
                            <span className="text-lg font-bold text-white">$</span>
                        </div>
                        <div>
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Financial Intelligence</h2>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400">Calculate costs and projected profit</p>
                        </div>
                    </div>

                    <FinancialCalculator
                        cifPrice={formData.cifPrice}
                        customsDuty={formData.customsDuty}
                        refurbishmentCosts={formData.refurbishmentCosts}
                        sellingPrice={formData.sellingPrice}
                        isImport={formData.isImport}
                        onCifPriceChange={(value) => updateField('cifPrice', value)}
                        onCustomsDutyChange={(value) => updateField('customsDuty', value)}
                        onRefurbishmentCostsChange={(value) => updateField('refurbishmentCosts', value)}
                        onSellingPriceChange={(value) => updateField('sellingPrice', value)}
                    />
                </div>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push('/inventory')}
                        className="border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 order-2 sm:order-1"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSaving || !formData.make || !formData.model}
                        className="bg-blue-600 hover:bg-blue-700 text-white min-w-[140px] order-1 sm:order-2"
                    >
                        {isSaving ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Save Vehicle
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
