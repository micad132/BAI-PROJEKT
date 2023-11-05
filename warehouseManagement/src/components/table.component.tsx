import {
    Table,
    Thead,
    Tbody,
    Tr,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import {ReactNode} from "react";


type Props = {
    tableCaption: string,
    mappedHeaders: ReactNode,
    mappedData: ReactNode,
}

const TableComponent = ({tableCaption, mappedHeaders, mappedData}: Props) => {

    return(
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>{tableCaption}</TableCaption>
                <Thead>
                    <Tr>
                        {mappedHeaders}
                    </Tr>
                </Thead>
                <Tbody>
                    {mappedData}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default TableComponent;
