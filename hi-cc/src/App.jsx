import { Routes, Route, BrowserRouter } from "react-router-dom";

import QR from './pages/adminPage/QR';
import Privacy from './pages/adminPage/Privacy';

import Start from './pages/userPage/Start';
import Agreement from './pages/userPage/Agreement';
import Profile from './pages/userPage/Profile';
import Recommends from './pages/userPage/Recommends';
import Message from './pages/userPage/Message';
import MyPage from './pages/userPage/MyPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/manage/qr" element={<QR />} />
        <Route path="/manage" element={<Privacy />} />
        <Route path="/agreement" element={<Agreement />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recommends" element={<Recommends />} />
        <Route path="/Message" element={<Message />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;