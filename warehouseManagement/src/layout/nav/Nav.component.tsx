import SingleLinkComponent from "./SingleLink.component.tsx";

const NavComponent = () => {

    return(
        <nav>
            <SingleLinkComponent path={"/"} text={'HOME'} />
            <SingleLinkComponent path={"/test"} text={'TEST'} />
        </nav>
    )
}

export default NavComponent;
