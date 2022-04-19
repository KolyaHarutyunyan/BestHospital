import React from 'react';
import {modalHeadersStyle} from "./styles";

export const ModalHeaderBottom = ({}) => {
    const classes = modalHeadersStyle();
    
    return (
        <div className={classes.createFundingSourceHeaderBottom} >
            <div className={classes.createFundingSourceHeaderBottomLine} />
            <div className={classes.createFundingSourceHeaderBottomBlock}  >
                <div className={classes.createFundingSourceHeaderBottomPosition}>
                    <div className={classes.createFundingSourceHeaderBottomCircle}>
                        <p>1</p>
                    </div>
                </div>
                <p className={classes.createFundingSourceHeaderBottomText}>General Information</p>
            </div>
            <div className={classes.createFundingSourceHeaderBottomBlock}>
                <div className={classes.createFundingSourceHeaderBottomCircle}>
                    <p>2</p>
                </div>
                <p className={classes.createFundingSourceHeaderBottomText}>Address</p>
            </div>
        </div>
    );
};

