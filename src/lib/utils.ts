import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-MY', {
        style: 'currency',
        currency: 'MYR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatDistanceToNow(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return 'Just now';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    }

    return date.toLocaleDateString('en-MY', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
}

export function calculateProfit(
    cifPrice: number,
    customsDuty: number,
    refurbishmentCosts: number,
    sellingPrice: number
): { landedCost: number; profit: number; margin: number } {
    const landedCost = cifPrice + customsDuty + refurbishmentCosts;
    const profit = sellingPrice - landedCost;
    const margin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;

    return { landedCost, profit, margin };
}

export function getProfitColorClass(margin: number): string {
    if (margin < 10) return 'text-red-400';
    if (margin > 15) return 'text-emerald-400';
    return 'text-amber-400';
}
