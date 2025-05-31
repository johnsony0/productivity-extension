import React from 'react';
import { SettingInput } from './SettingInput';

interface CategorySectionProps {
  category: string;
  settings: any[];
  currentSettings: Record<string, any>;
  onChange: (id: string, value: any) => void;
  mode: number;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  settings,
  currentSettings,
  onChange,
  mode,
}) => {
  return (
    <div className={`${mode ? 'mb-8' : 'mb-2'}`}>
      <h2 className={`text-xl font-semibold ${mode ? 'mb-4' : 'mb-1'} text-heading`}>{category}</h2>
      <div className={`${mode ? 'space-y-4' : 'space-y-1'}`}>
        {settings.map(setting => (
          <SettingInput
            key={setting.id}
            setting={{ ...setting, value: currentSettings[setting.id] }}
            onChange={onChange}
            mode={mode}
          />
        ))}
      </div>
    </div>
  );
};
