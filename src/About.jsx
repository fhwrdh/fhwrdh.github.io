import { Box, Divider, Grid, GridItem, Stack, Text } from "@chakra-ui/react";

export default function About() {
  return (
    <Stack spacing={8} mt={8}>
      <Box w={{ base: "100%", md: "75%" }} ml={{ base: 0, md: 12 }}>
        <Text mb={4}>
          I am a photographer discovering geometry, patterns, repetition, and
          contradictions in both natural and human-made environments.
        </Text>
        <Text mb={4}>
          I’m often looking for the sound that photographs make through
          composition, light, and subject.
        </Text>
        <Text mb={4}>
          I’m more interested in systems, constraints, chance, and underlying
          structures than representation or documentation. Working within the
          limitations of analog processes - film, development, darkroom -
          reinforces the tactile relationship with photography and offers a
          counterpoint to the saturation of digital images.
        </Text>
      </Box>

      <Box w={{ base: "100%", md: "75%" }}>
        <Grid templateColumns={"min-content 16px 1fr"} gap={4}>
          <GridItem />
          <GridItem rowSpan={5}>
            <Divider orientation="vertical" />
          </GridItem>
          <Box borderBottom="1px solid" borderColor="gray.200" pb={2}>
            <Text textTransform="capitalize">Exhibitions</Text>
          </Box>
          <Box>2024</Box>
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
