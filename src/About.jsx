import { Box, Divider, Grid, GridItem, Stack, Text } from "@chakra-ui/react";

export default function About() {
  return (
    <Stack spacing={8} mt={8}>
      <Box
        w={{ base: "100%", md: "75%" }}
        maxW={{ base: "100%", md: "600px" }}
        ml={{ base: 0, md: 12 }}
      >
        <Text mb={4}>
          Franklin Henderson is a photographer based in Seattle, Washington.
          Through geometry, patterns, repetition, and contradictions in both
          natural and human-made environments, Franklin looks for both the
          effects of sound on photographs as well as the sound that photographs
          produce.
        </Text>

        <Text mb={4}>
          Often experimenting with constructed limitations, chance operations,
          and random numbers, he walks through cities and landscapes, finding
          and documenting the patterns, underlying structures, and abstractions
          that emerge.
        </Text>

        <Text mb={4}>
          Franklin works within the constraints of analog processes - film,
          development, darkroom - to reinforce the tactile relationship with
          photography offering a counterpoint to the saturation of digital
          images.
        </Text>
      </Box>

      <Box w={{ base: "100%", md: "75%" }} ml={{ base: 0, md: 12 }}>
        <Grid templateColumns={"min-content 16px 1fr"} columnGap={3} rowGap={2}>
          <GridItem />
          <GridItem rowSpan={5}>
            <Divider orientation="vertical" />
          </GridItem>
          <Box borderBottom="1px solid" borderColor="gray.200" pb={2}>
            <Text textTransform="capitalize">Exhibitions</Text>
          </Box>

          <Box>2024</Box>
          <Box>
            <Text as="i">Frames Within Frames</Text>, Praxis Photo Arts Center,
            Minneapolis, Minnesota
          </Box>
          <Box></Box>
          <Box>
            <Text as="i">Show Me Your Seattle</Text>, Seattle, Washington
          </Box>
          <Box></Box>
          <Box>
            <Text as="i">Render</Text>, Greenwood Art Collective, Seattle,
            Washington
          </Box>
          <Box>2023</Box>
          <Box>
            <Text as="i">Frame x Frame</Text>, Jet City Labs, Seattle,
            Washington
          </Box>
        </Grid>
      </Box>
    </Stack>
  );
}
