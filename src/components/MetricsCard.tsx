import { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: LucideIcon;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    color: 'blue' | 'green' | 'amber' | 'purple';
}

const colorClasses = {
    blue: {
        bg: 'bg-blue-50 dark:bg-blue-500/10',
        border: 'border-blue-200 dark:border-blue-500/20',
        icon: 'from-blue-500 to-blue-600',
        iconShadow: 'shadow-blue-500/30',
        text: 'text-blue-600 dark:text-blue-400',
    },
    green: {
        bg: 'bg-emerald-50 dark:bg-emerald-500/10',
        border: 'border-emerald-200 dark:border-emerald-500/20',
        icon: 'from-emerald-500 to-emerald-600',
        iconShadow: 'shadow-emerald-500/30',
        text: 'text-emerald-600 dark:text-emerald-400',
    },
    amber: {
        bg: 'bg-amber-50 dark:bg-amber-500/10',
        border: 'border-amber-200 dark:border-amber-500/20',
        icon: 'from-amber-500 to-amber-600',
        iconShadow: 'shadow-amber-500/30',
        text: 'text-amber-600 dark:text-amber-400',
    },
    purple: {
        bg: 'bg-purple-50 dark:bg-purple-500/10',
        border: 'border-purple-200 dark:border-purple-500/20',
        icon: 'from-purple-500 to-purple-600',
        iconShadow: 'shadow-purple-500/30',
        text: 'text-purple-600 dark:text-purple-400',
    },
};

export default function MetricsCard({
    title,
    value,
    subtitle,
    icon: Icon,
    trend,
    trendValue,
    color,
}: MetricsCardProps) {
    const colors = colorClasses[color];

    return (
        <div
            className={`relative overflow-hidden rounded-xl sm:rounded-2xl ${colors.bg} border ${colors.border} p-3 sm:p-6 transition-colors duration-200`}
        >
            <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-2 sm:mb-4">
                    <div
                        className={`w-8 sm:w-12 h-8 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${colors.icon} flex items-center justify-center shadow-lg ${colors.iconShadow}`}
                    >
                        <Icon className="w-4 sm:w-6 h-4 sm:h-6 text-white" />
                    </div>
                    {trend && trendValue && (
                        <div
                            className={`hidden sm:flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${trend === 'up'
                                    ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                                    : trend === 'down'
                                        ? 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
                                        : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300'
                                }`}
                        >
                            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
                            {trendValue}
                        </div>
                    )}
                </div>

                {/* Value */}
                <div className="mb-1">
                    <p className="text-lg sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight truncate">{value}</p>
                </div>

                {/* Title & Subtitle */}
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-slate-400 truncate">{title}</p>
                {subtitle && <p className={`text-xs mt-1 ${colors.text} hidden sm:block`}>{subtitle}</p>}
            </div>
        </div>
    );
}
