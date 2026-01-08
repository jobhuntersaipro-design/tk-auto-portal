'use client';

import { useEffect, useState } from 'react';
import { Car } from '@/types';
import { mockCars, mockActivityLog } from '@/data/mockData';
import { loadCars, saveCars } from '@/lib/localStorage';
import { formatCurrency, calculateProfit } from '@/lib/utils';
import MetricsCard from '@/components/MetricsCard';
import ActivityLog from '@/components/ActivityLog';
import { DollarSign, TrendingUp, Ship, Car as CarIcon, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
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

  // Calculate metrics
  const totalInventoryValue = cars
    .filter((car) => car.status !== 'sold')
    .reduce((sum, car) => sum + car.sellingPrice, 0);

  const projectedNetProfit = cars
    .filter((car) => car.status !== 'sold')
    .reduce((sum, car) => {
      const { profit } = calculateProfit(
        car.cifPrice,
        car.customsDuty,
        car.refurbishmentCosts,
        car.sellingPrice
      );
      return sum + profit;
    }, 0);

  const unitsInCustoms = cars.filter(
    (car) => car.status === 'customs' || car.importStatus === 'customs-clearance'
  ).length;

  const totalUnits = cars.filter((car) => car.status !== 'sold').length;

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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-slate-400">Welcome back! Here's an overview of your dealership.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
        <MetricsCard
          title="Total Inventory Value"
          value={formatCurrency(totalInventoryValue)}
          icon={DollarSign}
          color="blue"
          subtitle={`${totalUnits} units in stock`}
        />
        <MetricsCard
          title="Projected Net Profit"
          value={formatCurrency(projectedNetProfit)}
          icon={TrendingUp}
          color="green"
          trend="up"
          trendValue="12.5%"
        />
        <MetricsCard
          title="Units in Customs"
          value={unitsInCustoms}
          icon={Ship}
          color="amber"
          subtitle="Pending clearance"
        />
        <MetricsCard
          title="Total Inventory"
          value={totalUnits}
          icon={CarIcon}
          color="purple"
          subtitle={`${cars.filter((c) => c.status === 'sold').length} sold this month`}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Activity Log */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <ActivityLog entries={mockActivityLog} maxEntries={8} />
        </div>

        {/* Quick Actions */}
        <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm transition-colors duration-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/add-car">
                <Button className="w-full justify-between bg-blue-600 hover:bg-blue-700 text-white">
                  Add New Vehicle
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/inventory">
                <Button variant="outline" className="w-full justify-between border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800">
                  View Inventory
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/customs">
                <Button variant="outline" className="w-full justify-between border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800">
                  Customs Tracking
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Customs Alert */}
          {unitsInCustoms > 0 && (
            <div className="rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 p-4 sm:p-6 transition-colors duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
                  <Ship className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-700 dark:text-amber-400">Customs Alert</h4>
                  <p className="text-sm text-amber-600 dark:text-slate-400">{unitsInCustoms} units pending</p>
                </div>
              </div>
              <p className="text-sm text-amber-700 dark:text-slate-400 mb-4">
                You have vehicles awaiting customs clearance. Check status and required documents.
              </p>
              <Link href="/customs">
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                  View Details
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
