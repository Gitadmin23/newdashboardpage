import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { Raleway } from 'next/font/google'
 
const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
})

export const THEME = {
    COLORS: {
        chasescrollTextGray: "#101828",
        chasescrollYellow: "#f29339",
        chasescrollRed: "#F04F4F",
        chasescrollGray: "#B1B5C3",
        chasescrollGrey: "#A3A3A3",
        chasescrollPurple: "#5969BA",
        chasescrollPalePurple: "#D0D4EB",
        chasescrollTextGrey: "#5B5858",
        chasescrollBlue: "#5D70F9",
        chasescrollDarkBlue: "#12299C",
        chasescrollNavyLight: "#D0D4EB",
        chasescrollBgBlue: "#E5EBF4",
        chasescrollWhite: "#FAFAFA",
        chasescrollLightGrey: "#F5F5F5",
        chasescrollTextGrey2: "#667085",
        chasescrollButtonBlue: "#3C41F0",
        chasescrollBrown: "#7A6969",
        chasescrollG: "#98929214",
        borderColor: '#D0D4EB',
    }
}

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

export const theme = extendTheme({
    config,
    colors: {
        brand: {
            mainBackgroundColor: 'white',
            secondaryBackgroundColor: 'whitesmoke',
            primaryColor: '#5D70F9',
            headerTextColor: 'black',
            bodyTextColor: 'grey',
            inputBorderColor: 'lightgrey',
            //borderColor: 'lightgrey',
            chasescrollTextGray: "#101828",
            chasescrollYellow: "#f29339",
            chasescrollRed: "#F04F4F",
            chasescrollGray: "#B1B5C3",
            chasescrollGrey: "#A3A3A3",
            chasescrollPurple: "#5969BA",
            chasescrollPalePurple: "#D0D4EB",
            chasescrollTextGrey: "#5B5858",
            chasescrollBlue: "#5D70F9",
            chasescrollDarkBlue: "#12299C",
            chasescrollNavyLight: "#D0D4EB",
            chasescrollBgBlue: "#E5EBF4",
            chasescrollWhite: "#FAFAFA",
            chasescrollLightGrey: "#F5F5F5",
            chasescrollTextGrey2: "#667085",
            chasescrollButtonBlue: "#3C41F0",
            chasescrollBrown: "#7A6969",
            chasescrollG: "#98929214",
            borderColor: '#D0D4EB',
        }
    },
    fonts: {
        heading: raleway.style.fontFamily,
        body: raleway.style.fontFamily,
    },
});

export const darkTheme = extendTheme({
    config,
    colors: {
        brand: {
            mainBackgroundColor: '#18191A',
            secondaryBackgroundColor: '#242526',
            primaryColor: '#5D70F9',
            headerTextColor: 'white',
            bodyTextColor: 'whitesmoke',
            inputBorderColor: '#D0D4EB',
            //borderColor: 'lightgrey',
            chasescrollTextGray: "#101828",
            chasescrollYellow: "#f29339",
            chasescrollRed: "#F04F4F",
            chasescrollGray: "#B1B5C3",
            chasescrollGrey: "#A3A3A3",
            chasescrollPurple: "#5969BA",
            chasescrollPalePurple: "#D0D4EB",
            chasescrollTextGrey: "#5B5858",
            chasescrollBlue: "#5D70F9",
            chasescrollDarkBlue: "#12299C",
            chasescrollNavyLight: "#D0D4EB",
            chasescrollBgBlue: "#E5EBF4",
            chasescrollWhite: "#FAFAFA",
            chasescrollLightGrey: "#F5F5F5",
            chasescrollTextGrey2: "#667085",
            chasescrollButtonBlue: "#3C41F0",
            chasescrollBrown: "#7A6969",
            chasescrollG: "#98929214",
            borderColor: '#D0D4EB',
        }
    },
    fonts: {
        heading: raleway.style.fontFamily,
        body: raleway.style.fontFamily,
    },
});