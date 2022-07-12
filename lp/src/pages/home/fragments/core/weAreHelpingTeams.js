import React, { useState } from "react";
import { bestJobs, homeThirdBoxContentTitle } from "../constants";

export const WeAreHelpingTeams = () => {
   const [jobNavTitle, setJobNavTitle] = useState(bestJobs[0].jobNavigationTitle);

   return (
      <div className="home-third-box">
         <h2 className="content-title">{homeThirdBoxContentTitle}</h2>
         <div className="best-jobs-container">
            <div className="best-jobs-navigation-box">
               <ul className="navigation-list">
                  {bestJobs.map((job, index) => (
                     <li
                        key={index}
                        className={jobNavTitle === job.jobNavigationTitle ? "active" : ""}
                        onClick={() => setJobNavTitle(job.jobNavigationTitle)}
                     >
                        <a href={`#${job.jobTitle}`}>{job.jobNavigationTitle}</a>
                     </li>
                  ))}
               </ul>
            </div>
            <div className="best-jobs-list-box">
               {bestJobs.map((job, index) => (
                  <div key={index} className="best-job-card">
                     <div className="best-job-screenshot">
                        <img src={job.jobScreenshot} alt={job.jobTitle} />
                     </div>
                     <div className="best-job-content">
                        <div className="best-job-title-box flex-align-center">
                           <h3 id={job.jobTitle} className="best-job-title">
                              {job.jobTitle}
                           </h3>
                           <img src={job.jobIcon} alt={job.jobNavigationTitle} />
                        </div>
                        <p className="best-job-info">{job.jobInfo}</p>
                        <ul className="best-job-services-list">
                           {job.jobServicesList.map((jobService, index) => (
                              <li key={index}>
                                 <img src={jobService.jobServiceMark} alt="mark" />
                                 <span>{jobService.jobServiceText}</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};
