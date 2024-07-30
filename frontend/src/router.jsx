import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import MainLayout from "./layouts/mainLayout/MainLayout";
import Posts from "./pages/posts/Posts";
import AuthLayout from "./layouts/authLayout/AuthLayout";
import Users from "./pages/users/Users";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<BaseLayout />}>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/posts/*" element={<Posts />} />
                <Route path="/users/*" element={<Users />} />
            </Route>
            <Route path="auth/*" element={<AuthLayout />}>
                <Route path="*" element={<Auth />} />
            </Route>
        </Route>
    ),
);

export default router;