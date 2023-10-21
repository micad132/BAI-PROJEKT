import {type ReactElement, ReactNode} from 'react'
import NavComponent from "./nav/Nav.component.tsx";

interface Props {
    children: ReactNode,
}

const Layout = ({ children }: Props): ReactElement => {
    return (
        <div>
            <NavComponent />
            <main>{children}</main>
        </div>
    )
}

export default Layout
