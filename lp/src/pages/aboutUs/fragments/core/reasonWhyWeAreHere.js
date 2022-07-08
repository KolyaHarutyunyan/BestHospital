import React, { useState } from "react";
import { Button } from "components";
import { getLimitedVal, useWidth } from "utils";
import { TABLET } from "../constants";

export const ReasonWhyWeAreHere = ({ reason }) => {
  const [isShownMore, setIsShownMore] = useState(false);

  const width = useWidth();

  const textDisplay = width > TABLET || isShownMore ? reason.text : getLimitedVal(reason.text, 100);

  return (
    <div className="reason-card">
        <img src={reason.icon} alt="reason-icon" />
        <h5 className="reason-title">{reason.caption}</h5>
        <span className="reason-text">{textDisplay}</span>
        {width <= TABLET && !isShownMore && (
            <Button
                buttonType={"button"}
                buttonClassName={"read-more-button"}
                onClickButton={() => setIsShownMore(true)}
            >
                read more
            </Button>
        )}
    </div>
  );
};
