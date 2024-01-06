import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useDisclosure, Button,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  modalHeader: string,
  buttonText: string,
  modalAction: (id?: string) => void,
  modalContent: ReactNode,
};

const ModalComponent = ({
  modalHeader, buttonText, modalAction, modalContent,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClick = () => {
    modalAction();
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>{buttonText}</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalContent}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={onClick}>{buttonText}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;
