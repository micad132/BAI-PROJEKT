import { Routes, Route } from 'react-router-dom'
import HomeContainer from "../pages/HomePage/Home.container.tsx";
import TestContainer from "../pages/TestPage/Test.container.tsx";
import LoginPageContainer from "../pages/AuthPage/LoginPage.container.tsx";
import RegisterPageContainer from "../pages/AuthPage/RegisterPage.container.tsx";
import ProductPageContainer from "../pages/ProductPage/ProductPage.container.tsx";
import InvoicePageContainer from "../pages/InvoicePage/InvoicePage.container.tsx";

const routes = (
    <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/test" element={<TestContainer />} />
        <Route path="/login" element={<LoginPageContainer />} />
        <Route path="/register" element={<RegisterPageContainer />} />
        <Route path="/products" element={<ProductPageContainer />} />
        <Route path="/invoices" element={<InvoicePageContainer />} />
    </Routes>
)

export default routes;
