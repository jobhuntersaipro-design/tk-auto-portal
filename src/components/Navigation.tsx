'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Car,
    PlusCircle,
    Ship,
    Settings,
    Sun,
    Moon,
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/inventory', label: 'Inventory', icon: Car },
    { href: '/add-car', label: 'Add Car', icon: PlusCircle },
    { href: '/customs', label: 'Customs', icon: Ship },
];

export default function Navigation() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 z-50 shadow-sm transition-colors duration-200">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Car className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">AutoTrack</h1>
                        <p className="text-xs text-gray-500 dark:text-slate-400">Dealership Management</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30'
                                    : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800'
                                }`}
                        >
                            <item.icon
                                className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''
                                    }`}
                            />
                            <span className="font-medium">{item.label}</span>
                            {isActive && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-slate-800 space-y-2">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200"
                >
                    {theme === 'light' ? (
                        <>
                            <Moon className="w-5 h-5" />
                            <span className="font-medium">Dark Mode</span>
                        </>
                    ) : (
                        <>
                            <Sun className="w-5 h-5" />
                            <span className="font-medium">Light Mode</span>
                        </>
                    )}
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                </button>
            </div>
        </aside>
    );
}
