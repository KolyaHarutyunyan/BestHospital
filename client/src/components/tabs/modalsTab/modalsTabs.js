import React from 'react';
import {modalHeadersStyle} from "./styles";
import {Images} from "@eachbase/utils";


export const ModalsTabs = ({steps, setStep, secondStepInfo}) => {
    const classes = modalHeadersStyle()
    return (
        <div className={classes.createFundingSourceHeaderBottom}>
            <div className={classes.createFundingSourceHeaderBottomLine}/>
            <div className={classes.createFundingSourceHeaderBottomBlock}>
                <div onClick={()=>setStep('first')} style={steps!=='first' ? {cursor: 'pointer'}: null}>
                    <div className={classes.createFundingSourceHeaderBottomCircle}>
                        <img src={steps === 'first' ? Images.clientModalicon1 : Images.clientModalicon3} alt="icon"
                             className={classes.modalsTabsIcons}/>
                    </div>
                </div>
                <p className={classes.createFundingSourceHeaderBottomText}>General Info</p>
            </div>
            <div className={classes.createFundingSourceHeaderBottomBlock}>
                <div className={classes.createFundingSourceHeaderBottomCircle}
                     style={{backgroundColor: steps === 'first' && '#4B5C6880'}}>
                        <img src={Images.clientModalicon2} alt="icon" className={classes.modalsTabsIcons}/>
                </div>
                <p style={{color: steps === 'first' && '#4B5C6880'}}
                   className={classes.createFundingSourceHeaderBottomText}> { secondStepInfo ? secondStepInfo : 'Other Details'}</p>
            </div>
        </div>
    );
};

