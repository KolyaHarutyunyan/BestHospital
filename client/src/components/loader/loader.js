import React from "react";
import {CircularProgress} from "@material-ui/core";
import {Colors} from "../../utils";

export const Loader = ({style}) => {
    return (
        <div style={{display: "flex", alignItems: "center", height: "60vh", width: '100%', justifyContent: 'center'}}>
            <CircularProgress
                style={{
                    width: "100px",
                    height: "100px",
                    position:style ? style : 'absolute',
                    left: 0,
                    right: 0,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    color: Colors.ThemeBlue,
                }}
            />
        </div>
    );
};
