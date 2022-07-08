import React, { useState } from "react";
import { Button } from "components";
import { getLimitedVal, useWidth } from "utils";
import { MOBILE } from "../constants";

export const AboutUsSection = ({ section }) => {
  const [isShownMore, setIsShownMore] = useState(false);

  const width = useWidth();

  const textDisplay = width > MOBILE || isShownMore ? section.text : getLimitedVal(section.text, 200);

  return (
    <div 
        className={`about-section-card space-between ${section.className}`}
    >
        <div className="about-section-picture">
            <img src={section.picture} alt="team-first" />
        </div>
        <div className="about-section-content">
            <h2 className="content-title">{section.title}</h2>
            <p className="content-subtitle">{section.subtitle}</p>
            <span className="content-text">{textDisplay}</span>
            {width <= MOBILE && !isShownMore && (
                <Button
                    buttonType={"button"}
                    buttonClassName={"read-more-button"}
                    onClickButton={() => setIsShownMore(true)}
                >
                    read more
                </Button>
            )}
        </div>
    </div>
  );
};
