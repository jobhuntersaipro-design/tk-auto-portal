import { CarStatus, ImportStatus } from '@/types';
import { Ship, Package, CheckCircle, AlertCircle, ShoppingCart } from 'lucide-react';

interface StatusBadgeProps {
    status: CarStatus;
    importStatus?: ImportStatus;
    showImportStatus?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<CarStatus, { label: string; className: string; icon: React.ElementType }> = {
    'in-stock': {
        label: 'In Stock',
        className: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30',
        icon: CheckCircle,
    },
    'in-transit': {
        label: 'In Transit',
        className: 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/30',
        icon: Ship,
    },
    customs: {
        label: 'In Customs',
        className: 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30',
        icon: AlertCircle,
    },
    sold: {
        label: 'Sold',
        className: 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400 border-gray-200 dark:border-slate-600',
        icon: ShoppingCart,
    },
};

const importStatusConfig: Record<ImportStatus, { label: string; className: string }> = {
    shipped: {
        label: 'Shipped',
        className: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    'arrived-port': {
        label: 'At Port',
        className: 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400',
    },
    'customs-clearance': {
        label: 'Customs Clearance',
        className: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    ready: {
        label: 'Ready',
        className: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
};

const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
};

export default function StatusBadge({
    status,
    importStatus,
    showImportStatus = false,
    size = 'md',
}: StatusBadgeProps) {
    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <div className="flex flex-wrap gap-1.5">
            <span
                className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${config.className} ${sizeClasses[size]}`}
            >
                <Icon className="w-3 h-3" />
                {config.label}
            </span>
            {showImportStatus && importStatus && (
                <span
                    className={`inline-flex items-center gap-1 rounded-full font-medium ${importStatusConfig[importStatus].className} ${sizeClasses[size]}`}
                >
                    {importStatusConfig[importStatus].label}
                </span>
            )}
        </div>
    );
}
