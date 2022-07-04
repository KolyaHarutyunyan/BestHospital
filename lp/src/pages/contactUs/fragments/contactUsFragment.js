import React from "react";
import { Card } from "components";

export const ContactUsFragment = () => {
  return (
    <div className="contact-us-fragment">
        <Card cardClassName={"radial-gradient-image"}>
            <div className="contact-us-first-box">first</div>
        </Card>
        <Card cardBackgroundColor={"#FFFFFF"}>
            <div className="contact-us-second-box">second</div>
        </Card>
    </div>
  );
};
