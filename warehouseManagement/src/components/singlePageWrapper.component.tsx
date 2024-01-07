import styled from 'styled-components';
import { ReactNode } from 'react';

const SinglePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
`;

type Props = {
  children: ReactNode,
};

const SinglePageWrapperComponent = ({ children }: Props) => (
  <SinglePageWrapper>
    {children}
  </SinglePageWrapper>
);

export default SinglePageWrapperComponent;
