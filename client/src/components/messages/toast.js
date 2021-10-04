import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

const ZoomInAndOut = ({ children, position, ...props }) => (
   <></>
);

function notify(){
    toast.error('Hello', {
        transition: ZoomInAndOut,
        autoClose: 5000
    });
}

const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
};

export const CustomToaster = () => (
    <div style={styles}>
        <h2>Start editing to see some magic happen {'\u2728'}</h2>
        <button onClick={notify}>Toast</button>
        <ToastContainer position="top-right"
                        autoClose={4000}/>
    </div>
);

