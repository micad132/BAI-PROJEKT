import {
  Tag,
} from '@chakra-ui/react';
import styled from 'styled-components';
import { useAppSelector } from '../../../store';
import { getProducts } from '../../../store/reducers/productReducer.tsx';
import { getCategories } from '../../../store/reducers/categoryReducer.tsx';
import { getWorkers } from '../../../store/reducers/workersReducer.tsx';

const ContentTableWrapper = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const ContentTableComponent = () => {
  const products = useAppSelector(getProducts);
  const categories = useAppSelector(getCategories);
  const workers = useAppSelector(getWorkers);
  return (
    <ContentTableWrapper>
      <div>
        <p>Products count:</p>
        <Tag size="lg" variant="solid" colorScheme="teal">
          {products.length}
        </Tag>
      </div>
      <div>
        <p>Workers count:</p>
        <Tag size="lg" variant="solid" colorScheme="teal">
          {workers.length}
        </Tag>
      </div>
      <div>
        <p>Categories count:</p>
        <Tag size="lg" variant="solid" colorScheme="teal">
          {categories.length}
        </Tag>
      </div>
    </ContentTableWrapper>
  );
};

export default ContentTableComponent;
