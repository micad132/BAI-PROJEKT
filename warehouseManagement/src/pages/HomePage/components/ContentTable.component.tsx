import {
  Tag,
} from '@chakra-ui/react';
import styled from 'styled-components';

const ContentTableWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const ContentTableComponent = () => (
  <ContentTableWrapper>
    <div>
      <p>Ilość produktów</p>
      <Tag size="lg" variant="solid" colorScheme="teal">
        8
      </Tag>
    </div>
    <div>
      <p>Ilość faktur</p>
      <Tag size="lg" variant="solid" colorScheme="teal">
        5
      </Tag>
    </div>
  </ContentTableWrapper>
);

export default ContentTableComponent;
