import React, {useEffect} from "react";
import {useTheme} from "@material-ui/core/styles";
import {Router} from "@eachbase/root/router";
import {useDispatch, useSelector} from "react-redux";
import {TopBar, LeftBar} from "./core";
import {navBarStyles} from "./core/style";
import {httpRequestsOnSuccessActions} from "@eachbase/store";
import {Toast} from "@eachbase/components";
import {ToastSuccess, ToastFail} from "@eachbase/utils";

export const MenuBar = ({}) => {
    const classes = navBarStyles(),
        theme = useTheme(),
        [open, setOpen] = React.useState(false),
        [linkInfo, setLinkInfo] = React.useState(""),
        handleDrawerClose = () => {
            setOpen(!open);
        };

    const dispatch = useDispatch()

    const {httpOnError, httpOnSuccess} = useSelector((state) => ({
        httpOnLoad: state.httpOnLoad,
        httpOnError: state.httpOnError,
        httpOnSuccess: state.httpOnSuccess,
    }));

    const success = httpOnSuccess.length && httpOnSuccess[0].type
    const error = httpOnError.length && httpOnError[0].type
    const toastSuccess = ToastSuccess(success)
    const toastFail = ToastFail(error)


    const {saveLink} = useSelector((state) => ({
        saveLink: state.auth.saveLink,
    }));

    useEffect(() => setLinkInfo(saveLink ? saveLink : window.location.pathname),
        [saveLink]
    );

    useEffect(() => {
        if (toastSuccess) {
            dispatch(httpRequestsOnSuccessActions.removeSuccess(success))
        }
    }, [toastSuccess]);

    useEffect(() => {
        if (toastFail) {
            // dispatch(httpRequestsOnErrorsActions.removeError( error ))
        }
    }, [toastFail]);

    const setLinksStyle = () => {
        setLinkInfo(window.location.pathname);
    };

    return (
        <div className={classes.root}>
            <TopBar open={open} handleClick={handleDrawerClose}/>

            <LeftBar
                handleDrawerClose={handleDrawerClose}
                open={open}
                theme={theme}
                setLinksStyle={setLinksStyle}
                linkInfo={linkInfo}
            />
            <main className={classes.content}>
                <Router/>
            </main>
            <Toast
                type={toastSuccess ? 'success' : toastFail ? 'error' : ''}
                text={toastSuccess ? toastSuccess : toastFail ? toastFail : ''}
                info={toastSuccess ? !!toastSuccess : toastFail ? !!toastFail : ''}
            />
        </div>
    );
};
