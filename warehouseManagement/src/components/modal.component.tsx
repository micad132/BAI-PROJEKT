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
  onCloseFromParent?: () => void,
  onOpenFromParent?: () => void,
  isClosingDisabled?: boolean,
  test?: string,
};

const ModalComponent = ({
  modalHeader, buttonText, modalAction, modalContent, onCloseFromParent, onOpenFromParent, isClosingDisabled, test,
}: Props) => {
  const { isOpen, onOpen: onOpenOriginal, onClose: onCloseOriginal } = useDisclosure();

  const onClick = () => {
    console.log('test', test?.length);
    console.log('ON KLIK', isClosingDisabled);
    if (!isClosingDisabled) {
      modalAction();
      onCloseOriginal();
    }
  };

  const onOpen = () => {
    if (onOpenFromParent) {
      onOpenFromParent();
    }
    onOpenOriginal();
  };

  const onClose = () => {
    console.log('PRZED ZAMEK');
    if (onCloseFromParent) {
      onCloseFromParent();
    }
    onCloseOriginal();
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
