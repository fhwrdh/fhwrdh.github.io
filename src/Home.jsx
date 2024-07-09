import { Box, Image, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Masonry } from "masonic";
import { images } from "./images";

const MasonryImg = ({ index, data, width }) => {
  return (
    <Box key={index}>
      <Image src={data.src} width="100%" />
    </Box>
  );
};

const Home = () => {
  return (
    <Box w="full">
      <Masonry
        items={images}
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
