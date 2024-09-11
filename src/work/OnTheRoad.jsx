import { otrImages } from "../images";
import { WorkHeading, WorkContainer, WorkMasonry } from "./common";
import { Heading } from "../common";
import { useCarousel } from "../components/Carousel";

export default function OnTheRoad() {
  const carousel = useCarousel(otrImages, "/work/ontheroad/");
  return (
    <WorkContainer>
      <WorkHeading>
        <Heading>On The Road</Heading>
        {carousel}
      </WorkHeading>
      <WorkMasonry items={otrImages} />
    </WorkContainer>
  );
}
