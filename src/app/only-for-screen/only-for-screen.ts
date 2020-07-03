export enum ScreenType {
  Desktop = 'desktop',
  Tablet = 'tablet',
  Mobile = 'mobile',
}

export interface OnlyForScreenConfig {
  mobile: number;
  tablet: number;
  debounce?: number;
}
