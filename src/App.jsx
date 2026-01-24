import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import toast from "react-hot-toast";
import ProtectedRoute from "./context/ProtectedRoute";
import CreateRfqPage from "./pages/CreateRfqPage.jsx";
import ListRfqPage from "./pages/ListRfqPage.jsx";
import DetailRfqPage from "./pages/DetailRfqPage.jsx";
import LoginToken from "./pages/LoginToken.jsx";


const App = () => {
  return (
    <div data-theme="sunset">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login-token" element={<LoginToken />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create-rfq" element={<CreateRfqPage />} />
          <Route path="/rfq/list" element={<ListRfqPage />} />
          <Route path="/rfq/:id" element={<DetailRfqPage />} />
        </Route>



      </Routes>
    </div>
  );
};

export default App;