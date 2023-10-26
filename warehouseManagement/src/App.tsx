import './App.css'
import LayoutContainer from "./layout/Layout.container.tsx";
import routes from "./routes";
import styled from "styled-components";

const AppWrapper = styled.div`
    width: 80%;
    margin: 0 auto;
    padding: 0;
    overflow: hidden;
`

function App() {
  return (
      <AppWrapper>
          <LayoutContainer>
              {routes}
          </LayoutContainer>
      </AppWrapper>
  )
}

export default App
