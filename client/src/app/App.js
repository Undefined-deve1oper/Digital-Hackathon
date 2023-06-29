import React, { useEffect, useState } from "react";
//utilities
import Cookies from "js-cookie";
import useFetch from "./hooks/useFetch.js";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "./store/features/postSlice.js";
import { login } from "./store/features/userSlice.js";
import { getUsers } from "./store/features/usersSlice.js";
//components
import Loading from "./components/common/Loading/Loading.jsx";
import Modal from "./components/common/Modal/Modal.jsx";
import Backdrop from "./components/ui/Backdrop/Backdrop.jsx";
import Online from "./components/ui/Online/Online.jsx";
import ThemeSwitch from "./components/ui/ThemeSwitch/ThemeSwitch.jsx";
import "./index.css";
import Auth from "./layouts/Auth/Auth.jsx";
import Router from "./routes";
import { ToastContainer } from "react-toastify";

const App = () => {
    const dispatch = useDispatch();
    const customFetch = useFetch();
    const [theme, setTheme] = useState("dark");
    const {
        user: { id },
        modal: { isLoading, isSidebarVisible },
    } = useSelector((state) => state);

    //login
    useEffect(() => {
        const user = Cookies.get("user");
        if (user) {
            dispatch(login(JSON.parse(user)));
        } else dispatch(login({ id: "guest", isGuest: true }));
    }, [dispatch]);

    //get users
    useEffect(() => {
        dispatch(getUsers({ customFetch }));
        dispatch(setPosts({ customFetch }));
    }, [id, customFetch, dispatch,]);

    return (
        <div className={"app " + theme}>
            <div className="container">
                <div
                    className={isSidebarVisible ? "sidebar visible" : "sidebar"}
                >
                    <ThemeSwitch setTheme={setTheme} />
                    <Online />
                </div>
                <ThemeSwitch setTheme={setTheme} />
                <Modal />
                {id ? <Router /> : <Auth />}
            </div>
            <Backdrop show={isLoading}>
                <Loading />
            </Backdrop>
            <ToastContainer />
        </div>
    );
};

export default App;
