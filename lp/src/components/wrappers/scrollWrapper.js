import React from "react";
import { InView } from "react-intersection-observer";

export const ScrollWrapper = ({ children, onChange, ...props }) => {
  return (
    <InView  {...props} className="scroll-wrapper" onChange={onChange}>
        {children}
    </InView>
  );
};
