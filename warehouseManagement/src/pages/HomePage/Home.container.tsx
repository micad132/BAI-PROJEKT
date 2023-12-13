import {useAppDispatch, useAppSelector} from "../../store";
import {useEffect} from "react";
import {fetchingTestData, getIsLoaded, getTestName} from "../../store/reducers/testReducer.tsx";
import SpinnerComponent from "../../components/spinner.component.tsx";
import {getLoggedUser} from "../../store/reducers/userReducer.tsx";
import LoggedUserComponent from "./components/LoggedUser.component.tsx";
import ContentTableComponent from "./components/ContentTable.component.tsx";

const  HomeContainer = () => {
    const dispatch = useAppDispatch();
    const testData = useAppSelector(getTestName);
    const isLoaded = useAppSelector(getIsLoaded);
    const loggedUser = useAppSelector(getLoggedUser);
    useEffect(() => {
        dispatch(fetchingTestData());
    }, [dispatch]);
    return(
        <div>
            <LoggedUserComponent username={loggedUser.username} />
            {isLoaded ? testData : <SpinnerComponent />}
            <ContentTableComponent />
        </div>
    )
}

export default HomeContainer;
