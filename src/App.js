import Canvas from "./components/Canvas";
import SettingBar from "./components/SettingBar";
import Toolbar from "./components/Toolbar";
import "./styles/app.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/:id" element={<Cmp />}></Route>
          <Route
            path="*"
            element={<Navigate to={`f${(+new Date()).toString(16)}`} replace />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

const Cmp = () => {
  return (
    <>
      <Toolbar />
      <SettingBar />
      <Canvas />
    </>
  );
};
