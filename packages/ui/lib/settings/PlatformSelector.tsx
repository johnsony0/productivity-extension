import React from 'react';
import { Select } from '@headlessui/react';

interface PlatformSelectorProps {
  onPlatformChange: (platform: string) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({ onPlatformChange }) => {
  return (
    <div className="mb-8">
      <label htmlFor="platform" className="block text-lg font-bold">
        Select Platform
      </label>
      <Select
        id="platform"
        onChange={e => onPlatformChange(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary sm:text-sm rounded-md shadow-sm bg-primary text-font">
        <option value="quick-settings">Quick Settings</option>
        <option value="extension">Extension</option>
        <option value="facebook">Facebook</option>
        <option value="instagram">Instagram</option>
        <option value="twitter">Twitter</option>
      </Select>
    </div>
  );
};
