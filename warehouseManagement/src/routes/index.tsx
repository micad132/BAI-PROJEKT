import { Routes, Route } from 'react-router-dom'
import HomeContainer from "../pages/HomePage/Home.container.tsx";
import TestContainer from "../pages/TestPage/Test.container.tsx";

const routes = (
    <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/test" element={<TestContainer />} />
    </Routes>
)

export default routes;
