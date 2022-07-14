import React from "react";

export const MenuBarTab = ({ tab, triggerTab, activeTabTitle }) => {
   return (
      <div className={`menu-bar-tab ${tab.title === activeTabTitle ? "active-tab" : ""}`}>
         <h6 className="tab-label" onClick={() => triggerTab(tab)}>
            {tab.title}
         </h6>
         <ul className="tab-subtab-list">
            {tab.columns.map((subtab, index) => (
               <li key={index}>
                  <a href={`#${subtab}`}>{subtab}</a>
               </li>
            ))}
         </ul>
      </div>
   );
};
