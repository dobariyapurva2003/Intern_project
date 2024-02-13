import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Home";
import Navbar_normal from "./Navbar_normal";
import Choice from "./Choice";
import First from "./First";
import Admin_verify from "./Admin_verify";
import Navbar from "./Navbar";
import Valid from "./Valid";
import Valid_admin from "./Valid_admin";
import Navbar_admin from "./Navbar_admin";
import Display_Fav from "./Display_Fav";
import View from "./View";
import Edit from "./Edit";
import Folder from "./Folder";
import Disp_feed from "./Disp_feed";
import Branch from "./Branch";
import Email from "./Email";

const App = () => {

  const [user,setuser] = useState({});
  const [admin_user, admin_setuser] = useState({});
  

  return (
    <Router>
      <Routes>
      <Route element={
          <>
            <Valid setuser={setuser} />
            <Outlet />
          </>}>
          <Route path="/After_login" element={<Navbar user={user} />} />
          <Route path="/display" element={<Display_Fav user={user} />} />
          <Route path="/view_profile" element={<View user={user} />} />
          <Route path="/edit_profile" element={<Edit user={user} />} />
          <Route path="/folder" element={<Folder user={user} />} />
        </Route>

        <Route element={
          <>
            <Valid_admin admin_setuser={admin_setuser} />
            <Outlet />
          </>}>
          <Route path="/After_login_admin" element={<Navbar_admin admin_user={admin_user} />} />
          <Route path="/displayFeedback" element={<Disp_feed admin_user={admin_user} />} />
          <Route path="/set_topic" element={<Branch admin_user={admin_user} />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/landing_page" element={<Navbar_normal />} />
        <Route path="/choice" element={<Choice />} />
        <Route path="/first" element={<First />} />
        <Route path="/admin" element={<Admin_verify />} />
        <Route path="/email" element={<Email />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App;