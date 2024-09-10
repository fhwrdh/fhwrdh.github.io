import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout() {
  return (
    <Box m={4}>
      <Header />
      <Outlet />
    </Box>
  );
}
