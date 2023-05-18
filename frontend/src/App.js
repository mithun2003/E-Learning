import ThemeProvider from "./components/Admin/theme";
import { StyledChart } from "./Admin/chart";
import ScrollToTop from "./Admin/scroll-to-top";
import "./App.css";
import MainRoutes from "./Routes/MainRoutes";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <div className="App">
      {/* <HelmetProvider>
        <MainRoutes/>
      </HelmetProvider> */}
      {/* <AdminRoute/> */}

      <HelmetProvider>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <MainRoutes />
        </ThemeProvider>
      </HelmetProvider>
    </div>
  );
}

export default App;
