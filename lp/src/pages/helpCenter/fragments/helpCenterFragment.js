import React, { useState } from "react";
import { Button, Card } from "components";
import {
   helpCenterHeaderContentSubtitle,
   helpCenterHeaderContentTitle,
   helpCenterJSON,
   MOBILE,
} from "./constants";
import { HelpCenterContent, KnowledgeBase, MenuBarTab } from "./core";
import { Images } from "assets";
import { useWidth } from "utils";

export const HelpCenterFragment = () => {
   const [selectedContent, setSelectedContent] = useState(helpCenterJSON[0]);
   const [menuIsShown, setMenuIsShown] = useState(false);

   const width = useWidth();

   const changeContent = (selectedTab) => {
      if (selectedContent === selectedTab) return;
      setSelectedContent(selectedTab);
      setMenuIsShown(false);
   };

   return (
      <div className="help-center-fragment">
         <Card cardClassName={"help-center-page-cover"}>
            <div className="help-center-header">
               <div className="header-content">
                  <h1 className="content-title">{helpCenterHeaderContentTitle}</h1>
                  <h6 className="content-subtitle">{helpCenterHeaderContentSubtitle}</h6>
                  <Button
                     buttonType={"button"}
                     buttonClassName={"contact-support-button"}
                     onClickButton={() => {}}
                  >
                     Contact Support
                  </Button>
               </div>
            </div>
         </Card>
         <Card cardBackgroundColor={"#F7F9FC"}>
            <div className="help-center-main">
               <div className="help-center-menu-container">
                  {menuIsShown && (
                     <div
                        className="menu-overlay"
                        onClick={() => setMenuIsShown(false)}
                     />
                  )}
                  {(width > MOBILE || menuIsShown) && (
                     <div className="help-center-menu-bar">
                        <KnowledgeBase />
                        <div className="help-center-tabs-container">
                           {helpCenterJSON.map((tab, index) => (
                              <MenuBarTab
                                 key={index}
                                 tab={tab}
                                 triggerTab={changeContent}
                                 activeTabTitle={selectedContent.title}
                              />
                           ))}
                        </div>
                     </div>
                  )}
                  <div
                     className="mobile-menu-icon"
                     onClick={() => setMenuIsShown((prevState) => !prevState)}
                  >
                     <img src={Images.MenuMobileIcon} alt="menu-icon" />
                  </div>
               </div>
               <div className="help-center-content-container">
                  <KnowledgeBase />
                  <div className="breadcrumbs-box">
                     <p className="breadcrumbs-text">{`Help Center / ${selectedContent.title}`}</p>
                  </div>
                  {selectedContent.info.map((info, index) => (
                     <HelpCenterContent key={index} info={info} />
                  ))}
               </div>
            </div>
         </Card>
      </div>
   );
};
