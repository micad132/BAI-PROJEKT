import styled from 'styled-components';
import SingleLinkComponent from './SingleLink.component.tsx';

const NavWrapper = styled.nav`
    background-color: #5B7B7A;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    font-size: 20px;
    color: #fff;
    text-transform: uppercase;
    position: relative;
`;

const NormalPagesWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const AuthPagesWrapper = styled.div`
    position: absolute;
    right: 30px;
    display: flex;
    gap: 10px;
`;

const NavComponent = () => (
  <NavWrapper>
    <NormalPagesWrapper>
      <SingleLinkComponent path="/" text="HOME" />
      <SingleLinkComponent path="/products" text="Products" />
      <SingleLinkComponent path="/invoices" text="Invoices" />
    </NormalPagesWrapper>
    <AuthPagesWrapper>
      <SingleLinkComponent path="/login" text="Login" />
      <SingleLinkComponent path="/logout" text="Logout" />
    </AuthPagesWrapper>
  </NavWrapper>
);

export default NavComponent;
