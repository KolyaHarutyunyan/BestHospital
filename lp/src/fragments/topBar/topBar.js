import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Logo, Button, SimpleModal } from "components";
import { navLinks } from "./constants";
import { BookDemoContext } from "utils";

export const TopBar = () => {
   const [menuIsShown, setMenuIsShown] = useState(false);
   const [signInModalIsOpen, setSignInModalIsOpen] = useState(false);

   const { handleModalOpenClose } = useContext(BookDemoContext);

   return (
      <nav className="topbar-container">
         <div className="topbar-content content-container space-between">
            <Logo
               logoClassName={"topbar-logo"}
               onClickLogo={() => setMenuIsShown(false)}
            />
            <div className="desktop-nav">
               <div className="nav-links-container">
                  <ul className="nav-links-list flex-align-center">
                     {navLinks.map((navLink, index) => (
                        <li key={index}>
                           <NavLink to={navLink.path}>{navLink.name}</NavLink>
                        </li>
                     ))}
                     <li>
                        <Button
                           buttonType={"button"}
                           buttonClassName={"sign-in-button"}
                           onClickButton={() => setSignInModalIsOpen(true)}
                        >
                           Sign In
                        </Button>
                     </li>
                     <li>
                        <div className="box-for-gap" />
                     </li>
                     <Button
                        buttonType={"button"}
                        buttonClassName={"book-demo-button"}
                        onClickButton={handleModalOpenClose}
                     >
                        Book Demo
                     </Button>
                  </ul>
               </div>
            </div>
            <div className="tablet-nav">
               <Button
                  buttonType={"button"}
                  buttonClassName={`menu-button ${menuIsShown ? "shown" : ""}`}
                  onClickButton={() => setMenuIsShown((prevState) => !prevState)}
               />
               <div
                  className={`menu-container ${menuIsShown ? "shown" : ""}`}
                  onClick={() => setMenuIsShown(false)}
               >
                  <div className="nav-links-container">
                     <ul className="nav-links-list column">
                        {navLinks.map((navLink, index) => (
                           <li key={index}>
                              <NavLink to={navLink.path}>{navLink.name}</NavLink>
                           </li>
                        ))}
                        <li>
                           <Button
                              buttonType={"button"}
                              buttonClassName={"sign-in-button-mobile"}
                              onClickButton={() => setSignInModalIsOpen(true)}
                           >
                              Sign In
                           </Button>
                        </li>
                        <Button
                           buttonType={"button"}
                           buttonClassName={"book-demo-button-mobile"}
                           onClickButton={handleModalOpenClose}
                        >
                           Book Demo
                        </Button>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
         <SimpleModal
            openDefault={signInModalIsOpen}
            closeModal={() => setSignInModalIsOpen(false)}
            // content={""}
            disableScrollLock={true}
         />
      </nav>
   );
};
