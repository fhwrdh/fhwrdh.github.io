import { Link } from "react-router-dom";
import { Box, Heading as CHeading, Image } from "@chakra-ui/react";
import { getId } from "./images";

export const MasonryImg = ({ index, data }) => {
  const id = getId(data.src);
  return (
    <Box key={index}>
      <Link to={id}>
        <Image src={data.src} width="100%" alt={`${data.src}`} />
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
