export const flattenSettings = (settings: any) => {
  const flattened: Record<string, any> = {};
  Object.keys(settings).forEach(category => {
    settings[category].forEach((setting: any) => {
      flattened[setting.id] = setting.default;
    });
  });
  return flattened;
};
