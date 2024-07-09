import { sotsImages } from "../images";
import { WorkHeading, WorkContainer, WorkMasonry } from "./common";
import { Heading } from "../common";

export default function SoundOfTheSea() {
  return (
    <WorkContainer>
      <WorkHeading>
        <Heading>Sound of the Sea</Heading>
      </WorkHeading>
      <WorkMasonry items={sotsImages} />
    </WorkContainer>
  );
}
