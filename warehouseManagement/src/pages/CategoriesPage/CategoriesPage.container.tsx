import {
  Button,
  Td, Th, Tr, useToast,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import SinglePageWrapperComponent from '../../components/singlePageWrapper.component.tsx';
import TableComponent from '../../components/table.component.tsx';
import ModalComponent from '../../components/modal.component.tsx';
import { CATEGORIES_TABLE_HEADERS } from '../../mock/mockData.mock.ts';
import InputComponent from '../../components/input.component.tsx';
import { sanitizeData, validateSingleString } from '../../services/validators/validator.ts';
import {
  addingCategoryThunk,
  deletingCategoryThunk,
  getCategories,
  updatingCategoryThunk,
} from '../../store/reducers/categoryReducer.tsx';
import { useAppDispatch, useAppSelector } from '../../store';
import SpanComponent from '../../components/span.component.tsx';

const CategoriesPageContainer = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [addCategoryData, setAddCategoryData] = useState<string>('');
  const [editCategoryData, setEditCategoryData] = useState<string>('');
  const [categoryError, setCategoryError] = useState<string>('');
  const categories = useAppSelector(getCategories);

  const deleteCategoryHandler = (id: string) => {
    dispatch(deletingCategoryThunk(id));
    toast({
      title: 'Category deleted',
      status: 'success',
      duration: 3000,
      position: 'top-right',
      isClosable: true,
    });
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAddCategoryData(sanitizeData(e.target.value));
  };

  const onEditChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEditCategoryData(sanitizeData(e.target.value));
  };

  const editCategoryHandler = (id: string) => {
    console.log('EDIT CAT', editCategoryData);
    if (validateSingleString(editCategoryData)) {
      setCategoryError('Invalid category name');
      toast({
        title: 'Invalid input',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }
    const editData = {
      id,
      name: editCategoryData,
    };
    dispatch(updatingCategoryThunk(editData));
    console.log('EDYCJA PRODUKTU');
    toast({
      title: 'Product edited',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const addCategoryHandler = () => {
    if (validateSingleString(addCategoryData)) {
      setCategoryError('Invalid category name');
      toast({
        title: 'Invalid input',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }
    dispatch(addingCategoryThunk(addCategoryData));
    toast({
      title: 'Category added',
      description: 'Category added',
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'top-right',
    });
    setAddCategoryData('');
    setCategoryError('');
  };

  const deletingProductModalContent = (name: string) => (
    <div>
      <h3>
        Do you confirm deleting
        <SpanComponent text={name} />
        ?
      </h3>
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
      <InputComponent placeholder="Category name" value={editCategoryData} onChange={onEditChangeHandler} errorText={categoryError} />
    </div>
  );

  const addingCategoryModalContent = (
    <div>
      <h4>Add category here</h4>
      <InputComponent
        placeholder="Category name"
        value={addCategoryData}
        onChange={onChangeHandler}
        errorText={categoryError}
      />
    </div>
  );

  const mappedData = categories.map((data) => (
    <Tr key={data.id}>
      <Td>{data.id}</Td>
      <Td>{data.name}</Td>
      <Td>
        <ModalComponent
          buttonText="Edit"
          modalHeader="Edit category"
          modalAction={() => editCategoryHandler(data.id)}
          modalContent={editingProductModalContent(Number(data.id), data.name)}
          onCloseFromParent={() => {
            setCategoryError('');
            setEditCategoryData('');
          }}
          isClosingDisabled={categoryError.length > 0}
          test={categoryError}
        />
      </Td>
      <Td>
        <ModalComponent
          modalHeader="Delete category"
          buttonText="Delete"
          modalAction={() => deleteCategoryHandler(data.id)}
          modalContent={deletingProductModalContent(data.name)}
        />
      </Td>
    </Tr>
  ));
  const mappedHeaders = CATEGORIES_TABLE_HEADERS.map((header, index) => <Th isNumeric={header.isNumeric} key={index}>{header.name}</Th>);

  return (
    <SinglePageWrapperComponent>
      <TableComponent tableCaption="Categories" mappedData={mappedData} mappedHeaders={mappedHeaders} />
      <div style={{ flex: '0' }}>
        <ModalComponent buttonText="Add category" modalAction={addCategoryHandler} modalHeader="Adding category" modalContent={addingCategoryModalContent} />
      </div>
    </SinglePageWrapperComponent>
  );
};

export default CategoriesPageContainer;
