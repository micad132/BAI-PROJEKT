import './App.css';
import styled from 'styled-components';
import axios from 'axios';
import LayoutContainer from './layout/Layout.container.tsx';
import routes from './routes';

const AppWrapper = styled.div`
    width: 80%;
    margin: 0 auto;
    padding: 0;
    overflow: hidden;
  color: #fff;
`;

axios.defaults.withCredentials = true;

const App = () => (
  <AppWrapper>
    <LayoutContainer>
      {routes}
    </LayoutContainer>
  </AppWrapper>
);

export default App;
