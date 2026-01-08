'use client';

import { ImportStatus } from '@/types';
import StatusTimeline from './StatusTimeline';
import DocumentVault from './DocumentVault';
import { Ship, FileStack } from 'lucide-react';

interface LogisticsCardProps {
    importStatus: ImportStatus;
    documents: string[];
    onImportStatusChange: (status: ImportStatus) => void;
    onDocumentsChange: (docs: string[]) => void;
}

export default function LogisticsCard({
    importStatus,
    documents,
    onImportStatusChange,
    onDocumentsChange,
}: LogisticsCardProps) {
    return (
        <div className="rounded-2xl bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20 overflow-hidden transition-colors duration-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-blue-200 dark:border-blue-500/20 bg-blue-100/50 dark:bg-blue-500/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Ship className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Logistics & Customs</h3>
                        <p className="text-sm text-gray-600 dark:text-slate-400">Track import progress and documents</p>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-8">
                {/* Status Timeline */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-md bg-blue-100 dark:bg-slate-800 flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">1</span>
                        </div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-slate-300">Import Status</h4>
                    </div>
                    <StatusTimeline
                        currentStatus={importStatus}
                        onStatusChange={onImportStatusChange}
                    />
                </div>

                {/* Divider */}
                <div className="border-t border-blue-200 dark:border-slate-700/50" />

                {/* Document Vault */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-md bg-blue-100 dark:bg-slate-800 flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">2</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FileStack className="w-4 h-4 text-gray-500 dark:text-slate-400" />
                            <h4 className="text-sm font-medium text-gray-700 dark:text-slate-300">Document Vault</h4>
                        </div>
                    </div>
                    <DocumentVault
                        documents={documents}
                        onDocumentsChange={onDocumentsChange}
                    />
                </div>
            </div>
        </div>
    );
}
