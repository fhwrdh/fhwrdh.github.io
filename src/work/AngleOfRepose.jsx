import { aorImages } from "../images";
import { WorkHeading, WorkContainer, WorkMasonry } from "./common";
import { Heading } from "../common";
import { useCarousel } from "../components/Carousel";

export default function AngleOfRepose() {
  const carousel = useCarousel(aorImages, "/work/angleofrepose/");
  return (
    <WorkContainer>
      <WorkHeading>
        <Heading>Angle of Repose</Heading>
        {carousel}
      </WorkHeading>
      <WorkMasonry items={aorImages} />
    </WorkContainer>
  );
}
