import React from 'react';
import { render } from 'react-dom';
// import Hello from './Hello';
import { toast, ToastContainer } from 'react-toastify';
import Transition from 'react-transition-group/Transition';


const ZoomInAndOut = ({ children, position, ...props }) => (
   <div></div>
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
        {/*<Hello name="CodeSandbox" />*/}
        <h2>Start editing to see some magic happen {'\u2728'}</h2>
        <button onClick={notify}>Toast</button>
        <ToastContainer position="top-right"
                        autoClose={4000}/>
    </div>
);

