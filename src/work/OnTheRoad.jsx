import { otrImages } from "../images";
import { WorkHeading, WorkContainer, WorkMasonry } from "./common";
import { Heading } from "../common";

export default function OnTheRoad() {
  return (
    <WorkContainer>
      <WorkHeading>
        <Heading>On The Road</Heading>
      </WorkHeading>
      <WorkMasonry items={otrImages} />
    </WorkContainer>
  );
}
