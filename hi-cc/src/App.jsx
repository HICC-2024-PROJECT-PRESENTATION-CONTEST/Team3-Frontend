import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import AdminLogin from './pages/adminPage/AdminLogin';
import QR from './pages/adminPage/QR/QR';
import Privacy from './pages/adminPage/Privacy/Privacy';

import Start from './pages/userPage/Start/Start';
import Agreement from './pages/userPage/Agreement/Agreement';
import Profile from './pages/userPage/Profile/Profile';
import Recommends from './pages/userPage/Recommends/Recommends';
import Message from './pages/userPage/Message/Message';
import MyPage from './pages/userPage/MyPage/MyPage';
import Login from './pages/userPage/Login/Login';
import Error from './pages/Error/Error';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/manager-login/:key" element={<AdminLogin />} />
        <Route path="/admin/qr" element={<QR />} />
        <Route path="/admin/profiles" element={<Privacy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/agreement" element={<Agreement />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recommends" element={<Recommends />} />
        <Route path="/message" element={<Message />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;