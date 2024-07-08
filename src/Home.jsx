import { Box, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box w="full">
      <SimpleGrid columns={2} spacing={5} minChildWidth="250px">
        <Box bg="#ff00ff" height="100px">
          ff
        </Box>
        <Box bg="#ee00ee" height="100px">
          ee
        </Box>
        <Box bg="#dd00dd" height="100px">
          dd
        </Box>
        <Box bg="#cc00cc" height="100px">
          cc
        </Box>
        <Box bg="#bb00bb" height="100px">
          bb
        </Box>
        <Box bg="#aa00aa" height="100px">
          aa
        </Box>
        <Box bg="#990099" height="100px">
          99
        </Box>
        <Box bg="#880088" height="100px">
          88
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Home;
