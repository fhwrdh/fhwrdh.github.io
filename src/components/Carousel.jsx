import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "./Icons";
import {
  Box,
  IconButton,
  Image,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Icon,
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
        size={{ base: "full", md: "6xl" }}
        isCentered
        isOpen={true}
        closeOnOverlayClick={false}
        onClose={() => {
          navigate(setRoot);
        }}
      >
        <ModalOverlay
          bg="blackAlpha.50"
          backdropFilter="blur(20px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>{item.title || " "}</ModalHeader>
          <ModalCloseButton color={"gray"} />

          <ModalBody>
            <Box position="relative" align="center">
              <Image src={item.src} mb={2} />
              <IconButton
                mx={1}
                size="xs"
                aria-label="previous"
                icon={<FaChevronLeft color="gray" />}
                onClick={() => {
                  navigate(`${setRoot}${prevId}`);
                }}
              />
              <IconButton
                mx={1}
                size="xs"
                aria-label="next"
                icon={<FaChevronRight color="gray" />}
                onClick={() => {
                  navigate(`${setRoot}${nextId}`);
                }}
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
