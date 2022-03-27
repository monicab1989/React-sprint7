import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Inicio } from "../pages/Inicio";
import { ScreenPagWeb } from "../pages/ScreenPagWeb";

export default () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/screenPagWeb" element={<ScreenPagWeb />} />
      <Route path="/screenPagWeb/:id" element={<ScreenPagWeb />} />
      <Route path="*" element={<di>404</di>} />
    </Routes>
  </BrowserRouter>
);
