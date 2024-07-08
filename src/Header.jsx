import {
  Box,
  Flex,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";

export default function SiteHeader() {
  return (
    <Flex justifyContent="space-between" mb={4} alignItems={"baseline"}>
      <NavLink to="/" as="h3" size="lg">
        <Heading as="h1" size="lg">
          Franklin Henderson
        </Heading>
      </NavLink>
      <Flex gap={3}>
        <Menu>
          <MenuButton>Work</MenuButton>
          <MenuList>
            <MenuItem as={NavLink} to="/work/ftprtu">
              FTPRTU
            </MenuItem>
            <MenuItem as={NavLink} to="/work/2">
              222
            </MenuItem>
          </MenuList>
        </Menu>
        <NavLink to="/about">About</NavLink>
        <Link href="https://www.instagram.com/fhwrdh" display="block" pt={1}>
          <FaInstagram />
        </Link>
      </Flex>
    </Flex>
  );
}
