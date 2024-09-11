import { Box } from "@chakra-ui/react";
import { homeImages } from "./images";
import { WorkMasonry } from "./work/common";
import { useCarousel } from "./components/Carousel";

const Home = () => {
  const carousel = useCarousel(homeImages, "/");
  return (
    <Box w="full">
      {carousel}
      <WorkMasonry items={homeImages} />
    </Box>
  );
};

export default Home;
