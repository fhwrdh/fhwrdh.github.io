import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout() {
  return (
    <Box p={4} mx="auto" my="0" maxW={{ base: "100%", md: "1400px" }}>
      <Header />
      <Outlet />
    </Box>
  );
}
