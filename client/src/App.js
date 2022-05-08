import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register.js";
import Login from "./pages//Login/Login";
import Chat from "./pages/Chat/Chat";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
