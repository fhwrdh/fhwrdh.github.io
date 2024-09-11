import { Link } from "react-router-dom";
import { Box, Heading as CHeading, Image } from "@chakra-ui/react";
import { getId } from "./images";

export const MasonryImg = ({ index, data }) => {
  const slug = data.slugs[0];
  return (
    <Box key={index}>
      <Link to={slug}>
        <Image src={data.path} width="100%" alt={`${data.title || ""}`} />
      </Link>
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
