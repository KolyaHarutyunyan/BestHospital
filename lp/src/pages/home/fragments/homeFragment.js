import React, { useContext, useState } from "react";
import { Button, Card } from "components";
import {
   bestJobs,
   customersReviews,
   DESKTOP,
   featuresForProductiveMgmt,
   homeFifthBoxContentSubtitle,
   homeFifthBoxContentTitle,
   homeFirstBoxContentSubtitle,
   homeFirstBoxContentTitle,
   homeFourthBoxContentTitle,
   homeSecondBoxContentTitle,
   homeThirdBoxContentTitle,
   MOBILE,
} from "./constants";
import { Images } from "assets";
import { BookDemoContext, useWidth } from "utils";
import Carousel from "nuka-carousel";

export const HomeFragment = () => {
   const [jobNavTitle, setJobNavTitle] = useState(bestJobs[0].jobNavigationTitle);

   const { handleModalOpenClose } = useContext(BookDemoContext);

   const width = useWidth();

   const carouselHeight =
      width <= DESKTOP && width > MOBILE ? "295px" : width <= MOBILE ? "261px" : "319px";
   const slidesToShow = width <= DESKTOP ? 1 : 2;

   return (
      <div className="home-fragment">
         <Card cardClassName={"home-page-cover"}>
            <div className="home-first-box">
               <div className="first-box-content">
                  <h1 className="content-title">{homeFirstBoxContentTitle}</h1>
                  <h6 className="content-subtitle">{homeFirstBoxContentSubtitle}</h6>
                  <div className="content-actions-box flex-align-center">
                     <Button
                        buttonType={"button"}
                        buttonClassName={"book-demo-with-shadow-button"}
                        onClickButton={handleModalOpenClose}
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
                           <li
                              key={index}
                              className={
                                 jobNavTitle === job.jobNavigationTitle ? "active" : ""
                              }
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
         </Card>
         <Card cardBackgroundColor={"#F7F9FC"}>
            <div className="home-fourth-box">
               <h2 className="content-title">{homeFourthBoxContentTitle}</h2>
               <div className="customers-reviews-box">
                  <Carousel
                     renderBottomCenterControls={() => false}
                     height={carouselHeight}
                     slidesToShow={slidesToShow}
                     slidesToScroll={1}
                  >
                     {customersReviews.map((review, index) => (
                        <div key={index} className="customer-review-card">
                           <div className="customer-avatar-box">
                              <img
                                 src={review.customerAvatar}
                                 alt={review.customerName}
                              />
                           </div>
                           <div className="customer-review-card-container">
                              <div className="customer-review-content-box">
                                 <img src={Images.Quotes} alt="quotes" />
                                 <p className="customer-comment">
                                    {review.customerComment}
                                 </p>
                                 <div className="customer-bio-box">
                                    <p className="customer-name">
                                       - {review.customerName} -
                                    </p>
                                    <p className="customer-profesion">
                                       {review.customerProfesion}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </Carousel>
               </div>
            </div>
         </Card>
         <Card cardBackgroundColor={"#FFFFFF"}>
            <div className="home-fifth-box">
               <div className="fifth-box-content-box">
                  <div className="content-container">
                     <h4 className="content-title">{homeFifthBoxContentTitle}</h4>
                     <p className="content-subtitle">{homeFifthBoxContentSubtitle}</p>
                     <Button
                        buttonType={"button"}
                        buttonClassName={"book-demo"}
                        onClickButton={handleModalOpenClose}
                     >
                        Book Demo
                     </Button>
                  </div>
               </div>
            </div>
         </Card>
      </div>
   );
};
