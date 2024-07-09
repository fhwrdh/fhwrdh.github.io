import { Box, Heading as CHeading, Image } from "@chakra-ui/react";

export const MasonryImg = ({ index, data }) => {
  return (
    <Box key={index}>
      <Image src={data.src} width="100%" alt={`${data.src}`} />
    </Box>
  );
};

export const Heading = ({ children }) => {
  return (
    <CHeading
      as="h3"
      size="sm"
      mb={{ base: 2, md: 0 }}
      mt={{ base: 0 }}
      fontWeight={300}
    >
      {children}
    </CHeading>
  );
};
