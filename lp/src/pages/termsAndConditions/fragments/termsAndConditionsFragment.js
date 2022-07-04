import React from "react";
import { Card } from "components";
import { termsAndConditionsParagraphs, termsAndConditionsTitle } from "./constants";

export const TermsAndConditionsFragment = () => {
  return (
    <div className="terms-and-conditions-fragment">
        <Card cardBackgroundColor={"#FFFFFF"}>
            <div className="terms-and-conditions-container">
                <h3 className="content-title">{termsAndConditionsTitle}</h3>
                <div className="terms-and-conditions-content">
                    {termsAndConditionsParagraphs.map((paragraph, index) => (
                        <p key={index} className="terms-and-conditions-paragraph">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </Card>
    </div>
  );
};
