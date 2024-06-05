import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import SignUP from "./pages/SignUP";
import SignIn from "./pages/SignIn";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import Header from "./componets/Header";
import Header2 from "./componets/Header2";
import Footer from "./componets/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Header2 />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUP />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    // <About></About>
  );
}
