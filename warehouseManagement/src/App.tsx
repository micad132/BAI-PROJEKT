import './App.css'
import LayoutContainer from "./layout/Layout.container.tsx";
import routes from "./routes";

function App() {
  return (
      <div>
          <LayoutContainer>
              {routes}
          </LayoutContainer>
          WITAM TEST
      </div>
  )
}

export default App
