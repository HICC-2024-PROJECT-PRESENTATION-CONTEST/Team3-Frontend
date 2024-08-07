import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';

import KeyHandler from './pages/adminPage/QR/KeyHandler';

import AdminLogin from "./pages/adminPage/Admin/AdminLogin";
import Admin from "./pages/adminPage/Admin/Admin";
import QR from './pages/adminPage/QR/QR';
import Users from './pages/adminPage/Users/Users';

import Start from './pages/userPage/Start/Start';
import Agreement from './pages/userPage/Agreement/Agreement';
import Agreement1 from "./pages/userPage/Agreement/Agreement1";
import Agreement2 from "./pages/userPage/Agreement/Agreement2";
import Profile from './pages/userPage/Profile/Profile';
import ProfilePicture from './pages/userPage/Profile/ProfilePicture';
import Recommends from './pages/userPage/Recommends/Recommends';
import Message from './pages/userPage/Message/Message';
import MyPage from './pages/userPage/MyPage/MyPage';
import Login from './pages/userPage/Login/Login';
import Error404 from './pages/Error/Error404';
import Error500 from './pages/Error/Error500';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/qr/:key" element={<KeyHandler />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/qr" element={<QR />} />
        <Route path="/login" element={<Login />} />
        <Route path="/agreement" element={<Agreement />} />
        <Route path="/agreement/1" element={<Agreement1 />} />
        <Route path="/agreement/2" element={<Agreement2 />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profilepicture" element={<ProfilePicture />} />
        <Route path="/recommends" element={<Recommends />} />
        <Route path="/message" element={<Message />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/500" element={<Error500 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;