import { Text } from "@chakra-ui/react";
import { ftprtuImages } from "../images";
import { WorkHeading, WorkContainer, WorkMasonry } from "./common";
import { Heading } from "../common";
import { useCarousel } from "../components/Carousel";

export default function FirstTheyPassed() {
  const carousel = useCarousel(ftprtuImages, "/work/ftprtu/");
  return (
    <WorkContainer>
      <WorkHeading>
        <Heading as="h3" size="sm">
          First They Passed Right Through Us
          <Text>Spring 2024</Text>
        </Heading>
        {carousel}
      </WorkHeading>
      <WorkMasonry items={ftprtuImages} />
    </WorkContainer>
  );
}
