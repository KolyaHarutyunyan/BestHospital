import React from "react";
import { Card } from "components";
import {
   FeaturesForProdMgmt,
   MakeYourHealthcare,
   WeAreHelpingTeams,
   OurCustomersLove,
   SeeForYourself,
} from "./core";

export const HomeFragment = () => {
   return (
      <div className="home-fragment">
         <Card cardClassName={"home-page-cover"}>
            <MakeYourHealthcare />
         </Card>
         <Card cardBackgroundColor={"#FFFFFF"}>
            <FeaturesForProdMgmt />
         </Card>
         <Card cardBackgroundColor={"#1A3855"}>
            <WeAreHelpingTeams />
         </Card>
         <Card cardBackgroundColor={"#F7F9FC"}>
            <OurCustomersLove />
         </Card>
         <Card cardBackgroundColor={"#FFFFFF"}>
            <SeeForYourself />
         </Card>
      </div>
   );
};
