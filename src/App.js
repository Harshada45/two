import "./App.css";

import Login from "./components/login/Login";
import Home from "./components/home/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Task from "./components/task/Task";
import User from "./components/user/User";
import About from "./components/about/About";
import Content from "./components/content/Content";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      {/* <ToastContainer /> */}
      <Routes>
        <Route path="/dashboard" element={<Navbar></Navbar>}>
          <Route index element={<Home></Home>} />
          <Route path="task" element={<Task></Task>} />
          <Route path="user" element={<User></User>} />
          <Route path="about" element={<About></About>} />
          <Route path="content" element={<Content></Content>} />
        </Route>
        <Route path="/" element={<Login></Login>} />
      </Routes>
    </div>
  );
}

export default App;
