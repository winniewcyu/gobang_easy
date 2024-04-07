import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserHome from "./pages/UserHome";
import AdminHome from "./pages/AdminHome";
import GameRecord from "./pages/GameRecord";
import NewGame from "./pages/NewGame";
import NewGamePublic from "./pages/NewGamePublic";
import NewGamePrivate from "./pages/NewGamePrivate";
import GameUI from "./pages/GameUI";
import AdminCRUD from "./pages/AdminCRUD";
import Logout from "./pages/Logout";
import ProtectedRoutes from "./components/ProtectedRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<UserHome />} />
          <Route path="/gamerecord" element={<GameRecord />} />
          <Route path="/newgame" element={<NewGame />} />
          <Route path="/newgamepublic" element={<NewGamePublic />} />
          <Route path="/newgameprivate" element={<NewGamePrivate />} />
          <Route path="/GameUI" element={<GameUI />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admincrud" element={<AdminCRUD />} />
        </Route>
        <Route path="/logout" element={<Logout />}/>
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render( <App name="GoBang Easy" />);