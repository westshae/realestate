import React from 'react';
import { QRCodeCanvas } from "qrcode.react";
import { useClientStore } from '@/components/stores/client';
import { getHexFromTailwindVariable } from '@/components/lib/utils';

const PickupPage: React.FC = () => {
  const { getOrGenerateClientId } = useClientStore();
  const accentHex = getHexFromTailwindVariable('--accent');

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-2">
            Ready for Pickup
          </h1>
          <p className="text-gray-600 mb-8">
            Show this QR code to the barista to collect your order
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="w-full aspect-square max-w-[256px] mx-auto">
            <QRCodeCanvas
              value={getOrGenerateClientId().toString()} 
              size={256}
              bgColor={"#ffffff"}
              fgColor={accentHex}
              level={"H"}
              className="w-full h-full"
            />
          </div>
        </div>

        <p className="text-sm text-gray-500 text-center mt-6">
          Keep this code handy until you receive your order
        </p>
      </div>
    </div>
  );
};

export default PickupPage;
