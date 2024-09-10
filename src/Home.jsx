import { Box } from "@chakra-ui/react";
import { homeImages } from "./images";
import { useParams } from "react-router-dom";
import { WorkMasonry } from "./work/common";
import { Carousel } from "./components/Carousel";

const Home = () => {
  const { id } = useParams();
  return (
    <Box w="full">
      <WorkMasonry items={homeImages} />
      {id && <Carousel items={homeImages} id={id} setRoot="/" />}
    </Box>
  );
};

export default Home;
