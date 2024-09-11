import { sotsImages } from "../images";
import { WorkHeading, WorkContainer, WorkMasonry } from "./common";
import { Heading } from "../common";
import { useCarousel } from "../components/Carousel";

export default function SoundOfTheSea() {
  const carousel = useCarousel(sotsImages, "/work/soundofthesea/");
  return (
    <WorkContainer>
      <WorkHeading>
        <Heading>Sound of the Sea</Heading>
        {carousel}
      </WorkHeading>
      <WorkMasonry items={sotsImages} />
    </WorkContainer>
  );
}
