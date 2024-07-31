import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';

import AdminLogin from './pages/adminPage/AdminLogin/AdminLogin';
import QR from './pages/adminPage/QR/QR';
import Privacy from './pages/adminPage/Privacy/Privacy';

import Start from './pages/userPage/Start/Start';
import Agreement from './pages/userPage/Agreement/Agreement';
import Agreement1 from "./pages/userPage/Agreement/Agreement1";
import Agreement2 from "./pages/userPage/Agreement/Agreement2";
import Profile from './pages/userPage/Profile/Profile';
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
        <Route path="/manager-login/:key" element={<AdminLogin />} />
        <Route path="/admin/qr" element={<QR />} />
        <Route path="/admin/profiles" element={<Privacy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/agreement" element={<Agreement />} />
        <Route path="/agreement/1" element={<Agreement1 />} />
        <Route path="/agreement/2" element={<Agreement2 />} />
        <Route path="/profile" element={<Profile />} />
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