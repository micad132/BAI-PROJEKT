import {
  Button, Td, Th, Tr, useToast,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import TableComponent from '../../components/table.component.tsx';
import { mockedProducts, ProductTableHeader } from '../../mock/mockData.mock.ts';
import ModalComponent from '../../components/modal.component.tsx';
import InputComponent from '../../components/input.component.tsx';
import { INITIAL_PRODUCT_VALUES, Product } from '../../models/Product.model.ts';
import SinglePageWrapperComponent from '../../components/singlePageWrapper.component.tsx';
import { sanitizeData } from '../../services/validators/validator.ts';
import { useAppSelector } from '../../store';
import { getProducts } from '../../store/reducers/productReducer.tsx';

const ProductPageContainer = () => {
  const toast = useToast();
  const [newProductData, setNewProductData] = useState<Product>(INITIAL_PRODUCT_VALUES);
  const [editProductData, setEditProductData] = useState<Product>(INITIAL_PRODUCT_VALUES);
  const products = useAppSelector(getProducts);

  const onChangeHandler = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setNewProductData((prevState) => ({
      ...prevState,
      [type]: sanitizeData(e.target.value),
    }));
  };

  const onEditChangeHandler = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setEditProductData((prevState) => ({
      ...prevState,
      [type]: sanitizeData(e.target.value),
    }));
  };

  const addProductHandler = () => {
    toast({
      title: 'Product added',
      description: 'Product added',
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'top-right',
    });
    setNewProductData(INITIAL_PRODUCT_VALUES);
  };

  const editProductHandler = () => {
    console.log('EDYCJA PRODUKTU', editProductData);
    toast({
      title: 'Product edited',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setEditProductData(INITIAL_PRODUCT_VALUES);
  };

  const deleteProductHandler = () => {
    console.log('USUWANIE PRODUKTU');
  };

  const addingProductModalContent = (
    <div>
      <h4>Add product here</h4>
      <InputComponent
        placeholder="Product name"
        value={newProductData.name}
        onChange={onChangeHandler('name')}
      />
      <InputComponent placeholder="Product weight" value={newProductData.weight} onChange={onChangeHandler('weight')} />
      <InputComponent placeholder="Product price" value={newProductData.price} onChange={onChangeHandler('price')} />
    </div>
  );

  const editingProductModalContent = (id: number, name: string) => (
    <div>
      <h4>
        Edit
        {name}
        {' '}
        here
      </h4>
      <InputComponent placeholder="Product name" value={editProductData.name} onChange={onEditChangeHandler('name')} />
      <InputComponent placeholder="Product weight" value={editProductData.weight} onChange={onEditChangeHandler('weight')} />
      <InputComponent placeholder="Product price" value={editProductData.price} onChange={onEditChangeHandler('price')} />
      <Button onClick={editProductHandler}>Edytuj</Button>
    </div>
  );

  const deletingProductModalContent = (name: string) => (
    <div>
      <h3>
        Do you confirm deleting
        {name}
        ?
      </h3>
    </div>
  );

  // eslint-disable-next-line react/no-array-index-key
  const mappedHeaders = ProductTableHeader.map((header, index) => <Th isNumeric={header.isNumeric} key={index}>{header.name}</Th>);
  const mappedData = products.map((data) => (
    <Tr key={data.id}>
      <Td>{data.id}</Td>
      <Td>{data.id_category}</Td>
      <Td>{data.name}</Td>
      <Td>{data.describe}</Td>
      <Td>
        <ModalComponent
          buttonText="Edytuj"
          modalHeader="Edytuj produkt"
          modalAction={editProductHandler}
          modalContent={editingProductModalContent(Number(data.id), data.name)}
        />
      </Td>
      <Td>
        <ModalComponent
          modalHeader="Usuń produkt"
          buttonText="Usuń"
          modalAction={deleteProductHandler}
          modalContent={deletingProductModalContent(data.name)}
        />
      </Td>
    </Tr>
  ));

  return (
    <SinglePageWrapperComponent>
      <TableComponent tableCaption="Produkty" mappedData={mappedData} mappedHeaders={mappedHeaders} />
      <div style={{ flex: '0' }}>
        <ModalComponent buttonText="Add product" modalAction={addProductHandler} modalHeader="Adding product" modalContent={addingProductModalContent} />
      </div>
    </SinglePageWrapperComponent>
  );
};

export default ProductPageContainer;
