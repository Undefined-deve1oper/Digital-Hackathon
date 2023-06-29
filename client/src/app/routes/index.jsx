import { Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Route, Routes } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import Appbar from "../components/common/Appbar/Appbar";
import Backdrop from "../components/ui/Backdrop/Backdrop";
import EditPost from "../components/ui/EditPost/EditPost";
import { setEditingPost } from "../store/features/postSlice";

const Posts = lazy(() => import("../layouts/Posts/Posts"));
const SinglePost = lazy(() => import("../layouts/SinglePost/SinglePost"));
const Profile = lazy(() => import("../layouts/Profile/Profile"));
const NotFound = lazy(() => import("../layouts/NotFound/NotFound"));

const Layout = () => {
    const {
        post: { editingPost }
    } = useSelector((state) => state);

    const dispatch = useDispatch();

    const closeEditing = () => {
        dispatch(setEditingPost({}));
    };

    return (
        <>
            <Backdrop show={!!editingPost._id} onClose={closeEditing}>
                <EditPost close={closeEditing} />
            </Backdrop>
            <Appbar />
            <Suspense fallback={<ProgressBar />}>
                <Outlet />
            </Suspense>
        </>
    );
};

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Posts />} />
                <Route path="/post/:id" element={<SinglePost />} />
                <Route path="/user/:id" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default Router;
