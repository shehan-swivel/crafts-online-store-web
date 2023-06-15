declare module "@mui/material/styles" {
  interface Theme {
    gradients: {
      [key: string]: string;
    };
  }

  interface ThemeOptions {
    gradients?: {
      [key?: string]: string;
    };
  }
}

export default function createTheme(options?: ThemeOptions, ...args: object[]): Theme;
