'use client';

import { Car, CarFormData, DEFAULT_FORM_DATA } from '@/types';

const CARS_KEY = 'autotrack_cars';
const FORM_DATA_KEY = 'autotrack_form_data';

// Cars persistence
export function saveCars(cars: Car[]): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(CARS_KEY, JSON.stringify(cars));
    }
}

export function loadCars(): Car[] | null {
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem(CARS_KEY);
        return data ? JSON.parse(data) : null;
    }
    return null;
}

export function clearCars(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(CARS_KEY);
    }
}

// Form data persistence (crash-proof feature)
export function saveFormData(data: CarFormData): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(FORM_DATA_KEY, JSON.stringify(data));
    }
}

export function loadFormData(): CarFormData | null {
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem(FORM_DATA_KEY);
        if (data) {
            const parsed = JSON.parse(data);
            // Check if form has any actual data
            const hasData = Object.keys(parsed).some((key) => {
                const value = parsed[key as keyof CarFormData];
                if (key === 'isImport') return parsed.isImport === true;
                if (key === 'importStatus') return false;
                if (key === 'documents') return (value as string[]).length > 0;
                return value !== '' && value !== DEFAULT_FORM_DATA[key as keyof CarFormData];
            });
            return hasData ? parsed : null;
        }
    }
    return null;
}

export function clearFormData(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(FORM_DATA_KEY);
    }
}

// Generate unique ID
export function generateId(): string {
    return `car_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
