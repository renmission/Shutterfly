import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import MainLayout from "./layouts/mainLayout/MainLayout";
import Posts from "./pages/posts/Posts";
import Auth from "./pages/users/Auth";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<BaseLayout />}>
            <Route path="/" element={<MainLayout />}>
                    <Route path="/*" element={<Auth />} />
                    <Route path="/posts/*" element={<Posts />} />
            </Route>
        </Route>
    ),
);

export default router;