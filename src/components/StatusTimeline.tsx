'use client';

import { ImportStatus } from '@/types';
import { Ship, Anchor, FileCheck, CheckCircle } from 'lucide-react';

interface StatusTimelineProps {
    currentStatus: ImportStatus;
    onStatusChange: (status: ImportStatus) => void;
}

const steps: { status: ImportStatus; label: string; icon: React.ElementType }[] = [
    { status: 'shipped', label: 'Shipped', icon: Ship },
    { status: 'arrived-port', label: 'Arrived at Port', icon: Anchor },
    { status: 'customs-clearance', label: 'Customs Clearance', icon: FileCheck },
    { status: 'ready', label: 'Ready', icon: CheckCircle },
];

const statusOrder: ImportStatus[] = ['shipped', 'arrived-port', 'customs-clearance', 'ready'];

export default function StatusTimeline({ currentStatus, onStatusChange }: StatusTimelineProps) {
    const currentIndex = statusOrder.indexOf(currentStatus);

    return (
        <div className="relative">
            {/* Progress bar background */}
            <div className="absolute top-6 left-8 right-8 h-1 bg-gray-200 dark:bg-slate-700 rounded-full" />

            {/* Progress bar fill */}
            <div
                className="absolute top-6 left-8 h-1 bg-blue-600 rounded-full transition-all duration-500 ease-out"
                style={{
                    width: `calc(${(currentIndex / (steps.length - 1)) * 100}% - ${currentIndex === steps.length - 1 ? '0px' : '0px'})`,
                    maxWidth: 'calc(100% - 64px)',
                }}
            />

            {/* Steps */}
            <div className="relative flex justify-between">
                {steps.map((step, index) => {
                    const isActive = index <= currentIndex;
                    const isCurrent = step.status === currentStatus;
                    const Icon = step.icon;

                    return (
                        <button
                            key={step.status}
                            onClick={() => onStatusChange(step.status)}
                            className="flex flex-col items-center gap-2 group"
                        >
                            {/* Circle */}
                            <div
                                className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isCurrent
                                        ? 'bg-blue-600 shadow-lg shadow-blue-500/30 scale-110'
                                        : isActive
                                            ? 'bg-blue-500'
                                            : 'bg-gray-200 dark:bg-slate-700 group-hover:bg-gray-300 dark:group-hover:bg-slate-600'
                                    } border-2 ${isCurrent
                                        ? 'border-blue-400'
                                        : isActive
                                            ? 'border-blue-400/50'
                                            : 'border-gray-300 dark:border-slate-600 group-hover:border-gray-400 dark:group-hover:border-slate-500'
                                    }`}
                            >
                                <Icon
                                    className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-gray-500 dark:text-slate-400 group-hover:text-gray-600 dark:group-hover:text-slate-300'
                                        }`}
                                />
                                {isCurrent && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
                                )}
                            </div>

                            {/* Label */}
                            <span
                                className={`text-xs font-medium text-center max-w-[80px] transition-colors ${isCurrent
                                        ? 'text-blue-600 dark:text-blue-400'
                                        : isActive
                                            ? 'text-gray-700 dark:text-slate-300'
                                            : 'text-gray-500 dark:text-slate-500 group-hover:text-gray-600 dark:group-hover:text-slate-400'
                                    }`}
                            >
                                {step.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
