import { extendTheme } from "@chakra-ui/react";

const colors = {
  chakra: {
    body: {
      bg: "green",
    },
  },
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const b = ` 'Roboto', sans-serif`;
const fonts = {
  heading: b,
  body: b,
};

const theme = extendTheme({ colors, fonts });

export default theme;
