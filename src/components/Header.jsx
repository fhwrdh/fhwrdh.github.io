import {
  Flex,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { FaInstagram } from "./Icons";

export default function SiteHeader() {
  const title = useBreakpointValue({
    base: "fhwrdh",
    sm: "Franklin Henderson",
  });
  return (
    <Flex
      justifyContent="space-between"
      mb={{ base: 4, md: 8 }}
      pt={{ base: 2, md: 4 }}
      pb={{ base: 2, md: 4 }}
      position="sticky"
      top={0}
      zIndex={1000}
      background={"white"}
      alignItems={"baseline"}
      fontWeight={300}
    >
      <NavLink to="/">
        <Heading size="md" fontWeight={300}>
          {title}
        </Heading>
      </NavLink>
      <Flex gap={3}>
        <Menu>
          <MenuButton fontWeight={300}>Work</MenuButton>
          <MenuList>
            <MenuItem as={NavLink} to="/work/ftprtu">
              First They Passed Right Through Us
            </MenuItem>
            <MenuItem as={NavLink} to="/work/iycsmm">
              If You Can't See My Mirrors
            </MenuItem>
            <MenuItem as={NavLink} to="/work/soundofthesea">
              Sound of the Sea
            </MenuItem>
            <MenuItem as={NavLink} to="/work/ontheroad">
              On the Road
            </MenuItem>
          </MenuList>
        </Menu>
        <NavLink to="/about">About</NavLink>
        <Link href="https://www.instagram.com/fhwrdh" display="block" pt={1}>
          <FaInstagram fontWeight={300} />
        </Link>
      </Flex>
    </Flex>
  );
}
