import React, { useContext } from "react";
import { Button, Card } from "components";
import {
   contactOptions,
   contactUsFirstBoxContentSubtitle,
   contactUsFirstBoxContentTitle,
   firstPartText,
   firstPartTitle,
   questionAnswerSubtitle,
   questionAnswerTitle,
   questionsAndAnswers,
   secondPartText,
   secondPartTitle,
   thirdPartTitle,
   waysToGetInTouch,
} from "./constants";
import { QuestionAnswerSection, SendMessageSection } from "./core";
import { BookDemoContext } from "utils";

export const ContactUsFragment = () => {
   const { handleModalOpenClose } = useContext(BookDemoContext);

   return (
      <div className="contact-us-fragment">
         <Card cardClassName={"about-us-page-cover"}>
            <div className="contact-us-first-box">
               <div className="first-box-content">
                  <h1 className="content-title">{contactUsFirstBoxContentTitle}</h1>
                  <h6 className="content-subtitle">{contactUsFirstBoxContentSubtitle}</h6>
                  <ul className="contact-options-list">
                     {contactOptions.map((contactOption, index) => (
                        <li key={index}>
                           <a
                              href={contactOption.details}
                              target="_blank"
                              rel="noopener noreferrer"
                           >
                              <img src={contactOption.icon} alt="contact-icon" />
                              <span>{contactOption.label}</span>
                           </a>
                        </li>
                     ))}
                  </ul>
                  <Button
                     buttonType={"button"}
                     buttonClassName={"book-demo-with-shadow-button"}
                     onClickButton={handleModalOpenClose}
                  >
                     Book Demo
                  </Button>
               </div>
            </div>
         </Card>
         <Card cardBackgroundColor={"#FFFFFF"}>
            <div className="contact-us-second-box">
               <div className="second-box-content">
                  <div className="our-team-and-message-container">
                     <div className="contact-our-team">
                        <div className="first-part">
                           <h2 className="title">{firstPartTitle}</h2>
                           <p className="text">{firstPartText}</p>
                        </div>
                        <div className="second-part">
                           <h5 className="title">{secondPartTitle}</h5>
                           <p className="text">{secondPartText}</p>
                        </div>
                        <div className="third-part">
                           <h5 className="title">{thirdPartTitle}</h5>
                           <ul className="get-in-touch-list">
                              {waysToGetInTouch.map((way, index) => (
                                 <li key={index}>
                                    <a
                                       href={way.details}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                    >
                                       <img src={way.icon} alt="way-icon" />
                                       <span>{way.label}</span>
                                    </a>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </div>
                     <SendMessageSection />
                  </div>
                  <div className="do-you-have-questions">
                     <div className="content-title-and-subtitle">
                        <h2 className="content-title">{questionAnswerTitle}</h2>
                        <h6 className="content-subtitle">{questionAnswerSubtitle}</h6>
                     </div>
                     <div className="questions-answers-container">
                        {questionsAndAnswers.map((item, index) => (
                           <QuestionAnswerSection key={index} item={item} />
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </Card>
      </div>
   );
};
