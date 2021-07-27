import {
    createTheme,
    responsiveFontSizes
} from '@material-ui/core/styles';

let Theme = responsiveFontSizes(
    createTheme(
        {
            typography: {
                fontFamily: [
                    'Roobert',
                    'sans-serif',
                ].join(','),
            },
            spacing: unit => unit * 8,
            breakpoints: {
                values: {
                    xs: 0,
                    sm: 600,
                    md: 960,
                    lg: 1280,
                    xl: 1920,
                },
            }
        }
    )
);

export default Theme;