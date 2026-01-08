'use client';

import { useEffect, useState } from 'react';
import { Car, CarStatus } from '@/types';
import { mockCars } from '@/data/mockData';
import { loadCars, saveCars } from '@/lib/localStorage';
import CarCard from '@/components/CarCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import Link from 'next/link';

const statusFilters: { value: CarStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'in-stock', label: 'In Stock' },
    { value: 'in-transit', label: 'Transit' },
    { value: 'customs', label: 'Customs' },
    { value: 'sold', label: 'Sold' },
];

export default function InventoryPage() {
    const [cars, setCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<CarStatus | 'all'>('all');

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

    const filteredCars = cars.filter((car) => {
        const matchesSearch =
            searchQuery === '' ||
            car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.vin.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || car.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">Inventory</h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-slate-400">
                        {cars.length} total vehicles
                    </p>
                </div>
                <Link href="/add-car">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Vehicle
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 mb-6 lg:mb-8">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
                    <Input
                        placeholder="Search make, model, or VIN..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-500"
                    />
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                    {statusFilters.map((filter) => (
                        <Button
                            key={filter.value}
                            variant={statusFilter === filter.value ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setStatusFilter(filter.value)}
                            className={`flex-shrink-0 ${statusFilter === filter.value
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                                }`}
                        >
                            {filter.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Results count */}
            <div className="mb-4 sm:mb-6">
                <p className="text-sm text-gray-600 dark:text-slate-400">
                    Showing {filteredCars.length} of {cars.length} vehicles
                </p>
            </div>

            {/* Grid */}
            {filteredCars.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {filteredCars.map((car) => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 sm:py-16">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-gray-400 dark:text-slate-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No vehicles found</h3>
                    <p className="text-gray-600 dark:text-slate-400 mb-6">
                        Try adjusting your search or filter
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setSearchQuery('');
                            setStatusFilter('all');
                        }}
                        className="border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300"
                    >
                        Clear filters
                    </Button>
                </div>
            )}
        </div>
    );
}
