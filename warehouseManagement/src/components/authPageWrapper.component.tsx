import styled from 'styled-components';
import { ReactNode } from 'react';

const AuthPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

type Props = {
    children: ReactNode,
}

const AuthPageWrapperComponent = ({ children }: Props) => <AuthPageWrapper>{children}</AuthPageWrapper>;

export default AuthPageWrapperComponent;
