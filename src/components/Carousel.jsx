import { useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "./Icons";
import {
  Box,
  IconButton,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useHotkeys } from "react-hotkeys-hook";
import { getId, findIndex } from "../images";

const isLast = (index, items) => index === items.length - 1;
const isFirst = (index) => index === 0;

export const useCarousel = (items, setRoot) => {
  const { id } = useParams();
  const itemIndex = findIndex(id, items);

  if (itemIndex < 0) return null;
  return <Carousel items={items} id={id} index={itemIndex} setRoot={setRoot} />;
};

// index is assumed to exist and be valid
// setRoot must end with a `/`
export const Carousel = ({ items, id, index, setRoot }) => {
  const navigate = useNavigate();

  const item = items[index];
  const nextItem = isLast(index, items) ? items[0] : items[index + 1];
  const prevItem = isFirst(index, items)
    ? items[items.length - 1]
    : items[index - 1];

  useHotkeys("left", () => navigate(`${setRoot}${prevItem.slugs[0]}`));
  useHotkeys("right", () => navigate(`${setRoot}${nextItem.slugs[0]}`));

  return (
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
            <Image src={item.path} mb={2} maxH="90vh" />
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
  );
};
