import { Register } from "./pages/register";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { Login } from "./pages/login";
import { AuthProvider } from "./context/AuthProvider";
import PrivateRoute from "./lib/PrivateRoute";
import { Home } from "./pages/home";
import { ThreadProvider } from "./context/ThreadProvider";
// import { ThreadProvider } from "./context/ThreadProvider";

function App() {
  return (
    <ThreadProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={<PrivateRoute>{<Home />}</PrivateRoute>}
            ></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThreadProvider>
  );
}

export default App;
