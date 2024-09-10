import * as R from "ramda";
import { Box, Text } from "@chakra-ui/react";
import { ftprtuImages } from "../images";
import { WorkHeading, WorkContainer, WorkMasonry } from "./common";
import { Heading } from "../common";
import { useParams } from "react-router-dom";
import { Carousel } from "../components/Carousel";

export default function FirstTheyPassed() {
  const { id } = useParams();
  return (
    <WorkContainer>
      <WorkHeading>
        <Heading
          as="h3"
          size="sm"
          mb={{ base: 2, md: 0 }}
          mt={{ base: 0, md: 4 }}
        >
          First They Passed Right Through Us
        </Heading>
        <Text>Spring 2024</Text>
        {id && (
          <Carousel items={ftprtuImages} id={id} setRoot="/work/ftprtu/" />
        )}
      </WorkHeading>
      <WorkMasonry items={ftprtuImages} />
    </WorkContainer>
  );
}
