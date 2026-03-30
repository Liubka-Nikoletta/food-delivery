import ShopsPage from "./pages/ShopsPage.tsx";
import { Routes, Route } from "react-router-dom";
import ShopDetailsPage from "./pages/ShopDetailsPage.tsx";

function App() {

  return (
      <Routes>
          <Route path="/" element={<ShopsPage />} />
          <Route path="/shops/:hash" element={<ShopDetailsPage />} />
      </Routes>
  )
}

export default App
