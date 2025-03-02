import React, { useState, useEffect } from 'react';
import { Button, Input, Field, Label, Switch, Select } from '@headlessui/react';

interface SettingInputProps {
  setting: any;
  onChange: (id: string, value: any) => void;
}

export const SettingInput: React.FC<SettingInputProps> = ({ setting, onChange }) => {
  const [arrayValue, setArrayValue] = useState<string>('');
  const [arrayItems, setArrayItems] = useState<string[]>(setting.default || []);

  // Sync arrayItems with setting.default
  useEffect(() => {
    if (setting.default && Array.isArray(setting.default)) {
      setArrayItems(setting.default);
    }
  }, [setting.default]);

  const handleArrayAdd = () => {
    if (arrayValue.trim()) {
      const newItems = [...arrayItems, arrayValue.trim()];
      setArrayItems(newItems);
      onChange(setting.id, newItems); // Update parent settings
      setArrayValue('');
    }
  };

  const handleArrayRemove = (item: string) => {
    const newItems = arrayItems.filter(i => i !== item);
    setArrayItems(newItems);
    onChange(setting.id, newItems); // Update parent settings
  };

  switch (setting.type) {
    case 'checkbox':
      return (
        <Field>
          <div className="flex items-center">
            <Switch
              checked={setting.default}
              onChange={checked => onChange(setting.id, checked)}
              className={`${
                setting.default ? 'bg-secondary' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2`}>
              <span
                className={`${
                  setting.default ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
            <Label className="ml-4 text-sm text-heading">{setting.label}</Label>
          </div>
        </Field>
      );
    case 'number':
      return (
        <div>
          <label htmlFor={setting.id} className="block text-sm font-medium text-heading">
            {setting.label}
          </label>
          <Input
            type="number"
            id={setting.id}
            value={setting.default}
            min={setting.min}
            max={setting.max}
            onChange={e => onChange(setting.id, parseInt(e.target.value))}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary sm:text-sm rounded-md shadow-sm bg-primary text-font"
          />
        </div>
      );
    case 'array':
      return (
        <div>
          <label htmlFor={setting.id} className="block text-sm font-medium text-heading">
            {setting.label}
          </label>
          <div className="flex">
            <Input
              type="text"
              value={arrayValue}
              onChange={e => setArrayValue(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary sm:text-sm rounded-md shadow-sm bg-primary text-font"
            />
            <Button
              onClick={handleArrayAdd}
              className="ml-2 px-4 py-2 bg-secondary text-heading rounded-md hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2">
              Add
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap">
            {arrayItems.map((item, index) => (
              <span
                key={index}
                onClick={() => handleArrayRemove(item)}
                className="inline-block bg-secondary text-heading rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 cursor-pointer hover:bg-secondary-dark">
                {item}
              </span>
            ))}
          </div>
        </div>
      );
    case 'select':
      return (
        <div>
          <label htmlFor={setting.id} className="block text-sm font-medium text-heading">
            {setting.label}
          </label>
          <Select
            id={setting.id}
            value={setting.default}
            onChange={e => onChange(setting.id, e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary sm:text-sm rounded-md shadow-sm bg-primary text-font">
            {setting.options.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </Select>
        </div>
      );
    default:
      return null;
  }
};
