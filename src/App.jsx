import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ForecastPage from "./pages/ForecastPage";
import CausesAndSolutions from "./pages/CausesAndSolutions";

export default function App() {
  return (
    <div className="w-full h-dvh bg-creamy flex justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route index element={<HomePage/>} />
            <Route
              path="/about"
              element={
                <About />
              }
            />
            <Route
              path="/contact"
              element={
                <Contact />
              }
            />
            <Route
              path="/forecast"
              element={
                <ForecastPage />
              }
            />
            <Route
              path="/causes&solutions"
              element={
                <CausesAndSolutions />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
