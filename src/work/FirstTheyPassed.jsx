import * as R from "ramda";
import { Box, Heading, Text } from "@chakra-ui/react";
import { ftprtuImages } from "../images";
import { WorkImage, WorkHeading } from "./common";

export default function FirstTheyPassed() {
  return (
    <Box
      display={{ base: "block", md: "flex" }}
      justifyContent={"space-between"}
    >
      <WorkHeading>
        <Heading
          as="h3"
          size="sm"
          mb={{ base: 2, md: 0 }}
          mt={{ base: 0, md: 4 }}
        >
          First They Passed Right Through Us
        </Heading>
        <Text>Spring 2024</Text>
      </WorkHeading>
      <Box>
        {R.map(
          ({ src }) => (
            <WorkImage key={src} src={src} />
          ),
          ftprtuImages,
        )}
      </Box>
    </Box>
  );
}
