'use client';

import { useState } from 'react';
import { Upload, FileText, Check } from 'lucide-react';

interface DocumentVaultProps {
    documents: string[];
    onDocumentsChange: (docs: string[]) => void;
}

const documentTypes = [
    { id: 'ap', name: 'AP Certificate', description: 'Approval Permit' },
    { id: 'k1', name: 'K1 Form', description: 'Customs Declaration' },
    { id: 'bol', name: 'Bill of Lading', description: 'Shipping Document' },
];

export default function DocumentVault({ documents, onDocumentsChange }: DocumentVaultProps) {
    const [isDragging, setIsDragging] = useState(false);

    const toggleDocument = (docName: string) => {
        if (documents.includes(docName)) {
            onDocumentsChange(documents.filter((d) => d !== docName));
        } else {
            onDocumentsChange([...documents, docName]);
        }
    };

    return (
        <div className="space-y-4">
            {/* Drop zone */}
            <div
                onDragEnter={() => setIsDragging(true)}
                onDragLeave={() => setIsDragging(false)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    // Simulated - just toggle a document
                    if (!documents.includes('AP Certificate')) {
                        onDocumentsChange([...documents, 'AP Certificate']);
                    }
                }}
                className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all duration-300 ${isDragging
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                        : 'border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/30 hover:border-gray-400 dark:hover:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-800/50'
                    }`}
            >
                <div className="flex flex-col items-center gap-3">
                    <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${isDragging
                                ? 'bg-blue-100 dark:bg-blue-500/20 scale-110'
                                : 'bg-gray-200 dark:bg-slate-700'
                            }`}
                    >
                        <Upload
                            className={`w-7 h-7 transition-colors ${isDragging ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-slate-400'
                                }`}
                        />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-slate-300">
                            {isDragging ? 'Drop files here' : 'Drag & drop documents here'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">
                            Upload AP / K1 / Bill of Lading
                        </p>
                    </div>
                </div>

                {/* Animated border */}
                {isDragging && (
                    <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 border-2 border-blue-500 rounded-xl animate-pulse" />
                    </div>
                )}
            </div>

            {/* Document checklist (for demo simulation) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {documentTypes.map((doc) => {
                    const isSelected = documents.includes(doc.name);
                    return (
                        <button
                            key={doc.id}
                            onClick={() => toggleDocument(doc.name)}
                            className={`relative p-4 rounded-xl border text-left transition-all duration-200 ${isSelected
                                    ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30'
                                    : 'bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                                }`}
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isSelected ? 'bg-emerald-100 dark:bg-emerald-500/20' : 'bg-gray-100 dark:bg-slate-700'
                                            }`}
                                    >
                                        <FileText
                                            className={`w-5 h-5 ${isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-slate-400'
                                                }`}
                                        />
                                    </div>
                                    <div>
                                        <p
                                            className={`text-sm font-medium ${isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-700 dark:text-slate-300'
                                                }`}
                                        >
                                            {doc.name}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-slate-500">{doc.description}</p>
                                    </div>
                                </div>
                                {isSelected && (
                                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Selected documents count */}
            {documents.length > 0 && (
                <p className="text-xs text-gray-500 dark:text-slate-500 text-center">
                    {documents.length} document{documents.length !== 1 ? 's' : ''} attached
                </p>
            )}
        </div>
    );
}
