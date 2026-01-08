'use client';

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Ship, Globe } from 'lucide-react';

interface ImportToggleProps {
    isImport: boolean;
    onChange: (value: boolean) => void;
}

export default function ImportToggle({ isImport, onChange }: ImportToggleProps) {
    return (
        <div
            className={`relative rounded-2xl border p-6 transition-all duration-300 ${isImport
                    ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 shadow-lg'
                    : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 shadow-sm'
                }`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isImport
                                ? 'bg-blue-600 shadow-lg shadow-blue-500/30'
                                : 'bg-gray-100 dark:bg-slate-800'
                            }`}
                    >
                        {isImport ? (
                            <Ship className="w-6 h-6 text-white" />
                        ) : (
                            <Globe className="w-6 h-6 text-gray-500 dark:text-slate-400" />
                        )}
                    </div>
                    <div>
                        <Label
                            htmlFor="import-toggle"
                            className="text-base font-semibold text-gray-900 dark:text-white cursor-pointer"
                        >
                            Is this an Imported Unit?
                        </Label>
                        <p className="text-sm text-gray-600 dark:text-slate-400 mt-0.5">
                            {isImport
                                ? 'Import mode enabled - Track logistics & customs'
                                : 'Toggle to enable import tracking features'}
                        </p>
                    </div>
                </div>
                <Switch
                    id="import-toggle"
                    checked={isImport}
                    onCheckedChange={onChange}
                    className="data-[state=checked]:bg-blue-600"
                />
            </div>

            {/* Animated indicator */}
            <div
                className={`absolute bottom-0 left-0 h-1 rounded-b-2xl bg-blue-600 transition-all duration-500 ease-out ${isImport ? 'w-full' : 'w-0'
                    }`}
            />
        </div>
    );
}
