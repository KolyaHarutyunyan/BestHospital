import React from 'react';
import {createFoundingSourceStyle} from "./styles";

const CreateFundingSourceHeaderBottom = () => {
    const classes = createFoundingSourceStyle()
    return (
        <div className={classes.createFundingSourceHeaderBottom}>
            <div className={classes.createFundingSourceHeaderBottomLine}></div>
            <div className={classes.createFundingSourceHeaderBottomBlock} >
              <div className={classes.createFundingSourceHeaderBottomPosition} >
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

export default CreateFundingSourceHeaderBottom;