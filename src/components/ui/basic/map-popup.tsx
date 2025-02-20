import React from 'react';
import { Button } from './button';

interface MapPopupProps {
  machineName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function MapPopup({ machineName, onConfirm, onCancel }: MapPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Are you sure you want to order at <span className="text-accent">{machineName}</span>?
      </h2>
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Button 
        onClick={onConfirm}
        className="w-full sm:w-1/2"
        >
        Confirm
        </Button>
        <Button 
        onClick={onCancel}
        className="w-full sm:w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-800"
        >
        Cancel
        </Button>
      </div>
      </div>
    </div>
  );
}