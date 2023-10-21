import {useAppDispatch, useAppSelector} from "../../store";
import {useEffect} from "react";
import {fetchingTestData, getIsLoaded, getTestName} from "../../store/reducers/testReducer.tsx";
import SpinnerComponent from "../../components/spinner.component.tsx";

const  HomeContainer = () => {
    const dispatch = useAppDispatch();
    const testData = useAppSelector(getTestName);
    const isLoaded = useAppSelector(getIsLoaded);
    useEffect(() => {
        dispatch(fetchingTestData());
    }, [dispatch]);
    return(
        <div>
            {isLoaded ? testData : <SpinnerComponent />}
        </div>
    )
}

export default HomeContainer;
