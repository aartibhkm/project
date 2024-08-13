import { createTheme, Theme } from "@mui/material/styles";
const  COLORS = {
    "PRIMARY_GREEN" : "#6CCA98",
    "BLACK" : "#000000",
    "PRIMARY_MAGENTA" : "#863399",
    "LIGHT_GREEN" : "#62cbc9",
    "WHITE" : "#FFFFFF",
    "GRAY" : "#eceff4",
    "DARK_GRAY" : "#616a78",
    "LIGHT_BLACK" : "#1c274c",
    "DARK_GRAY_SCROLL" : "#444444",
    "LIGHT_COLOR_SCROLL" : "#E0E9F7",
    "TEAL_GREEN" : "#41795b",
    "SEA_GREEN" : "#56a17a",
    "CHARCOAL_GRAY" : "#21272a",
    "MATTERHORN" : "#4e4e4e",
    "OXFORD_BLUE" : "#0f1b4d",
    "BLIZZARD_BLUE" : "#a1b1c8",
    "RED" : "#f00",
    "MISTY_BLUE" : "#a1b2c8",
    "DARK_RED" : "#c9372c",
  }

export const scrollStyle = (width , isTableView ) => ({
    "&::-webkit-scrollbar-track": {
      boxShadow: `inset 0 0 10px 10px ${COLORS?.LIGHT_COLOR_SCROLL}`,
      ...(!isTableView && {
        border: "solid 5px transparent",
        borderRadius: 20,
      }),
    },
  
    "&::-webkit-scrollbar-thumb": {
      boxShadow: `inset 0 0 10px 10px ${COLORS.DARK_GRAY_SCROLL}`,
      border: "solid 5px transparent",
      borderRadius: 20,
    },
  
    "&::-webkit-scrollbar": {
      width,
    },
  });