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

function App() {
  return (
    <LikeProvider>
      <ReplyProvider>
        <ThreadProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Navigate to="/thread" replace />} />

                {/* Thread */}
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
                </Route>

                {/* Edit profile */}
                <Route
                  path="/editProfile"
                  element={
                    <PrivateRoute>
                      <UpdateProfile />
                    </PrivateRoute>
                  }
                />

                {/* Followers / Following dynamic route */}
                {/* <Route
                  path="/follows/:type"
                  element={
                    <PrivateRoute>
                      <FollowersPage />
                    </PrivateRoute>
                  }
                /> */}
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </ThreadProvider>
      </ReplyProvider>
    </LikeProvider>
  );
}

export default App;
