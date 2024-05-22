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
        WHITE:"#EAE7FD",
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
    
}

export const getThemeColors = (theme) => {
    return theme === "DARK" ? themeColors.DARK : themeColors.LIGHT;
  };