import { Register } from "./pages/register";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "../src/pages/Login";
import { AuthProvider } from "./context/AuthProvider";
import PrivateRoute from "./lib/PrivateRoute";
import { Home } from "./pages/home";
import { ThreadProvider } from "./context/ThreadProvider";
import { Replies } from "./pages/Replies";
import { ThreadAndPost } from "./pages/ThreadAndPost";
import { ReplyProvider } from "./context/RepliesProvider";

function App() {
  return (
    <ReplyProvider>
      <ThreadProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Navigate to="/thread" replace />} />
              <Route
                path="/thread/*"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              >
                <Route index element={<ThreadAndPost />} />
                <Route path=":id" element={<Replies />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThreadProvider>
    </ReplyProvider>
  );
}

export default App;
