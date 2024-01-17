import {
  Button, Td, Th, Tr, useToast,
  Select,
  Badge,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import TableComponent from '../../components/table.component.tsx';
import { mockedProducts, ProductTableHeader } from '../../mock/mockData.mock.ts';
import ModalComponent from '../../components/modal.component.tsx';
import InputComponent from '../../components/input.component.tsx';
import {
  AddProduct, INITIAL_ADD_PRODUCT_VALUES, INITIAL_PRODUCT_VALUES, Product, PRODUCT_ERROR_INITIAL_VALUES, ProductError,
} from '../../models/Product.model.ts';
import SinglePageWrapperComponent from '../../components/singlePageWrapper.component.tsx';
import { sanitizeData } from '../../services/validators/validator.ts';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  addingProductThunk,
  deletingProductThunk,
  editingProductThunk,
  getProducts,
} from '../../store/reducers/productReducer.tsx';
import { getCategories } from '../../store/reducers/categoryReducer.tsx';
import SpanComponent from '../../components/span.component.tsx';

const ProductPageContainer = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [newProductData, setNewProductData] = useState<AddProduct>(INITIAL_ADD_PRODUCT_VALUES);
  const [editProductData, setEditProductData] = useState<AddProduct>(INITIAL_ADD_PRODUCT_VALUES);
  const [productErrors, setProductErrors] = useState<ProductError>(PRODUCT_ERROR_INITIAL_VALUES);
  const [editProductErrors, setEditProductErrors] = useState<ProductError>(PRODUCT_ERROR_INITIAL_VALUES);
  const products = useAppSelector(getProducts);
  const categories = useAppSelector(getCategories);

  const onChangeHandler = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setNewProductData((prevState) => ({
      ...prevState,
      [type]: sanitizeData(e.target.value),
    }));
  };

  const onSelectChangeHandler = (type: string) => (e: ChangeEvent<HTMLSelectElement>) => {
    setNewProductData((prevState) => ({
      ...prevState,
      [type]: sanitizeData(e.target.value),
    }));
  };

  const onSelectEditChangeHandler = (type: string) => (e: ChangeEvent<HTMLSelectElement>) => {
    setEditProductData((prevState) => ({
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
    const errorData: ProductError = PRODUCT_ERROR_INITIAL_VALUES;
    let isError = false;
    if (newProductData.id_category === '') {
      errorData.id_category = 'ID cannot be null!';
      isError = true;
    }
    if (newProductData.name === '' || newProductData.name.includes('&')) {
      errorData.name = 'Invalid name';
      isError = true;
    }
    if (newProductData.describe === '' || newProductData.describe.includes('&')) {
      errorData.describe = 'Invalid description';
      isError = true;
    }
    if (isError) {
      console.log('ERROR DATA', errorData);
      setProductErrors(errorData);
      toast({
        title: 'Invalid data',
        description: 'Invalid data',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    } else {
      dispatch(addingProductThunk(newProductData));
      toast({
        title: 'Product added',
        description: 'Product added',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
      setNewProductData(INITIAL_ADD_PRODUCT_VALUES);
      setProductErrors(PRODUCT_ERROR_INITIAL_VALUES);
    }
  };

  const editProductHandler = (id: string) => {
    const errorData: ProductError = PRODUCT_ERROR_INITIAL_VALUES;
    let isErrorEdit = false;
    if (editProductData.id_category === '') {
      errorData.id_category = 'ID cannot be null!';
      isErrorEdit = true;
    }
    if (editProductData.name === '' || editProductData.name.includes('&')) {
      errorData.name = 'Invalid name';
      isErrorEdit = true;
    }
    if (editProductData.describe === '' || editProductData.describe.includes('&')) {
      errorData.describe = 'Invalid description';
      isErrorEdit = true;
    }
    if (isErrorEdit) {
      setEditProductErrors(errorData);
      toast({
        title: 'Invalid data',
        description: 'Invalid data',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    } else {
      const editData: Product = {
        id,
        id_category: editProductData.id_category,
        describe: editProductData.describe,
        name: editProductData.name,
      };
      dispatch(editingProductThunk(editData));
      toast({
        title: 'Product edited',
        status: 'success',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      });
      setEditProductData(INITIAL_PRODUCT_VALUES);
    }
  };

  const deleteProductHandler = (id: string) => {
    console.log('USUWANIE PRODUKTU');
    dispatch(deletingProductThunk(id));
    toast({
      title: 'Product deleted',
      status: 'success',
      duration: 3000,
      position: 'top-right',
      isClosable: true,
    });
  };

  const addingProductModalContent = (
    <div>
      <h4>Add product here</h4>
      <InputComponent
        placeholder="Product name"
        value={newProductData.name}
        onChange={onChangeHandler('name')}
        errorText={productErrors.name}
      />
      <InputComponent placeholder="Product description" value={newProductData.describe} onChange={onChangeHandler('describe')} errorText={productErrors.describe} />
      <Select placeholder="Select category" style={{ marginTop: 10 }} onChange={onSelectChangeHandler('id_category')}>
        {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
      </Select>
      {productErrors.id_category && <Badge colorScheme="red">{productErrors.id_category}</Badge>}
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
      <InputComponent placeholder="Product name" value={editProductData.name} onChange={onEditChangeHandler('name')} errorText={editProductErrors.name} />
      <InputComponent placeholder="Product description" value={editProductData.describe} onChange={onEditChangeHandler('describe')} errorText={editProductErrors.describe} />
      <Select placeholder="Select category" style={{ marginTop: 10 }} onChange={onSelectEditChangeHandler('id_category')}>
        {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
      </Select>
      {editProductErrors.id_category && <Badge colorScheme="red">{editProductErrors.id_category}</Badge>}
    </div>
  );

  const deletingProductModalContent = (name: string) => (
    <div>
      <h3>
        Do you confirm deleting
        <SpanComponent text={name} />
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
          buttonText="Edit"
          modalHeader="Edit product"
          modalAction={() => editProductHandler(data.id)}
          modalContent={editingProductModalContent(Number(data.id), data.name)}
        />
      </Td>
      <Td>
        <ModalComponent
          modalHeader="Delete product"
          buttonText="Delete"
          modalAction={() => deleteProductHandler(data.id)}
          modalContent={deletingProductModalContent(data.name)}
        />
      </Td>
    </Tr>
  ));

  return (
    <SinglePageWrapperComponent>
      <TableComponent tableCaption="Products" mappedData={mappedData} mappedHeaders={mappedHeaders} />
      <div style={{ flex: '0' }}>
        <ModalComponent
          buttonText="Add product"
          modalAction={addProductHandler}
          modalHeader="Adding product"
          modalContent={addingProductModalContent}
        />
      </div>
    </SinglePageWrapperComponent>
  );
};

export default ProductPageContainer;
