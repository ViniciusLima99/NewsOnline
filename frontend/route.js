import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OutraPagina from "./pages/OutraPagina"; // Importe outras páginas

// Crie as rotas aqui
const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/principal",
    element: <OutraPagina />,
  },
];

export default routes;