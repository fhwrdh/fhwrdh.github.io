import { Box, Image } from "@chakra-ui/react";
import { Masonry } from "masonic";
import { homeImages } from "./images";
import { MasonryImg } from "./common";

const Home = () => {
  return (
    <Box w="full">
      <Masonry
        items={homeImages}
        render={MasonryImg}
        // Adds 8px of space between the grid cells
        columnGutter={8}
        // Sets the minimum column width
        columnWidth={333}
        // Pre-renders 5 windows worth of content
        overscanBy={5}
      />
    </Box>
  );
};

export default Home;
