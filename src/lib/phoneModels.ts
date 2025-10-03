// Extract unique iPhone models from the IPhone.json file
export interface PhoneModel {
  id: string;
  name: string;
  displayName: string;
}

// Common iPhone models based on the JSON data
export const iPhoneModels: PhoneModel[] = [
  { id: "iphone-16-pro-max", name: "iPhone 16 Pro Max", displayName: "iPhone 16 Pro Max" },
  { id: "iphone-16-pro", name: "iPhone 16 Pro", displayName: "iPhone 16 Pro" },
  { id: "iphone-16-plus", name: "iPhone 16 Plus", displayName: "iPhone 16 Plus" },
  { id: "iphone-16", name: "iPhone 16", displayName: "iPhone 16" },
  { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max", displayName: "iPhone 15 Pro Max" },
  { id: "iphone-15-pro", name: "iPhone 15 Pro", displayName: "iPhone 15 Pro" },
  { id: "iphone-15-plus", name: "iPhone 15 Plus", displayName: "iPhone 15 Plus" },
  { id: "iphone-15", name: "iPhone 15", displayName: "iPhone 15" },
  { id: "iphone-14-pro-max", name: "iPhone 14 Pro Max", displayName: "iPhone 14 Pro Max" },
  { id: "iphone-14-pro", name: "iPhone 14 Pro", displayName: "iPhone 14 Pro" },
  { id: "iphone-14-plus", name: "iPhone 14 Plus", displayName: "iPhone 14 Plus" },
  { id: "iphone-14", name: "iPhone 14", displayName: "iPhone 14" },
  { id: "iphone-13-pro-max", name: "iPhone 13 Pro Max", displayName: "iPhone 13 Pro Max" },
  { id: "iphone-13-pro", name: "iPhone 13 Pro", displayName: "iPhone 13 Pro" },
  { id: "iphone-13-mini", name: "iPhone 13 Mini", displayName: "iPhone 13 Mini" },
  { id: "iphone-13", name: "iPhone 13", displayName: "iPhone 13" },
  { id: "iphone-12-pro-max", name: "iPhone 12 Pro Max", displayName: "iPhone 12 Pro Max" },
  { id: "iphone-12-pro", name: "iPhone 12 Pro", displayName: "iPhone 12 Pro" },
  { id: "iphone-12-mini", name: "iPhone 12 Mini", displayName: "iPhone 12 Mini" },
  { id: "iphone-12", name: "iPhone 12", displayName: "iPhone 12" },
  { id: "iphone-11-pro-max", name: "iPhone 11 Pro Max", displayName: "iPhone 11 Pro Max" },
  { id: "iphone-11-pro", name: "iPhone 11 Pro", displayName: "iPhone 11 Pro" },
  { id: "iphone-11", name: "iPhone 11", displayName: "iPhone 11" },
  { id: "iphone-xr", name: "iPhone XR", displayName: "iPhone XR" },
  { id: "iphone-xs-max", name: "iPhone XS Max", displayName: "iPhone XS Max" },
  { id: "iphone-xs", name: "iPhone XS", displayName: "iPhone XS" },
  { id: "iphone-x", name: "iPhone X", displayName: "iPhone X" },
  { id: "iphone-8-plus", name: "iPhone 8 Plus", displayName: "iPhone 8 Plus" },
  { id: "iphone-8", name: "iPhone 8", displayName: "iPhone 8" },
  { id: "iphone-7-plus", name: "iPhone 7 Plus", displayName: "iPhone 7 Plus" },
  { id: "iphone-7", name: "iPhone 7", displayName: "iPhone 7" },
  { id: "iphone-6s-plus", name: "iPhone 6s Plus", displayName: "iPhone 6s Plus" },
  { id: "iphone-6s", name: "iPhone 6s", displayName: "iPhone 6s" },
  { id: "iphone-6-plus", name: "iPhone 6 Plus", displayName: "iPhone 6 Plus" },
  { id: "iphone-6", name: "iPhone 6", displayName: "iPhone 6" },
  { id: "iphone-se-3rd", name: "iPhone SE (3rd generation)", displayName: "iPhone SE (3rd generation)" },
  { id: "iphone-se-2nd", name: "iPhone SE (2nd generation)", displayName: "iPhone SE (2nd generation)" },
  { id: "iphone-se", name: "iPhone SE", displayName: "iPhone SE" },
  
];

// Function to get phone model by ID
export function getPhoneModelById(id: string): PhoneModel | undefined {
  return iPhoneModels.find(model => model.id === id);
}

// Function to search phone models
export function searchPhoneModels(query: string): PhoneModel[] {
  const lowercaseQuery = query.toLowerCase();
  return iPhoneModels.filter(model => 
    model.name.toLowerCase().includes(lowercaseQuery) ||
    model.displayName.toLowerCase().includes(lowercaseQuery)
  );
}
