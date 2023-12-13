import {
    Alert,
    AlertIcon,
    AlertStatus
} from '@chakra-ui/react'

type Props = {
    status: AlertStatus,
    message: string,
}

const AlertComponent = ({status, message}: Props) => {

    return (
        <Alert status={status}>
            <AlertIcon />
            {message}
        </Alert>)
}

export default AlertComponent;
