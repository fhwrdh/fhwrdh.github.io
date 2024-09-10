import { useNavigate, NavLink } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "./Icons";
import {
  Box,
  Image,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useHotkeys } from "react-hotkeys-hook";
import { getId } from "../images";

const isLast = (index, items) => index === items.length - 1;
const isFirst = (index) => index === 0;

// id is assumed to exist and be valid
// setRoot must end with a `/`
export const Carousel = ({ items, id, setRoot }) => {
  const navigate = useNavigate();

  const itemIndex = items.findIndex((item) => item.src.includes(id));
  const item = items[itemIndex];
  const nextItem = isLast(itemIndex, items) ? items[0] : items[itemIndex + 1];
  const prevItem = isFirst(itemIndex, items)
    ? items[items.length - 1]
    : items[itemIndex - 1];

  const nextId = getId(nextItem.src);
  const prevId = getId(prevItem.src);

  useHotkeys("left", () => navigate(`${setRoot}${prevId}`));
  useHotkeys("right", () => navigate(`${setRoot}${nextId}`));

  return (
    <div>
      <Modal
        size="full"
        isCentered
        isOpen={true}
        closeOnOverlayClick={false}
        onClose={() => {
          navigate(setRoot);
        }}
      >
        <ModalOverlay
          bg="blackAlpha.50"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <Box position="relative" align="center">
            <ModalHeader>{item.title || ""}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image src={item.src} height="100%" maxH="90vh" />
              <Link
                pos="absolute"
                top="50%"
                left="1%"
                as={NavLink}
                to={`${setRoot}${prevId}`}
                display="block"
              >
                <FaChevronLeft fontWeight={300} size={24} />
              </Link>
              <Link
                pos="absolute"
                top="50%"
                right="1%"
                as={NavLink}
                to={`${setRoot}${nextId}`}
                display="block"
              >
                <FaChevronRight fontWeight={300} size={24} />
              </Link>
            </ModalBody>
          </Box>
        </ModalContent>
      </Modal>
    </div>
  );
};
