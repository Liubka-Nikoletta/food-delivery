import ShopsPage from "./pages/ShopsPage.tsx";
import { Routes, Route } from "react-router-dom";
import ShopDetailsPage from "./pages/ShopDetailsPage.tsx";
import CartPage from "./pages/CartPage.tsx";

function App() {

  return (
      <Routes>
          <Route path="/" element={<ShopsPage />} />
          <Route path="/shops/:hash" element={<ShopDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
      </Routes>
  )
}

export default App
