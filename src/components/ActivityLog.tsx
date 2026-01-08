'use client';

import { ActivityLogEntry } from '@/types';
import { Ship, ShoppingCart, Package, RefreshCw, Clock } from 'lucide-react';
import { formatDistanceToNow } from '@/lib/utils';

interface ActivityLogProps {
    entries: ActivityLogEntry[];
    maxEntries?: number;
}

const typeConfig: Record<
    ActivityLogEntry['type'],
    { icon: React.ElementType; className: string }
> = {
    customs: {
        icon: Ship,
        className: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400',
    },
    sale: {
        icon: ShoppingCart,
        className: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    },
    arrival: {
        icon: Package,
        className: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
    },
    update: {
        icon: RefreshCw,
        className: 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400',
    },
};

export default function ActivityLog({ entries, maxEntries = 10 }: ActivityLogProps) {
    const displayEntries = entries.slice(0, maxEntries);

    return (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-white" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Activity Log</h2>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-slate-500">{entries.length} entries</span>
                </div>
            </div>

            {/* Entries */}
            <div className="divide-y divide-gray-100 dark:divide-slate-800 max-h-[400px] overflow-y-auto">
                {displayEntries.map((entry, index) => {
                    const config = typeConfig[entry.type];
                    const Icon = config.icon;

                    return (
                        <div
                            key={entry.id}
                            className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors duration-200"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${config.className}`}
                                >
                                    <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 dark:text-slate-200 leading-relaxed">
                                        {entry.message}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">
                                        {formatDistanceToNow(new Date(entry.timestamp))}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
