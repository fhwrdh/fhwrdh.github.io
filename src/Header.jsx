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
import { FaInstagram } from "react-icons/fa";

export default function SiteHeader() {
  const title = useBreakpointValue({
    base: "fhwrdh",
    sm: "Franklin Henderson",
  });
  return (
    <Flex
      justifyContent="space-between"
      mb={{ base: 4, md: 8 }}
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
              FTPRTU
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
