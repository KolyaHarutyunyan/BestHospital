import React from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "components";
import { navLinks } from "./constants";

export const TopBar = () => {
   return (
      <nav className="topbar-container">
         <Logo />
         <div className="desktop">
            <div className="nav-links-container">
               <ul>
                  {navLinks.map((navLink, index) => (
                     <li key={index}>
                        <NavLink
                           exact={"true"}
                           to={navLink.path}
                           activeclassname={"active"}
                        >
                           {navLink.name}
                        </NavLink>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </nav>
   );
};
