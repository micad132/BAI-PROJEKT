import SingleLinkComponent from "./SingleLink.component.tsx";
import styled from "styled-components";

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
`

const NavComponent = () => {

    return(
        <NavWrapper>
            <SingleLinkComponent path={"/"} text={'HOME'} />
            <SingleLinkComponent path={"/test"} text={'TEST'} />
            <SingleLinkComponent path={"/login"} text={'Login'} />
            <SingleLinkComponent path={"/products"} text={'Products'} />
            <SingleLinkComponent path={"/invoices"} text={'Invoices'} />
        </NavWrapper>
    )
}

export default NavComponent;
