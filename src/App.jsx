import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ProtectedRoute from "./services/protectedRoutes";
import AddContact from "./pages/AddContact";

const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddContact />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
