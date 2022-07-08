import React, { useEffect } from "react";

export const Main = ({ children }) => {
   const scrollToTop = () => window.scrollTo(0, 0);
   useEffect(scrollToTop, []);

   return <main className="main-container">{children}</main>;
};
