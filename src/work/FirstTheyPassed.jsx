import { Box, Heading, Image, Text } from "@chakra-ui/react";

const WorkHeading = ({ children }) => (
  <Box minW={{ base: "100%", md: "25%" }}>{children}</Box>
);

const WorkImage = ({ src }) => {
  return (
    <Box maxW="1000px" my={4} mx={0}>
      <Image src={src} width="100%" />
    </Box>
  );
};

//
//
//
//
//
//

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
        <WorkImage src="/work/DSCF7944.jpg" />
        <WorkImage src="/work/DSCF7930.jpg" />
        <WorkImage src="/work/DSCF7931.jpg" />
        <WorkImage src="/work/DSCF7961.jpg" />
      </Box>
    </Box>
  );
}
