import TableComponent from "../../components/table.component.tsx";
import {mockedProducts, ProductTableHeader} from "../../mock/mockData.mock.ts";
import {Td, Th, Tr, useToast} from "@chakra-ui/react";
import ModalComponent from "../../components/modal.component.tsx";
import InputComponent from "../../components/input.component.tsx";
import {INITIAL_PRODUCT_VALUES, Product} from "../../models/Product.model.ts";
import {ChangeEvent, useState} from "react";
import SinglePageWrapperComponent from "../../components/singlePageWrapper.component.tsx";



const ProductPageContainer = () => {
    const toast = useToast();
    const [newProductData, setNewProductData] = useState<Product>(INITIAL_PRODUCT_VALUES);
    const [editProductData, setEditProductData] = useState<Product>(INITIAL_PRODUCT_VALUES);


    const onChangeHandler = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
        setNewProductData((prevState) => ({
            ...prevState,
            [type]: e.target.value,
        }))
    }

    const onEditChangeHandler = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
        setEditProductData((prevState) => ({
            ...prevState,
            [type]: e.target.value,
        }))
    }

    const addProductHandler = () => {
        toast({
            title: 'Product added',
            description: "Product added",
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-right'
        })
        setNewProductData(INITIAL_PRODUCT_VALUES);
    }

    const editProductHandler = () => {
        console.log('EDYCJA PRODUKTU', editProductData);
        toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
        setEditProductData(INITIAL_PRODUCT_VALUES);
    }

    const deleteProductHandler = () => {
        console.log('USUWANIE PRODUKTU');
    }

    const addingProductModalContent = (
        <div>
            <h4>Add product here</h4>
            <InputComponent placeholder='Product name' value={newProductData.name} onChange={onChangeHandler('name')} />
            <InputComponent placeholder='Product weight' value={newProductData.weight} onChange={onChangeHandler('weight')} />
            <InputComponent placeholder='Product price' value={newProductData.price} onChange={onChangeHandler('price')} />
        </div>
    )

    const editingProductModalContent = (
        <div>
            <h4>Edit product here</h4>
            <InputComponent placeholder='Product name' value={editProductData.name} onChange={onEditChangeHandler('name')} />
            <InputComponent placeholder='Product weight' value={editProductData.weight} onChange={onEditChangeHandler('weight')} />
            <InputComponent placeholder='Product price' value={editProductData.price} onChange={onEditChangeHandler('price')} />
        </div>
    )


    const deletingProductModalContent = (
        <div>
            <h3>Do you confirm deleting?</h3>
        </div>
    )

    const mappedHeaders = ProductTableHeader.map((header, index) => <Th isNumeric={header.isNumeric} key={index}>{header.name}</Th>)
    const mappedData = mockedProducts.map((data) => <Tr key={data.id}>
        <Td>{data.id}</Td>
        <Td>{data.name}</Td>
        <Td isNumeric>{data.weight}</Td>
        <Td isNumeric>{data.price}</Td>
        <Td>
            <ModalComponent
                buttonText='Edytuj'
                modalHeader='Edytuj produkt'
                modalAction={editProductHandler}
                modalContent={editingProductModalContent}
            />
        </Td>
        <Td>
            <ModalComponent
                modalHeader='Usuń produkt'
                buttonText='Usuń'
                modalAction={deleteProductHandler}
                modalContent={deletingProductModalContent}
            />
        </Td>
    </Tr>)

    return(
        <SinglePageWrapperComponent>
            <TableComponent  tableCaption='Produkty'   mappedData={mappedData} mappedHeaders={mappedHeaders} />
            <div style={{ flex: '0'}}>
                <ModalComponent  buttonText='Add product'  modalAction={addProductHandler} modalHeader={'Adding product'}  modalContent={addingProductModalContent} />
            </div>
        </SinglePageWrapperComponent>
    )
}

export default ProductPageContainer;
