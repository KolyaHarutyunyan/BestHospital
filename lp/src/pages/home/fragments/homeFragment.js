import React from "react";
import { Button, Card } from "components";
import { homeFirstBoxContentSubtitle, homeFirstBoxContentTitle } from "./constants";

export const HomeFragment = () => {
   return (
      <div className="home-fragment">
         <Card showGradient cardBackgroundColor={"#152F4B"}>
            <div className="home-first-box">
               <div className="first-box-content">
                  <h1 className="content-title">{homeFirstBoxContentTitle}</h1>
                  <h6 className="content-subtitle">{homeFirstBoxContentSubtitle}</h6>
                  <div className="content-actions-box flex-align-center">
                     <Button
                        buttonType={"button"}
                        buttonClassName={"book-demo-from-homepage-button"}
                     >
                        Book Demo
                     </Button>
                     <Button buttonType={"button"} buttonClassName={"watch-video-button"}>
                        Watch Video
                     </Button>
                  </div>
               </div>
               <div className="first-box-picture" />
            </div>
         </Card>
         <Card cardBackgroundColor={"#FFFFFF"}>home light</Card>
         <Card cardBackgroundColor={"#1A3855"}>home dark</Card>
         <Card cardBackgroundColor={"#F7F9FC"}>home milk</Card>
         <Card cardBackgroundColor={"#FFFFFF"}>home light</Card>
      </div>
   );
};
