import { sotsImages, getId } from "../images";
import { WorkHeading, WorkContainer, WorkMasonry } from "./common";
import { Heading } from "../common";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "../Icons";
import {
  Box,
  Image,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  // ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const isLast = (index, items) => index === items.length - 1;
const isFirst = (index) => index === 0;

const Carousel = ({ items }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) return null;
  const itemIndex = items.findIndex((item) => item.src.includes(id));
  const item = items[itemIndex];
  const nextItem = isLast(itemIndex, items) ? items[0] : items[itemIndex + 1];
  const prevItem = isFirst(itemIndex, items)
    ? items[items.length - 1]
    : items[itemIndex - 1];
  console.log("carousel", { id, itemIndex, item, nextItem, prevItem });
  const nextId = getId(nextItem.src);
  const prevId = getId(prevItem.src);

  return (
    <div>
      <Modal
        size="full"
        isCentered
        isOpen={true}
        closeOnOverlayClick={false}
        onClose={() => {
          navigate("/work/soundofthesea");
        }}
      >
        <ModalOverlay
          bg="blackAlpha.50"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>{item.src}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box position="relative">
              <Image src={item.src} height="100%" maxH="90vh" />
              <Link
                pos="absolute"
                top="0"
                left="0"
                as={NavLink}
                to={`/work/soundofthesea/${prevId}`}
                display="block"
                pt={1}
              >
                <FaChevronLeft fontWeight={300} boxSize={16} />
              </Link>
              <Link
                pos="absolute"
                top="0"
                right="0"
                as={NavLink}
                to={`/work/soundofthesea/${nextId}`}
                display="block"
                pt={1}
              >
                <FaChevronRight fontWeight={300} />
              </Link>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default function SoundOfTheSea() {
  return (
    <WorkContainer>
      <WorkHeading>
        <Heading>Sound of the Sea</Heading>
        <Carousel items={sotsImages} />
      </WorkHeading>
      <WorkMasonry items={sotsImages} />
    </WorkContainer>
  );
}
