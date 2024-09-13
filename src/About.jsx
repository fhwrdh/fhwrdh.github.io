import { Box, Image, Link, Text } from "@chakra-ui/react";

export default function About() {
  return (
    <Box display={{ base: "block", md: "flex" }}>
      <Box w={{ base: "full", md: "75%" }} mr={8}>
        <Text mb={4}>
          I am a film photographer based near Seattle, Washington, USA.
        </Text>
        <Link href="mailto:photo@fhwrdh.net">photo@fhwrdh.net</Link>
      </Box>
      <Image src="/fhwrdh.png" width="100%" maxWidth="300px" />
    </Box>
  );
}
