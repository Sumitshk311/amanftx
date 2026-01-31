import { Routes, Route } from "react-router-dom";
import bgImage from "./assets/bgAmanftx.png";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import HireMe from "./pages/HireMe";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import ProjectDetails from "./pages/ProjectDetails";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CategoryPage from "./pages/CategoryPage";
import TermAndConditions from "./pages/TermAndCondition";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AddProject from "./admin/AddProject";
import EditProject from "./admin/EditProject";
import AdminRoute from "./admin/AdminRoute"; // 🔥 IMPORT

function App() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Navbar />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/aboutme" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hire-me" element={<HireMe />} />
        <Route path="/term" element={<TermAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/project/:id" element={<ProjectDetails />} />

        {/* Admin Login */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* 🔐 Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-project"
          element={
            <AdminRoute>
              <AddProject />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/edit-project/:id"
          element={
            <AdminRoute>
              <EditProject />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
