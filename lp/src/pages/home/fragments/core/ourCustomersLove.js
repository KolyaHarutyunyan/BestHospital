import React from "react";
import Carousel from "nuka-carousel";
import {
   customersReviews,
   DESKTOP,
   homeFourthBoxContentTitle,
   MOBILE,
} from "../constants";
import { useWidth } from "utils";
import { Images } from "assets";

export const OurCustomersLove = () => {
   const width = useWidth();

   const carouselHeight =
      width <= DESKTOP && width > MOBILE ? "295px" : width <= MOBILE ? "261px" : "319px";
   const slidesToShow = width <= DESKTOP ? 1 : 2;

   return (
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
                        <img src={review.customerAvatar} alt={review.customerName} />
                     </div>
                     <div className="customer-review-card-container">
                        <div className="customer-review-content-box">
                           <img src={Images.Quotes} alt="quotes" />
                           <p className="customer-comment">{review.customerComment}</p>
                           <div className="customer-bio-box">
                              <p className="customer-name">- {review.customerName} -</p>
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
   );
};
