import React, {useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Images} from "@eachbase/utils";
import {toastStyles} from "./styles";

export const Toast = ({info, text, type}) => {
    const classes = toastStyles()

    const screen =
        <div className={classes.toastWrapper}>
            <img src={type === 'error' ? Images.errorIcon : Images.successIcon} alt="success"/>
            <p className={classes.toastText}>{text}</p>
        </div>

    useEffect(() => {
        if (info) {
            toast(screen);
        }
    }, [info]);
    return (
        <div>
            <ToastContainer
                className={type === 'error' ? `error ${classes.defaultToast}` : `success ${classes.defaultToast}`}
                position="top-center"
                autoClose={3500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover={false}
            />
        </div>
    );
}