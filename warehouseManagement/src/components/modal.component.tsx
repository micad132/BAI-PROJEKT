import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Button,
} from '@chakra-ui/react'

type Props = {
    modalHeader: string,
    buttonText: string,
    modalAction: () => void,
}

const ModalComponent = ({modalHeader, buttonText, modalAction}: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>{buttonText}</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modalHeader}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        COSTAMCOSTAM
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost' onClick={modalAction}>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalComponent;
