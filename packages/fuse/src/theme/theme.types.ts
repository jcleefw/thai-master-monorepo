export interface Theme {
  colors: {
    cream: string;
    lavender: string;
    sage: string;
    periwinkle: string;
    coral: string;
    charcoal: string;
  };
  typography: {
    baseFontSize: string;
    lineHeight: number;
    fontFamily: {
      primary: string;
      fallback: string;
    };
  };
  spacing: {
    base: number;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}
