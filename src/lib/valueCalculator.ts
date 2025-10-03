// Base market values for different phone models and storage capacities
export interface BaseValue {
  model: string;
  storage: string;
  baseValue: number; // in USD
}

// Base market values (example values - these should be updated with real market data)
export const baseValues: BaseValue[] = [
  // iPhone 16 Series
  { model: "iphone-16-pro-max", storage: "256", baseValue: 1200 },
  { model: "iphone-16-pro-max", storage: "512", baseValue: 1400 },
  { model: "iphone-16-pro-max", storage: "1000", baseValue: 1600 },
  { model: "iphone-16-pro", storage: "256", baseValue: 1000 },
  { model: "iphone-16-pro", storage: "512", baseValue: 1200 },
  { model: "iphone-16-pro", storage: "1000", baseValue: 1400 },
  { model: "iphone-16-plus", storage: "256", baseValue: 900 },
  { model: "iphone-16-plus", storage: "512", baseValue: 1100 },
  { model: "iphone-16", storage: "128", baseValue: 800 },
  { model: "iphone-16", storage: "256", baseValue: 900 },
  { model: "iphone-16", storage: "512", baseValue: 1100 },

  // iPhone 15 Series
  { model: "iphone-15-pro-max", storage: "256", baseValue: 1100 },
  { model: "iphone-15-pro-max", storage: "512", baseValue: 1300 },
  { model: "iphone-15-pro-max", storage: "1000", baseValue: 1500 },
  { model: "iphone-15-pro", storage: "256", baseValue: 900 },
  { model: "iphone-15-pro", storage: "512", baseValue: 1100 },
  { model: "iphone-15-pro", storage: "1000", baseValue: 1300 },
  { model: "iphone-15-plus", storage: "256", baseValue: 800 },
  { model: "iphone-15-plus", storage: "512", baseValue: 1000 },
  { model: "iphone-15", storage: "128", baseValue: 700 },
  { model: "iphone-15", storage: "256", baseValue: 800 },
  { model: "iphone-15", storage: "512", baseValue: 1000 },

  // iPhone 14 Series
  { model: "iphone-14-pro-max", storage: "256", baseValue: 1000 },
  { model: "iphone-14-pro-max", storage: "512", baseValue: 1200 },
  { model: "iphone-14-pro-max", storage: "1000", baseValue: 1400 },
  { model: "iphone-14-pro", storage: "256", baseValue: 800 },
  { model: "iphone-14-pro", storage: "512", baseValue: 1000 },
  { model: "iphone-14-pro", storage: "1000", baseValue: 1200 },
  { model: "iphone-14-plus", storage: "256", baseValue: 700 },
  { model: "iphone-14-plus", storage: "512", baseValue: 900 },
  { model: "iphone-14", storage: "128", baseValue: 600 },
  { model: "iphone-14", storage: "256", baseValue: 700 },
  { model: "iphone-14", storage: "512", baseValue: 900 },

  // iPhone 13 Series
  { model: "iphone-13-pro-max", storage: "256", baseValue: 900 },
  { model: "iphone-13-pro-max", storage: "512", baseValue: 1100 },
  { model: "iphone-13-pro-max", storage: "1000", baseValue: 1300 },
  { model: "iphone-13-pro", storage: "256", baseValue: 700 },
  { model: "iphone-13-pro", storage: "512", baseValue: 900 },
  { model: "iphone-13-pro", storage: "1000", baseValue: 1100 },
  { model: "iphone-13-mini", storage: "128", baseValue: 500 },
  { model: "iphone-13-mini", storage: "256", baseValue: 600 },
  { model: "iphone-13-mini", storage: "512", baseValue: 800 },
  { model: "iphone-13", storage: "128", baseValue: 500 },
  { model: "iphone-13", storage: "256", baseValue: 600 },
  { model: "iphone-13", storage: "512", baseValue: 800 },

  // iPhone 12 Series
  { model: "iphone-12-pro-max", storage: "256", baseValue: 800 },
  { model: "iphone-12-pro-max", storage: "512", baseValue: 1000 },
  { model: "iphone-12-pro", storage: "256", baseValue: 600 },
  { model: "iphone-12-pro", storage: "512", baseValue: 800 },
  { model: "iphone-12-mini", storage: "128", baseValue: 400 },
  { model: "iphone-12-mini", storage: "256", baseValue: 500 },
  { model: "iphone-12", storage: "128", baseValue: 400 },
  { model: "iphone-12", storage: "256", baseValue: 500 },
  { model: "iphone-12", storage: "512", baseValue: 700 },

  // iPhone 11 Series
  { model: "iphone-11-pro-max", storage: "64", baseValue: 500 },
  { model: "iphone-11-pro-max", storage: "256", baseValue: 600 },
  { model: "iphone-11-pro-max", storage: "512", baseValue: 800 },
  { model: "iphone-11-pro", storage: "64", baseValue: 400 },
  { model: "iphone-11-pro", storage: "256", baseValue: 500 },
  { model: "iphone-11-pro", storage: "512", baseValue: 700 },
  { model: "iphone-11", storage: "64", baseValue: 300 },
  { model: "iphone-11", storage: "128", baseValue: 350 },
  { model: "iphone-11", storage: "256", baseValue: 450 },

  // iPhone XR
  { model: "iphone-xr", storage: "64", baseValue: 250 },
  { model: "iphone-xr", storage: "128", baseValue: 300 },
  { model: "iphone-xr", storage: "256", baseValue: 400 },

  // iPhone XS Series
  { model: "iphone-xs-max", storage: "64", baseValue: 350 },
  { model: "iphone-xs-max", storage: "256", baseValue: 450 },
  { model: "iphone-xs-max", storage: "512", baseValue: 600 },
  { model: "iphone-xs", storage: "64", baseValue: 300 },
  { model: "iphone-xs", storage: "256", baseValue: 400 },
  { model: "iphone-xs", storage: "512", baseValue: 550 },

  // iPhone X
  { model: "iphone-x", storage: "64", baseValue: 250 },
  { model: "iphone-x", storage: "256", baseValue: 350 },

  // iPhone 8 Series
  { model: "iphone-8-plus", storage: "64", baseValue: 200 },
  { model: "iphone-8-plus", storage: "128", baseValue: 250 },
  { model: "iphone-8-plus", storage: "256", baseValue: 300 },
  { model: "iphone-8", storage: "64", baseValue: 150 },
  { model: "iphone-8", storage: "128", baseValue: 200 },
  { model: "iphone-8", storage: "256", baseValue: 250 },

  // iPhone 7 Series
  { model: "iphone-7-plus", storage: "32", baseValue: 120 },
  { model: "iphone-7-plus", storage: "128", baseValue: 150 },
  { model: "iphone-7-plus", storage: "256", baseValue: 200 },
  { model: "iphone-7", storage: "32", baseValue: 100 },
  { model: "iphone-7", storage: "128", baseValue: 130 },
  { model: "iphone-7", storage: "256", baseValue: 180 },

  // iPhone 6 Series
  { model: "iphone-6-plus", storage: "16", baseValue: 80 },
  { model: "iphone-6-plus", storage: "64", baseValue: 100 },
  { model: "iphone-6-plus", storage: "128", baseValue: 120 },
  { model: "iphone-6", storage: "16", baseValue: 60 },
  { model: "iphone-6", storage: "64", baseValue: 80 },
  { model: "iphone-6", storage: "128", baseValue: 100 },

  // iPhone SE Series
  { model: "iphone-se-3rd", storage: "64", baseValue: 200 },
  { model: "iphone-se-3rd", storage: "128", baseValue: 250 },
  { model: "iphone-se-3rd", storage: "256", baseValue: 350 },
  { model: "iphone-se-2nd", storage: "64", baseValue: 150 },
  { model: "iphone-se-2nd", storage: "128", baseValue: 200 },
  { model: "iphone-se-2nd", storage: "256", baseValue: 300 },
  { model: "iphone-se", storage: "16", baseValue: 80 },
  { model: "iphone-se", storage: "64", baseValue: 100 },
  { model: "iphone-se", storage: "128", baseValue: 150 },

];

// Battery health factors
export const getBatteryHealthFactor = (batteryLife: number): number => {
  if (batteryLife >= 90) return 1.00;
  if (batteryLife >= 80) return 0.94;
  return 0.85;
};

// Physical condition factors
export const getPhysicalConditionFactor = (screen: string, portDisplay: string): number => {
  // Screen condition factors
  const screenFactors = {
    excellent: 1.00,
    good: 0.98,
    fair: 0.95
  };

  // Port/display condition factors
  const portFactors = {
    perfect: 1.00,
    some_problems: 0.95
  };

  return screenFactors[screen as keyof typeof screenFactors] * portFactors[portDisplay as keyof typeof portFactors];
};

// Failure penalties
export const getFailurePenalties = (screen: string, portDisplay: string): number => {
  let penalties = 0;

  // Screen penalties
  if (screen === "fair") {
    penalties += 150; // Cracked screen repair cost
  }

  // Port/display penalties
  if (portDisplay === "some_problems") {
    penalties += 50; // Face ID or port repair cost
  }

  return penalties;
};

// Main calculation function
export interface ValueCalculationInput {
  phoneType: string;
  storage: string;
  batteryLife: number;
  screen: string;
  portDisplay: string;
}

export interface ValueCalculationResult {
  baseValue: number;
  batteryFactor: number;
  physicalFactor: number;
  penalties: number;
  finalValue: number;
  breakdown: {
    baseValue: number;
    batteryAdjustment: number;
    physicalAdjustment: number;
    penalties: number;
    finalValue: number;
  };
}

export function calculatePhoneValue(input: ValueCalculationInput): ValueCalculationResult {
  // Find base value
  const baseValueEntry = baseValues.find(
    entry => entry.model === input.phoneType && entry.storage === input.storage
  );
  
  const baseValue = baseValueEntry?.baseValue || 0;

  // Calculate factors
  const batteryFactor = getBatteryHealthFactor(input.batteryLife);
  const physicalFactor = getPhysicalConditionFactor(input.screen, input.portDisplay);
  const penalties = getFailurePenalties(input.screen, input.portDisplay);

  // Calculate adjustments
  const batteryAdjustment = baseValue * (batteryFactor - 1);
  const physicalAdjustment = baseValue * (physicalFactor - 1);

  // Calculate final value
  const finalValue = Math.max(0, baseValue + batteryAdjustment + physicalAdjustment - penalties);

  return {
    baseValue,
    batteryFactor,
    physicalFactor,
    penalties,
    finalValue,
    breakdown: {
      baseValue,
      batteryAdjustment,
      physicalAdjustment,
      penalties,
      finalValue
    }
  };
}
