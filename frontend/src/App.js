import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import Home from './pages/home';
import User_Rent from './pages/user_rent';

import Admin_all_cars from './admin/cars/allcars';
import Admin_create_car from './admin/cars/createcar';
import Admin_delete_car from './admin/cars/deletecar';

import Admin_all_users from './admin/user/allusers';
import Admin_create_user from './admin/user/createuser';
import Admin_delete_user from './admin/user/deleteuser';

import Admin_all_rents from './admin/rent/all_rents';




function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user_rent" element={<User_Rent />} />

        <Route path="/admin/Admin_all_cars" element={<Admin_all_cars />} />
        <Route path="/admin/Admin_create_car" element={<Admin_create_car />} />
        <Route path="/admin/Admin_delete_car" element={<Admin_delete_car />} />

        <Route path="/admin/Admin_all_users" element={<Admin_all_users />} />
        <Route path="/admin/Admin_create_user" element={<Admin_create_user />} />
        <Route path="/admin/Admin_delete_user" element={<Admin_delete_user />} />

        <Route path="/admin/Admin_all_rents" element={<Admin_all_rents />} />
       {/* <Route path="*" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>


  );
}

export default App;
