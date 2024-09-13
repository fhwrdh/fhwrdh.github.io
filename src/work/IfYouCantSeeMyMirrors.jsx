import { Text } from "@chakra-ui/react";
import { iycsmmImages } from "../images";
import { WorkHeading, WorkContainer, WorkMasonry } from "./common";
import { Heading } from "../common";
import { useCarousel } from "../components/Carousel";

export default function IfYouCantSeeMyMirrors() {
  const carousel = useCarousel(iycsmmImages, "/work/iycsmm/");
  return (
    <WorkContainer>
      <WorkHeading>
        <Heading as="h3" size="sm">
          <Text fontWeight={500}>If You Can't See My Mirrors</Text>
        </Heading>
        {carousel}
      </WorkHeading>
      <WorkMasonry items={iycsmmImages} />
    </WorkContainer>
  );
}
