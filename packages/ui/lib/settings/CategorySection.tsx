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
      <div className={`${mode ? 'mb-4' : 'mb-1'}`}>
        <h2 className={`text-xl font-semibold text-heading`}>{category}</h2>
        {category === 'Topic' || category === 'Bias' ? <h6>[AI/ML Beta] Exclusive to Facebook and Twitter</h6> : ''}
      </div>
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
