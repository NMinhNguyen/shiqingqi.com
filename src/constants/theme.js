const black = "#000000";
const white = "#ffffff";
const grey = "#eeeeee";
const blueGrey = "#263238";
const purple = "#5e35b1";
const red = "#e53935";
const yellow = "#ffeb3b";
const lightGrey = "#f5f5f5";
const lightBlueGrey = "#4f5b62";
const lightPurple = "#9162e4";
const lightRed = "#ff6f60";
const lightYellow = "#ffff72";
const darkGrey = "#bcbcbc";
const darkBlueGrey = "#102027";
const darkPurple = "#1a237e";
const darkRed = "#ab000d";
const darkYellow = "#c8b900";

export const colors = {
  dark: {
    // Colors
    black,
    white,
    grey,
    red,
    yellow,
    purple,
    "blue-grey": blueGrey,
    "light-grey": lightGrey,
    "light-red": lightRed,
    "light-yellow": lightYellow,
    "light-purple": lightPurple,
    "light-blue-grey": lightBlueGrey,
    "dark-grey": darkGrey,
    "dark-red": darkRed,
    "dark-yellow": darkYellow,
    "dark-purple": darkPurple,
    "dark-blue-grey": darkBlueGrey,

    // Semantic
    primary: darkBlueGrey,
    "on-primary": white,
    secondary: darkPurple,
    "on-seconday": white,
    accent: yellow,
    "on-accent": black,
    error: red,
    "on-error": black
  }
};

export default { colors };
