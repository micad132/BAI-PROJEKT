import styled from 'styled-components';
import React, { ReactNode } from 'react';
import { useAppSelector } from '../store';
import { getLoggedUser } from '../store/reducers/userReducer.tsx';
import NotLoggedUserComponent from './notLoggedUser.component.tsx';

const SinglePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
`;

type Props = {
  children: ReactNode,
};

const SinglePageWrapperComponent = ({ children }: Props) => {
  const loggedUser = useAppSelector(getLoggedUser);
  if (loggedUser.email === '') {
    return (
      <NotLoggedUserComponent />
    );
  }
  return (
    <SinglePageWrapper>
      {children}
    </SinglePageWrapper>
  );
};

export default SinglePageWrapperComponent;
