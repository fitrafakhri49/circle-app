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
import { LikeProvider } from "./context/LikeProvider";
import { UpdateProfile } from "./pages/editProfile";
import { FollowersPage } from "./pages/follows";
import { FollowProvider } from "./context/FollowProvider";
import { SearchPage } from "./pages/SearchPage";

function App() {
  return (
    <AuthProvider>
      <FollowProvider>
        <LikeProvider>
          <ReplyProvider>
            <ThreadProvider>
              <BrowserRouter>
                <Routes>
                  {/* Halaman publik */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Redirect root */}
                  <Route path="/" element={<Navigate to="/thread" replace />} />

                  {/* Halaman privat */}
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
                    <Route path="follow/:type" element={<FollowersPage />} />
                    <Route path="search" element={<SearchPage />} />
                  </Route>

                  <Route
                    path="/editProfile"
                    element={
                      <PrivateRoute>
                        <UpdateProfile />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </BrowserRouter>
            </ThreadProvider>
          </ReplyProvider>
        </LikeProvider>
      </FollowProvider>
    </AuthProvider>
  );
}

export default App;
