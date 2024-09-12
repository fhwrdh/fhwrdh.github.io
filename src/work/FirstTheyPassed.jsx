import { Text, Box, Link } from "@chakra-ui/react";
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
          <Text fontWeight={500}>First They Passed Right Through Us</Text>
          <Text fontSize="sm">Spring 2024</Text>
        </Heading>
        <Box mt={4} fontSize={"sm"}>
          <Text mb={4}>
            <i>First They Passed Right Through Us</i> started as a return to the
            familiar, focussed on quiet movement through empty space and things
            that were not there.
          </Text>
          <Text mb={4}>
            Eventually, as it does, sound emerged. Still quiet, sometimes barely
            audible, but there. An in between noise. To my surprise, these
            sounds came from a lost friend, Steve Roden.
          </Text>
          <Text mb={4}>
            Each image is named for and linked to a corresponding piece of music
            from Steve’s discography. Learn more about Steve at{" "}
            <Link href="https://inbetweennoise.com" isExternal>
              inbetweennoise.com
            </Link>
            .
          </Text>
        </Box>
        {carousel}
      </WorkHeading>
      <WorkMasonry items={ftprtuImages} />
    </WorkContainer>
  );
}
