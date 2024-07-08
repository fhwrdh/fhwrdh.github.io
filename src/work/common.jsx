import { Box, Image } from "@chakra-ui/react";

export const WorkHeading = ({ children }) => (
  <Box minW={{ base: "100%", md: "25%" }}>{children}</Box>
);

export const WorkImage = ({ src }) => {
  return (
    <Box maxW="1000px" my={4} mx={0}>
      <Image src={src} width="100%" />
    </Box>
  );
};
