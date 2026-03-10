import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    textContrast: '#ffffff',
    primary: '#0366d6',
    textInputBorder: '#d1d5da',
    error: '#d73a4a',
    mainBackground: '#e1e4e8',
    repositoryItemBackground: '#ffffff',
    appBarBackground: '#24292e',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;