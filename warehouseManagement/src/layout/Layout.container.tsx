import {type ReactElement, ReactNode} from 'react'
import NavComponent from "./nav/Nav.component.tsx";
import styled from "styled-components";

interface Props {
    children: ReactNode,
}

const MainWrapper = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    margin: 100px auto 0 auto;
    min-height: 50vh;
`

const Layout = ({ children }: Props): ReactElement => {
    return (
        <div>
            <NavComponent />
            <MainWrapper>{children}</MainWrapper>
        </div>
    )
}

export default Layout
