'use client';

import { useEffect, useState } from 'react';
import { Car } from '@/types';
import { mockCars } from '@/data/mockData';
import { loadCars, saveCars } from '@/lib/localStorage';
import { formatCurrency } from '@/lib/utils';
import StatusBadge from '@/components/StatusBadge';
import {
    Ship,
    Anchor,
    FileCheck,
    CheckCircle,
    AlertTriangle,
    Clock,
    FileText,
    ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const importStatusLabels = {
    shipped: { label: 'Shipped', description: 'In transit from origin', icon: Ship },
    'arrived-port': { label: 'Arrived at Port', description: 'Awaiting customs processing', icon: Anchor },
    'customs-clearance': { label: 'Customs Clearance', description: 'Under review by customs', icon: FileCheck },
    ready: { label: 'Ready', description: 'Cleared and ready for sale', icon: CheckCircle },
};

export default function CustomsPage() {
    const [cars, setCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedCars = loadCars();
        if (storedCars && storedCars.length > 0) {
            setCars(storedCars);
        } else {
            setCars(mockCars);
            saveCars(mockCars);
        }
        setIsLoading(false);
    }, []);

    const importCars = cars.filter((car) => car.isImport && car.status !== 'sold');
    const carsInCustoms = importCars.filter(
        (car) => car.importStatus === 'customs-clearance'
    );
    const carsAtPort = importCars.filter((car) => car.importStatus === 'arrived-port');
    const carsShipped = importCars.filter((car) => car.importStatus === 'shipped');
    const carsReady = importCars.filter((car) => car.importStatus === 'ready');

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6 lg:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">Customs Tracking</h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-slate-400">
                    Monitor import status and customs clearance
                </p>
            </div>

            {/* Status Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 lg:mb-8">
                <div className="rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 p-3 sm:p-4 transition-colors duration-200">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <Ship className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-slate-300">Shipped</span>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{carsShipped.length}</p>
                </div>
                <div className="rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 p-3 sm:p-4 transition-colors duration-200">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <Anchor className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600 dark:text-purple-400" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-slate-300">At Port</span>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{carsAtPort.length}</p>
                </div>
                <div className="rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 p-3 sm:p-4 transition-colors duration-200">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <FileCheck className="w-4 sm:w-5 h-4 sm:h-5 text-amber-600 dark:text-amber-400" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-slate-300">Customs</span>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{carsInCustoms.length}</p>
                </div>
                <div className="rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 p-3 sm:p-4 transition-colors duration-200">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-slate-300">Ready</span>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{carsReady.length}</p>
                </div>
            </div>

            {/* Customs Alert Section */}
            {carsInCustoms.length > 0 && (
                <div className="mb-6 lg:mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Pending Customs Clearance</h2>
                    </div>
                    <div className="space-y-4">
                        {carsInCustoms.map((car) => (
                            <div
                                key={car.id}
                                className="rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 p-4 sm:p-5 transition-colors duration-200"
                            >
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-5 sm:w-6 h-5 sm:h-6 text-amber-600 dark:text-amber-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                                                {car.year} {car.make} {car.model}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-400 font-medium mt-1">
                                                Pending Tax Valuation
                                            </p>
                                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2">
                                                <span className="text-xs text-gray-600 dark:text-slate-400 truncate">VIN: {car.vin}</span>
                                                <span className="text-xs text-gray-600 dark:text-slate-400">
                                                    Duty: {formatCurrency(car.customsDuty)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        {car.documents && car.documents.length > 0 && (
                                            <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-slate-400">
                                                <FileText className="w-4 h-4" />
                                                {car.documents.length} docs
                                            </div>
                                        )}
                                        <Link href="/inventory" className="ml-auto">
                                            <Button size="sm" variant="outline" className="border-amber-300 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-500/10">
                                                View Details
                                                <ExternalLink className="w-3 h-3 ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* All Import Vehicles */}
            <div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">All Import Vehicles</h2>
                {importCars.length > 0 ? (
                    <>
                        {/* Mobile Cards */}
                        <div className="lg:hidden space-y-4">
                            {importCars.map((car) => {
                                const statusInfo = car.importStatus
                                    ? importStatusLabels[car.importStatus]
                                    : importStatusLabels.shipped;
                                const StatusIcon = statusInfo.icon;

                                return (
                                    <div
                                        key={car.id}
                                        className="rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-4 transition-colors duration-200"
                                    >
                                        <div className="flex items-start justify-between gap-3 mb-3">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {car.make} {car.model}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-slate-400">{car.year} • {car.color}</p>
                                            </div>
                                            <StatusBadge status={car.status} size="sm" />
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <StatusIcon
                                                    className={`w-4 h-4 ${car.importStatus === 'ready'
                                                            ? 'text-emerald-600 dark:text-emerald-400'
                                                            : car.importStatus === 'customs-clearance'
                                                                ? 'text-amber-600 dark:text-amber-400'
                                                                : car.importStatus === 'arrived-port'
                                                                    ? 'text-purple-600 dark:text-purple-400'
                                                                    : 'text-blue-600 dark:text-blue-400'
                                                        }`}
                                                />
                                                <span className="text-gray-700 dark:text-slate-300">{statusInfo.label}</span>
                                            </div>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {formatCurrency(car.customsDuty)}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Desktop Table */}
                        <div className="hidden lg:block rounded-xl border border-gray-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-200">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-slate-800">
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                                            Vehicle
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                                            Import Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                                            Customs Duty
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                                            Documents
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                    {importCars.map((car) => {
                                        const statusInfo = car.importStatus
                                            ? importStatusLabels[car.importStatus]
                                            : importStatusLabels.shipped;
                                        const StatusIcon = statusInfo.icon;

                                        return (
                                            <tr key={car.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            {car.make} {car.model}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-slate-400">{car.year} • {car.color}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge status={car.status} size="sm" />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <StatusIcon
                                                            className={`w-4 h-4 ${car.importStatus === 'ready'
                                                                    ? 'text-emerald-600 dark:text-emerald-400'
                                                                    : car.importStatus === 'customs-clearance'
                                                                        ? 'text-amber-600 dark:text-amber-400'
                                                                        : car.importStatus === 'arrived-port'
                                                                            ? 'text-purple-600 dark:text-purple-400'
                                                                            : 'text-blue-600 dark:text-blue-400'
                                                                }`}
                                                        />
                                                        <span className="text-sm text-gray-700 dark:text-slate-300">{statusInfo.label}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {formatCurrency(car.customsDuty)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1">
                                                        <FileText className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                                                        <span className="text-sm text-gray-600 dark:text-slate-400">
                                                            {car.documents?.length || 0} attached
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12 sm:py-16 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-200">
                        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                            <Ship className="w-8 h-8 text-gray-400 dark:text-slate-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No import vehicles</h3>
                        <p className="text-gray-600 dark:text-slate-400 mb-6 px-4">
                            Add imported vehicles to track their customs status
                        </p>
                        <Link href="/add-car">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                Add Import Vehicle
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
