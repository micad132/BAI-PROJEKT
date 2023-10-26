import { Routes, Route } from 'react-router-dom'
import HomeContainer from "../pages/HomePage/Home.container.tsx";
import TestContainer from "../pages/TestPage/Test.container.tsx";
import LoginPageContainer from "../pages/AuthPage/LoginPage.container.tsx";
import RegisterPageContainer from "../pages/AuthPage/RegisterPage.container.tsx";

const routes = (
    <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/test" element={<TestContainer />} />
        <Route path="/login" element={<LoginPageContainer />} />
        <Route path="/register" element={<RegisterPageContainer />} />
    </Routes>
)

export default routes;
