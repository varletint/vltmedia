import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import SignUP from "./pages/SignUP";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Header from "./componets/Header";
import Footer from "./componets/Footer";
import PrivateRoute from "./componets/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import IsAdminPrivateRoute from "./componets/IsAdminPrivateRoute";
import PostPage from "./pages/PostPage";
import Flex from "./pages/Flex";
import ScrollToTop from "./componets/ScrollToTop";
import Search from "./pages/Search";
import DashEdit from "./componets/DashEdit";
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/flex' element={<Flex />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-up' element={<SignUP />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/search' element={<Search />} />
        <Route path='/post/:postSlug' element={<PostPage />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<IsAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
          <Route path='/update-user/:userId' element={<DashEdit />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
