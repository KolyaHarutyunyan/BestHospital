import React from "react";
import { CircularProgress } from "@material-ui/core";

export const Loader = ({ height }) => {
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
         <CircularProgress size={100} color={"primary"} />
      </div>
   );
};
