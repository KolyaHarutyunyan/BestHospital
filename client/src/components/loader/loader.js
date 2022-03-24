import React from "react";
import { CircularProgress } from "@material-ui/core";

export const Loader = ({ height, circleSize }) => {
   return (
      <div
         style={{
            width: "100%",
            height: height ? height : "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
         }}
      >
         <CircularProgress
            size={circleSize ? circleSize : 100}
            color={"primary"}
         />
      </div>
   );
};
