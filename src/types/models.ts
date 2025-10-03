export type ModelId =
  | "iphone-16-pro-max"
  | "iphone-16-pro"
  | "iphone-16-plus"
  | "iphone-16"
  | "iphone-15-pro-max"
  | "iphone-15-pro"
  | "iphone-15-plus"
  | "iphone-15"
  | "iphone-14-pro-max"
  | "iphone-14-pro"
  | "iphone-14-plus"
  | "iphone-14"
  | "iphone-13-pro-max"
  | "iphone-13-pro"
  | "iphone-13-mini"
  | "iphone-13"
  | "iphone-12-pro-max"
  | "iphone-12-pro"
  | "iphone-12-mini"
  | "iphone-12"
  | "iphone-11-pro-max"
  | "iphone-11-pro"
  | "iphone-11"
  | "iphone-xr"
  | "iphone-xs-max"
  | "iphone-xs"
  | "iphone-x"
  | "iphone-8-plus"
  | "iphone-8"
  | "iphone-7-plus"
  | "iphone-7"
  | "iphone-6s-plus"
  | "iphone-6s"
  | "iphone-6-plus"
  | "iphone-6"
  | "iphone-se-3rd"
  | "iphone-se-2nd"
  | "iphone-se";

export interface ModelOption {
  id: ModelId;
  displayName: string;
  basePrice: number;
  capacities: number[];
  colors: string[];
}

export interface FormData {
  modelId: ModelId | '';
  capacity: number | '';
  color: string;
  batteryHealth: number;
  condition: 'perfect' | 'scratches' | 'dents';
  failures: string[];
}

export interface PhoneModelDetails {
  basePrice: number;
  capacities: number[];
  colors: string[];
}

export type PhoneModelMap = {
  [key in ModelId]?: PhoneModelDetails;
};