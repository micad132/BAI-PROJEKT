import SinglePageWrapperComponent from "../../components/singlePageWrapper.component.tsx";
import TableComponent from "../../components/table.component.tsx";
import ModalComponent from "../../components/modal.component.tsx";
import {InvoiceTableHeader, mockedInvoices} from "../../mock/mockData.mock.ts";
import {Td, Th, Tr, useToast} from "@chakra-ui/react";
import {ChangeEvent, useState} from "react";
import {Invoice, INVOICE_INITIAL_DATA} from "../../models/Invoice.model.ts";
import InputComponent from "../../components/input.component.tsx";

const InvoicePageContainer = () => {
    const toast = useToast();

    const [newInvoiceData, setNewInvoiceData] = useState<Invoice>(INVOICE_INITIAL_DATA);
    const [editInvoiceData, setEditInvoiceData] = useState<Invoice>(INVOICE_INITIAL_DATA);

    const onChangeHandler = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
        setNewInvoiceData((prevState) => ({
            ...prevState,
            [type]: e.target.value,
        }))
    }

    // const onEditChangeHandler = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
    //     setEditInvoiceData((prevState) => ({
    //         ...prevState,
    //         [type]: e.target.value,
    //     }))
    // }

    const addInvoiceHandler = () => {
        toast({
            title: 'Product added',
            description: "Product added",
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-right'
        })
        setNewInvoiceData(INVOICE_INITIAL_DATA);
    }

    const editInvoiceHandler = () => {
        console.log('EDYCJA PRODUKTU', editInvoiceData);
        toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
        setEditInvoiceData(INVOICE_INITIAL_DATA);
    }

    const deleteInvoiceHandler = () => {
        console.log('USUWANIE PRODUKTU');
    }

    const addingProductModalContent = (
        <div>
            <h4>Add invoice here</h4>
            <InputComponent placeholder='Invoice price' value={newInvoiceData.price} onChange={onChangeHandler('price')} />
            <InputComponent placeholder='Product id' value={newInvoiceData.idProduct} onChange={onChangeHandler('idProduct')} />
        </div>
    )

    const editingProductModalContent = (
        <div>
            <h4>Edit invoice here</h4>
        </div>
    )


    const deletingProductModalContent = (
        <div>
            <h3>Do you confirm deleting?</h3>
        </div>
    )


    const mappedHeaders = InvoiceTableHeader.map((header, index) => <Th isNumeric={header.isNumeric} key={index}>{header.name}</Th>)
    const mappedData = mockedInvoices.map((data) => <Tr key={data.id}>
        <Td>{data.id}</Td>
        <Td>{data.date}</Td>
        <Td isNumeric>{data.price}</Td>
        <Td isNumeric>{data.idProduct}</Td>
        <Td>
            <ModalComponent
                buttonText='Edytuj'
                modalHeader='Edit invoice'
                modalAction={editInvoiceHandler}
                modalContent={editingProductModalContent}
            />
        </Td>
        <Td>
            <ModalComponent
                modalHeader='Delete invoice'
                buttonText='Usuń'
                modalAction={deleteInvoiceHandler}
                modalContent={deletingProductModalContent}
            />
        </Td>
    </Tr>)
    return(
        <SinglePageWrapperComponent>
            <TableComponent  tableCaption='Invoices'   mappedData={mappedData} mappedHeaders={mappedHeaders} />
            <div style={{ flex: '0'}}>
                <ModalComponent  buttonText='Add invoice'  modalAction={addInvoiceHandler} modalHeader={'Adding invoice'}  modalContent={addingProductModalContent} />
            </div>
        </SinglePageWrapperComponent>
    )
}

export default InvoicePageContainer;
