import { sotsImages } from "../images";
import { WorkHeading, WorkContainer, WorkMasonry } from "./common";
import { Heading } from "../common";
import { useParams } from "react-router-dom";
import { Carousel } from "../components/Carousel";

export default function SoundOfTheSea() {
  const { id } = useParams();
  return (
    <WorkContainer>
      <WorkHeading>
        <Heading>Sound of the Sea</Heading>
        {id && (
          <Carousel items={sotsImages} id={id} setRoot="/work/soundofthesea/" />
        )}
      </WorkHeading>
      <WorkMasonry items={sotsImages} />
    </WorkContainer>
  );
}
