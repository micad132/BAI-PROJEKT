import { Routes, Route } from 'react-router-dom';
import HomeContainer from '../pages/HomePage/Home.container.tsx';
import TestContainer from '../pages/TestPage/Test.container.tsx';
import LoginPageContainer from '../pages/AuthPage/LoginPage.container.tsx';
import RegisterPageContainer from '../pages/AuthPage/RegisterPage.container.tsx';
import ProductPageContainer from '../pages/ProductPage/ProductPage.container.tsx';
import WorkersPageContainer from '../pages/WorkersPage/WorkersPage.container.tsx';
import CategoriesPageContainer from '../pages/CategoriesPage/CategoriesPage.container.tsx';

const routes = (
  <Routes>
    <Route path="/" element={<HomeContainer />} />
    <Route path="/test" element={<TestContainer />} />
    <Route path="/login" element={<LoginPageContainer />} />
    <Route path="/register" element={<RegisterPageContainer />} />
    <Route path="/products" element={<ProductPageContainer />} />
    <Route path="/workers" element={<WorkersPageContainer />} />
    <Route path="/categories" element={<CategoriesPageContainer />} />
  </Routes>
);

export default routes;
