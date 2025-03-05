import React from 'react';
import { SettingInput } from './SettingInput';

interface CategorySectionProps {
  category: string;
  settings: any[];
  currentSettings: Record<string, any>;
  onChange: (id: string, value: any) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ category, settings, currentSettings, onChange }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-heading">{category}</h2>
      <div className="space-y-4">
        {settings.map(setting => (
          <SettingInput
            key={setting.id}
            setting={{ ...setting, default: currentSettings[setting.id] }}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
};
