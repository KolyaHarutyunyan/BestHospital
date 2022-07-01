import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Images } from "assets";
import { Button, Logo } from "components";
import {
   contactDetails,
   companyLinks,
   signUpInfo,
   socialMediaIcons,
   wellnessDaisyInfo,
   copyrightTitles,
   termsAndPrivacyLinks,
} from "./constants";
import axios from "axios";

export const Footer = () => {
   const [loader, setLoader] = useState(false);
   const { handleSubmit, register, reset } = useForm();

   function onSubmit(data) {
      setLoader(true);
      axios
         .post("https://rresdx/fd", data)
         .then(() => {
            setLoader(false);
            toast("Your email was sent");
            reset();
         })
         .catch(() => {
            setLoader(false);
            toast("Something went wrong");
         });
   }

   return (
      <footer className="footer-container">
         <div className="footer-content content-container">
            <div className="footer-contact-content-box">
               <div className="info-box">
                  <Logo />
                  <p className="info-text">{wellnessDaisyInfo}</p>
                  <div className="social-media-icons-box">
                     <ul className="social-media-icons-list flex-align-center">
                        {socialMediaIcons.map((socialMediaIcon, index) => (
                           <li key={index}>
                              <a
                                 className={"social-media-icons-anchor"}
                                 href={socialMediaIcon.iconURL}
                                 target={"_blank"}
                                 rel="noopener noreferrer"
                              >
                                 <img
                                    className="social-media-icon"
                                    src={socialMediaIcon.iconSrc}
                                    alt={socialMediaIcon.iconAlt}
                                 />
                                 <img
                                    className="social-media-icon-hover"
                                    src={socialMediaIcon.hoveredIconSrc}
                                    alt={socialMediaIcon.iconAlt}
                                 />
                              </a>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
               <div className="contact-and-sign-up-box">
                  <div className="contact-box">
                     <div className="company-box">
                        <h6 className="title">Company</h6>
                        <ul>
                           {companyLinks.map((footerLink, index) => (
                              <li key={index} className="list company-list">
                                 <Link to={footerLink.path}>{footerLink.name}</Link>
                              </li>
                           ))}
                        </ul>
                     </div>
                     <div className="contact-us-box">
                        <h6 className="title">Contact Us</h6>
                        <ul>
                           {contactDetails.map((contact, index) => (
                              <li key={index} className="list contact-us-list">
                                 <img
                                    src={contact.contactIcon.iconSrc}
                                    alt={contact.contactIcon.iconAlt}
                                 />
                                 <a
                                    href={contact.contactOption.optionHref}
                                    className="contact-option"
                                 >
                                    {contact.contactOption.optionLabel}
                                 </a>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
                  <div className="sign-up-box">
                     <h6 className="title">Sign Up to stay updated</h6>
                     <p className="sign-up-info">{signUpInfo}</p>
                     <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="sign-up-label">
                           <input
                              {...register("email")}
                              required={true}
                              type="email"
                              placeholder="Enter Your Email"
                           />
                           <Button
                              buttonType={"submit"}
                              buttonLoader={loader}
                              buttonClassName={"sign-up-button"}
                           >
                              <img src={Images.BlueEnvelope} alt="blue-envelope" />
                           </Button>
                        </label>
                     </form>
                  </div>
               </div>
            </div>
            <div className="footer-copyright-and-terms-privacy-box space-between">
               <div className="copyright-box">
                  <ul className="copyright-list flex-align-center">
                     {copyrightTitles.map((title, index) => (
                        <li key={index}>{title}</li>
                     ))}
                  </ul>
               </div>
               <div className="terms-privacy-box">
                  <ul className="terms-privacy-list flex-align-center">
                     {termsAndPrivacyLinks.map((link, index) => (
                        <li key={index}>
                           <Link to={link.path}>{link.name}</Link>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      </footer>
   );
};
