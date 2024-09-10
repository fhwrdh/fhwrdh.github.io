import { useParams } from "react-router-dom";
import { otrImages } from "../images";
import { WorkHeading, WorkContainer, WorkMasonry } from "./common";
import { Heading } from "../common";
import { Carousel } from "../components/Carousel";

export default function OnTheRoad() {
  const { id } = useParams();
  return (
    <WorkContainer>
      <WorkHeading>
        <Heading>On The Road</Heading>
        {id && (
          <Carousel items={otrImages} id={id} setRoot="/work/ontheroad/" />
        )}
      </WorkHeading>
      <WorkMasonry items={otrImages} />
    </WorkContainer>
  );
}
