import { Box, Image } from "@chakra-ui/react";
import { Masonry } from "masonic";
import { MasonryImg } from "../common";

export const WorkHeading = ({ children }) => (
  <Box
    //
    minW={{ base: "100%", md: "25%" }}
    maxW={{ base: "100%", md: "25%" }}
    marginRight={{ base: 0, md: 4, lg: 16 }}
    marginBottom={{ base: 4, md: 0 }}
  >
    {children}
  </Box>
);

export const WorkImage = ({ src }) => {
  return (
    <Box maxW="1000px" my={4} mx={0}>
      <Image src={src} width="100%" />
    </Box>
  );
};

export const WorkContainer = ({ children }) => {
  return (
    <Box
      display={{ base: "block", md: "flex" }}
      justifyContent={"space-between"}
    >
      {children}
    </Box>
  );
};

export const WorkMasonry = (props) => {
  return (
    <Masonry
      {...props}
      render={MasonryImg}
      // Adds 8px of space between the grid cells
      columnGutter={8}
      // Sets the minimum column width
      columnWidth={300}
      // Pre-renders 5 windows worth of content
      overscanBy={2}
    />
  );
};
