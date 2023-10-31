import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer
} from '@chakra-ui/react'
import {Product} from "../models/Product.model.ts";
import ModalComponent from "./modal.component.tsx";

type TableHeader = {
    name: string,
    isNumeric: boolean,
}


type Props = {
    tableCaption: string,
    tableHeaders: TableHeader[],
    tableData: Product[],
}

const TableComponent = ({tableCaption, tableHeaders, tableData}: Props) => {

    const editProductHandler = () => {
        console.log('EDYCJA PRODUKTU');
    }

    const deleteProductHandler = () => {
        console.log('USUWANIE PRODUKTU');
    }

    const mappedHeaders = tableHeaders.map((header) => <Th isNumeric={header.isNumeric}>{header.name}</Th>)
    const mappedData = tableData.map((data) => <Tr>
        <Td>{data.id}</Td>
        <Td>{data.name}</Td>
        <Td isNumeric>{data.weight}</Td>
        <Td isNumeric>{data.price}</Td>
        <Td>
            <ModalComponent
                buttonText='Edytuj'
                modalHeader='Edytuj produkt'
                modalAction={editProductHandler}
            />
        </Td>
        <Td>
            <ModalComponent
                modalHeader='Usuń produkt'
                buttonText='Usuń'
                modalAction={deleteProductHandler}
            />
        </Td>
    </Tr>)

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
