import { Routes, Route } from "react-router-dom";
import bgImage from "./assets/bgAmanftx.png";
import Navbar from "./components/Navbar"; // Ensure path is correct
import Home from "./pages/Home";
import HireMe from "./pages/HireMe";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import ProjectDetails from "./pages/ProjectDetails";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AddProject from "./admin/AddProject";
import CategoryPage from "./pages/CategoryPage";
import TermAndConditions from "./pages/TermAndCondition";
import EditProject from "./admin/EditProject";
// Dummy Components for missing pages (Aap inki alag files bana sakte hain)
// const Portfolio = () => <div className="pt-32 text-center text-white text-4xl font-bold">My Portfolio Works</div>;
// const Contact = () => <div className="pt-32 text-center text-white text-4xl font-bold">Contact Me</div>;

function App() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Navbar /> {/* Navbar hamesha dikhega */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutme" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hire-me" element={<HireMe />} />
        <Route path="/term" element={<TermAndConditions />} />
        {/* <Route path="/portfolio/:id" element={<ProjectDetails />} /> */}
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        {/* Admin  */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-project" element={<AddProject />} />
        <Route path="/admin/edit-project/:id" element={<EditProject />} />
      </Routes>
    </div>
  );
}

export default App;
