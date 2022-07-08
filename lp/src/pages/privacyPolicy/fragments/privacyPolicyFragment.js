import React from "react";
import { Card } from "components";
import { privacyPolicyParagraphs, privacyPolicyTitle } from "./constants";

export const PrivacyPolicyFragment = () => {
  return (
    <div className="privacy-policy-fragment">
         <Card cardBackgroundColor={"#FFFFFF"}>
            <div className="privacy-policy-container">
                <h3 className="content-title">{privacyPolicyTitle}</h3>
                <div className="privacy-policy-content">
                    {privacyPolicyParagraphs.map((paragraph, index) => (
                        <p key={index} className="privacy-policy-paragraph">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </Card>
    </div>
  );
};
