import styled from 'styled-components';

const NotLoggedUserComponentWrapper = styled.div`
  background-color: red;
  color: #fff;
  padding: 10px 20px;
  font-weight: bold;
`;

const NotLoggedUserComponent = () => (
  <NotLoggedUserComponentWrapper>
    You are not logged!
  </NotLoggedUserComponentWrapper>
);

export default NotLoggedUserComponent;
