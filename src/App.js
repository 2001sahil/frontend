import './App.css';
import {  Routes, Route } from "react-router-dom";
import SignUp from "./component/Authentication/SignUp"
import LogIn from "./component/Authentication/LogIn"
import Chatpage from "./Pages/Chatpage"
import ChatProvider from "./Context/ChatProvider";
import { BrowserRouter } from "react-router-dom";
// const socket=io.connect("http://localhost:8000")
function App() {
    return (
      <BrowserRouter>
      <ChatProvider>
        <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/chat" element={<Chatpage/>} />
        </Routes>
        </ChatProvider>
        </BrowserRouter>
    );

}

export default App;
