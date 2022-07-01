import React from "react";
import { Button, Card } from "components";
import {
   bestJobs,
   featuresForProductiveMgmt,
   homeFirstBoxContentSubtitle,
   homeFirstBoxContentTitle,
   homeSecondBoxContentTitle,
   homeThirdBoxContentTitle,
} from "./constants";

export const HomeFragment = () => {
   return (
      <div className="home-fragment">
         <Card showGradient cardClassName={"radial-gradient-image"}>
            <div className="home-first-box">
               <div className="first-box-content">
                  <h1 className="content-title">{homeFirstBoxContentTitle}</h1>
                  <h6 className="content-subtitle">{homeFirstBoxContentSubtitle}</h6>
                  <div className="content-actions-box flex-align-center">
                     <Button
                        buttonType={"button"}
                        buttonClassName={"book-demo-from-homepage-button"}
                     >
                        Book Demo
                     </Button>
                     <Button buttonType={"button"} buttonClassName={"watch-video-button"}>
                        Watch Video
                     </Button>
                  </div>
               </div>
               <div className="first-box-picture" />
            </div>
         </Card>
         <Card cardBackgroundColor={"#FFFFFF"}>
            <div className="home-second-box">
               <h2 className="content-title">{homeSecondBoxContentTitle}</h2>
               <div className="features-list-box">
                  <div className="first-list-box">
                     {featuresForProductiveMgmt.slice(0, 3).map((feature, index) => (
                        <div key={index} className="feature-card">
                           <img src={feature.featureIcon} alt={feature.featureTitle} />
                           <h5 className="feature-title">{feature.featureTitle}</h5>
                           <p className="feature-description">
                              {feature.featureDescription}
                           </p>
                        </div>
                     ))}
                  </div>
                  <div className="second-list-box">
                     {featuresForProductiveMgmt.slice(3, 6).map((feature, index) => (
                        <div key={index} className="feature-card">
                           <img src={feature.featureIcon} alt={feature.featureTitle} />
                           <h5 className="feature-title">{feature.featureTitle}</h5>
                           <p className="feature-description">
                              {feature.featureDescription}
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </Card>
         <Card cardBackgroundColor={"#1A3855"}>
            <div className="home-third-box">
               <h2 className="content-title">{homeThirdBoxContentTitle}</h2>
               <div className="best-jobs-container">
                  <div className="best-jobs-navigation-box">
                     <ul className="navigation-list">
                        {bestJobs.map((job, index) => (
                           <li key={index}>
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
         </Card>
         <Card cardBackgroundColor={"#F7F9FC"}>home milk</Card>
         <Card cardBackgroundColor={"#FFFFFF"}>home light</Card>
      </div>
   );
};
