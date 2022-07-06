import React from "react";
import { Button, Card } from "components";
import {
   aboutUsFirstBoxContentSubtitle,
   aboutUsFirstBoxContentTitle,
   aboutUsFourthBoxContentTitle,
   aboutUsSections,
   aboutUsThirdBoxContentTitle,
   reasonsWhyWeAreHere,
} from "./constants";
import { AboutUsSection, ReasonWhyWeAreHere } from "./core";
import { Images } from "assets";

export const AboutUsFragment = () => {
   return (
      <div className="about-us-fragment">
         <Card cardClassName={"about-us-page-cover"}>
            <div className="about-us-first-box">
               <div className="first-box-content">
                  <h1 className="content-title">{aboutUsFirstBoxContentTitle}</h1>
                  <h6 className="content-subtitle">{aboutUsFirstBoxContentSubtitle}</h6>
                  <Button
                     buttonType={"button"}
                     buttonClassName={"book-demo-with-shadow-button"}
                     onClickButton={() => {}}
                  >
                     Book Demo
                  </Button>
               </div>
            </div>
         </Card>
         <Card cardBackgroundColor={"#FFFFFF"}>
            <div className="about-us-second-box">
               <div className="second-box-content">
                  {aboutUsSections.map((section, index) => (
                     <AboutUsSection key={index} section={section} />
                  ))}
               </div>
            </div>
         </Card>
         <Card cardBackgroundColor={"#1A3855"}>
            <div className="about-us-third-box">
               <div className="third-box-content">
                  <h2 className="content-title">{aboutUsThirdBoxContentTitle}</h2>
                  <div className="reasons-box space-between-flex-start">
                     {reasonsWhyWeAreHere.map((reason, index) => (
                        <ReasonWhyWeAreHere key={index} reason={reason} />
                     ))}
                  </div>
               </div>
            </div>
         </Card>
         <Card cardBackgroundColor={"#FFFFFF"}>
            <div className="divider" />
         </Card>
         <Card cardBackgroundColor={"#F7F9FC"}>
            <div className="about-us-fourth-box">
               <div className="fourth-box-content">
                  <div className="content-and-avatar">
                     <h2 className="content-title">{aboutUsFourthBoxContentTitle}</h2>
                     <div className="content-avatar-container">
                        <div className="avatar-box">
                           <div className="cofounder-avatar">
                              <img src={Images.Cofounder} alt="cofounder-avatar" />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="cofounder-bio">
                     <p className="cofounder-name">- Danilo Tanic -</p>
                     <span className="cofounder-profesion">Cofounder</span>
                  </div>
               </div>
            </div>
         </Card>
         <Card cardBackgroundColor={"#FFFFFF"}>
            <div className="divider" />
         </Card>
      </div>
   );
};
