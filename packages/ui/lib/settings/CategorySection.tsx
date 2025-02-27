import React from 'react';
import { SettingInput } from './SettingInput';

interface CategorySectionProps {
  category: string;
  settings: any[];
  onChange: (id: string, value: any) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ category, settings, onChange }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">{category}</h2>
      <div className="space-y-4">
        {settings.map(setting => (
          <SettingInput key={setting.id} setting={setting} onChange={onChange} />
        ))}
      </div>
    </div>
  );
};
