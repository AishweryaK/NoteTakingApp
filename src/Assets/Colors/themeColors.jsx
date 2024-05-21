export const themeColors= {
    LIGHT : {
    DARK_BLUE: "#292150",
    GREEN: "#72777A",
    BLUE:"#6B4EFF",
    LIGHT_BLUE:"#9990FF",
    SKY:"#E7E7FF",
    GRAY:"#F2F4F5",
    WHITE:"#FFFFFF",
    BACKGROUND:'#F9F8FD',
    HEADERTITLE:"#2A2251",
    TITLECOLOR:"#090A0A",
    BORDER:"#E3E5E5",
    WELCOME:"#B6B0D9",
    PLACEHOLDER:"#72777A",
    ICON:"#BEB9DD",
    ICONFOCUSED:"#2A2351",
    SHADOW:"#6B4EFF",
    BOTTOM:"#FFFFFF"
    },

    DARK : {
        DARK_BLUE: "#EAE7FD",
        GREEN: "#72777A",
        BLUE:"#6B4EFF",
        LIGHT_BLUE:"#9990FF",
        SKY:"#E7E7FF",
        GRAY:"#F2F4F5",
        // WHITE: "#DCDCDC",
        // WHITE:"#E6E6FA",

        // WHITE:"#B2A6CE",
        // WHITE:"#B29CE4",

        WHITE:"#EAE7FD",

        // BACKGROUND:"#292150",
        // BACKGROUND:"#191970",
        // BACKGROUND:"#100062",

        // BACKGROUND:"#0a003a",
        // BACKGROUND:"#192327",
        BACKGROUND:"#292B30",
        HEADERTITLE:"#FFFFFF",
        TITLECOLOR: "#ECECEC",
        BORDER:"#E3E5E5",
        WELCOME:"#FFFFFF",
        PLACEHOLDER:"#72777A",
        ICON:"#BEB9DD",
        ICONFOCUSED:"#2A2351",
        SHADOW:"#ECECEC",
        BOTTOM:"#383A41"
        }
    // DARK: {
    //     DARK_BLUE: "#1C1A33",
    //     GREEN: "#4C4F52",
    //     BLUE: "#5A4FCF",
    //     LIGHT_BLUE: "#7A73FF",
    //     SKY: "#3A3A6D",
    //     GRAY: "#2A2C2E",
    //     WHITE: "#1E1E2E",
    //     BACKGROUND: '#181720',
    //     HEADERTITLE: "#EBE8FF",
    //     TITLECOLOR: "#ECECEC",
    //     BORDER: "#2C2E2E",
    //     WELCOME: "#8580A6",
    //     PLACEHOLDER: "#4C4F52",
    //     ICON: "#8C87B6",
    //     ICONFOCUSED: "#EBE8FF",
    // }
    
}

export const getThemeColors = (theme) => {
    return theme === "DARK" ? themeColors.DARK : themeColors.LIGHT;
  };