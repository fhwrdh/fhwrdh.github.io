import { useNavigate, useParams } from "react-router-dom";
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
} from "@chakra-ui/react";
import { useHotkeys } from "react-hotkeys-hook";
import { findIndex } from "../images";

const CarouselHeader = ({ item }) => {
  return (
    <ModalHeader fontWeight={400}>
      <Box>{item.display.title}</Box>
      {item?.display?.geotime && (
        <Box fontSize={"xs"}>{item.display.geotime}</Box>
      )}
      {item?.display?.exif && <Box fontSize={"xs"}>{item.display.exif}</Box>}
      {item?.link && (
        <Link href={item.link.href} fontSize="xs" isExternal>
          {item.link.text}
        </Link>
      )}
    </ModalHeader>
  );
};

export const useCarousel = (items, setRoot) => {
  const { id } = useParams();
  const itemIndex = findIndex(id, items);

  if (itemIndex < 0) return null;
  return <Carousel items={items} id={id} index={itemIndex} setRoot={setRoot} />;
};

const isLast = (index, items) => index === items.length - 1;
const isFirst = (index) => index === 0;

// index is assumed to exist and be valid
// setRoot must end with a `/`
export const Carousel = ({ items, id, index, setRoot }) => {
  const navigate = useNavigate();

  const item = items[index];
  const nextItem = isLast(index, items) ? items[0] : items[index + 1];
  const prevItem = isFirst(index, items)
    ? items[items.length - 1]
    : items[index - 1];

  const navNext = () => navigate(`${setRoot}${nextItem.slugs[0]}`);
  const navPrev = () => navigate(`${setRoot}${prevItem.slugs[0]}`);
  const navClose = () => navigate(setRoot);
  
  useHotkeys("left", navPrev);
  useHotkeys("right", navNext);
  useHotkeys("escape", navClose);

  return (
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
        bg="blackAlpha.300"
        backdropFilter="blur(20px) hue-rotate(90deg)"
      />
      <ModalContent>
        <CarouselHeader item={item} />
        <ModalCloseButton color={"gray"} />

        <ModalBody p={4}>
          <Box 
            position="relative" 
            display="flex" 
            flexDirection="column" 
            alignItems="center"
            justifyContent="center"
            height="calc(80vh - 100px)"
          >
            <Image 
              src={item.path} 
              maxH="100%" 
              maxW="100%"
              objectFit="contain"
              mb={2}
            />
            <Box>
              <IconButton
                mx={1}
                size="sm"
                aria-label="previous"
                icon={<FaChevronLeft color="gray" />}
                onClick={navPrev}
              />
              <IconButton
                mx={1}
                size="sm"
                aria-label="next"
                icon={<FaChevronRight color="gray" />}
                onClick={navNext}
              />
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
