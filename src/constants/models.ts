import type { ModelId } from '../types/models';
import type { ModelOption } from '../types/models';

export const MODELS: ModelOption[] = [
    {
        id: "iphone-se-3rd",
        displayName: "iPhone SE (3rd Gen)",
        basePrice: 300,
        capacities: [64, 128, 256],
        colors: ["Midnight", "Starlight", "Red"],
    },
    {
        id: "iphone-se-2nd",
        displayName: "iPhone SE (2nd Gen)",
        basePrice: 200,
        capacities: [64, 128, 256],
        colors: ["Black", "White", "Red"],
    },
    {
        id: "iphone-se",
        displayName: "iPhone SE (1st Gen)",
        basePrice: 80,
        capacities: [16, 32, 64, 128],
        colors: ["Black", "White"],
    },
    { id: "iphone-8", displayName: "iPhone 8", basePrice: 120, capacities: [64, 128, 256], colors: ["Silver", "Space Gray", "Gold", "Red"] },
    { id: "iphone-8-plus", displayName: "iPhone 8 Plus", basePrice: 150, capacities: [64, 128, 256], colors: ["Silver", "Space Gray", "Gold", "Red"] },
    { id: "iphone-x", displayName: "iPhone X", basePrice: 200, capacities: [64, 256], colors: ["Silver", "Space Gray"] },
    { id: "iphone-xr", displayName: "iPhone XR", basePrice: 220, capacities: [64, 128, 256], colors: ["Black", "White", "Blue", "Yellow", "Coral", "Red"] },
    { id: "iphone-xs", displayName: "iPhone XS", basePrice: 250, capacities: [64, 256, 512], colors: ["Silver", "Space Gray", "Gold"] },
    { id: "iphone-xs-max", displayName: "iPhone XS Max", basePrice: 280, capacities: [64, 256, 512], colors: ["Silver", "Space Gray", "Gold"] },
    { id: "iphone-11", displayName: "iPhone 11", basePrice: 300, capacities: [64, 128, 256], colors: ["Black", "Green", "Yellow", "Purple", "Red", "White"] },
    { id: "iphone-11-pro", displayName: "iPhone 11 Pro", basePrice: 400, capacities: [64, 256, 512], colors: ["Midnight Green", "Space Gray", "Silver", "Gold"] },
    { id: "iphone-11-pro-max", displayName: "iPhone 11 Pro Max", basePrice: 450, capacities: [64, 256, 512], colors: ["Midnight Green", "Space Gray", "Silver", "Gold"] },
    { id: "iphone-12-mini", displayName: "iPhone 12 mini", basePrice: 350, capacities: [64, 128, 256], colors: ["Black", "White", "Red", "Green", "Blue", "Purple"] },
    { id: "iphone-12", displayName: "iPhone 12", basePrice: 400, capacities: [64, 128, 256], colors: ["Black", "White", "Red", "Green", "Blue", "Purple"] },
    { id: "iphone-12-pro", displayName: "iPhone 12 Pro", basePrice: 500, capacities: [128, 256, 512], colors: ["Silver", "Graphite", "Gold", "Pacific Blue"] },
    { id: "iphone-12-pro-max", displayName: "iPhone 12 Pro Max", basePrice: 600, capacities: [128, 256, 512], colors: ["Silver", "Graphite", "Gold", "Pacific Blue"] },
    { id: "iphone-13-mini", displayName: "iPhone 13 mini", basePrice: 500, capacities: [128, 256, 512], colors: ["Pink", "Blue", "Midnight", "Starlight", "Red", "Green"] },
    { id: "iphone-13", displayName: "iPhone 13", basePrice: 550, capacities: [128, 256, 512], colors: ["Pink", "Blue", "Midnight", "Starlight", "Red", "Green"] },
    { id: "iphone-13-pro", displayName: "iPhone 13 Pro", basePrice: 700, capacities: [128, 256, 512, 1000], colors: ["Graphite", "Gold", "Silver", "Sierra Blue", "Alpine Green"] },
    { id: "iphone-13-pro-max", displayName: "iPhone 13 Pro Max", basePrice: 800, capacities: [128, 256, 512, 1000], colors: ["Graphite", "Gold", "Silver", "Sierra Blue", "Alpine Green"] },
    { id: "iphone-14", displayName: "iPhone 14", basePrice: 700, capacities: [128, 256, 512], colors: ["Midnight", "Starlight", "Blue", "Purple", "Red", "Yellow"] },
    { id: "iphone-14-plus", displayName: "iPhone 14 Plus", basePrice: 800, capacities: [128, 256, 512], colors: ["Midnight", "Starlight", "Blue", "Purple", "Red", "Yellow"] },
    { id: "iphone-14-pro", displayName: "iPhone 14 Pro", basePrice: 900, capacities: [128, 256, 512, 1000], colors: ["Space Black", "Silver", "Gold", "Deep Purple"] },
    { id: "iphone-14-pro-max", displayName: "iPhone 14 Pro Max", basePrice: 1000, capacities: [128, 256, 512, 1000], colors: ["Space Black", "Silver", "Gold", "Deep Purple"] },
    { id: "iphone-15", displayName: "iPhone 15", basePrice: 850, capacities: [128, 256, 512], colors: ["Black", "White", "Blue", "Green", "Pink"] },
    { id: "iphone-15-plus", displayName: "iPhone 15 Plus", basePrice: 950, capacities: [128, 256, 512], colors: ["Black", "White", "Blue", "Green", "Pink"] },
    { id: "iphone-15-pro", displayName: "iPhone 15 Pro", basePrice: 1100, capacities: [256, 512, 1000], colors: ["Natural Titanium", "Black Titanium", "Blue Titanium"] },
    { id: "iphone-15-pro-max", displayName: "iPhone 15 Pro Max", basePrice: 1200, capacities: [256, 512, 1000], colors: ["Natural Titanium", "Black Titanium", "Blue Titanium"] },
];

export const CONDITIONS = [
    { id: 'excellent', label: 'Excellent (Like New)', factor: 0.95 },
    { id: 'good', label: 'Good', factor: 0.85 },
    { id: 'fair', label: 'Fair', factor: 0.675 },
    { id: 'poor', label: 'Poor', factor: 0.50 },
    { id: 'broken', label: 'Broken (For Parts)', factor: 0.20 }
] as const;

export const FAILURES = [
    { id: 'battery', label: 'Battery Health <80%', penalty: 0.15 },
    { id: 'faceId', label: 'Face ID Broken', penalty: 0.125 },
    { id: 'crackedScreen', label: 'Cracked Screen', penalty: 0.275 },
    { id: 'camera', label: 'Camera Issue', penalty: 0.075 },
    { id: 'audio', label: 'Speaker / Mic Issue', penalty: 0.075 },
    { id: 'charging', label: 'Charging Port Issue', penalty: 0.125 }
] as const;

export const EXTRAS = [
    { id: 'box', label: 'Original Box', bonus: 0.025 },
    { id: 'charger', label: 'Original Charger', bonus: 0.035 }
] as const;