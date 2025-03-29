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
          Photography for me is about noticing—about paying attention to the way
          time, movement, and perception shape what we see. Sound is an
          important part of this. I am looking for both the effects of sound on
          photographs as well as the sound that photographs express. I think I
          can hear the lines on the road and the reflection in that glass; see
          the barely audible vibration of the docked ferry and the distant hum
          of that building.
        </Text>

        <Text mb={4}>
          I am drawn to unplanned abstraction, finding it in reflections,
          layered views through windows, unintended geometry, and the shapes
          that humans carve in space. Chance and self-imposed procedural
          constraints usually play a role. I like ceding some control to time,
          random numbers and maps. These constraints push me off the beaten
          path. Photographs want to be uncertain - to ask questions, not answer
          them.
        </Text>

        <Text mb={4}>
          I make photographs in black and white, working within the limits of an
          analog process. An antidote to a digital nine to five and the usual
          megapixel chasing. The process is physical, from loading the camera to
          developing to printing in the darkroom. This tactile, hands-on
          connection with the machines and the film keeps me engaged with the
          process while allowing me to create something personal and momentary.
        </Text>

        <Text mb={4}>
          Franklin Henderson is a photographer based in Seattle, Washington.
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

          <Box>2025</Box>
          <Box>
            <Text as="i">Shutter & Light</Text>, Jet City Labs, Seattle,
            Washington
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
