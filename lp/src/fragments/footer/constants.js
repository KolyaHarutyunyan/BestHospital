import { Images } from "assets";

export const socialMediaIcons = [
   {
      iconSrc: Images.Facebook,
      hoveredIconSrc: Images.FacebookHover,
      iconAlt: "facebook",
      iconURL: "https://www.facebook.com/",
   },
   {
      iconSrc: Images.Instagram,
      hoveredIconSrc: Images.InstagramHover,
      iconAlt: "instagram",
      iconURL: "https://www.instagram.com/",
   },
   {
      iconSrc: Images.Twitter,
      hoveredIconSrc: Images.TwitterHover,
      iconAlt: "twitter",
      iconURL: "https://twitter.com/",
   },
];

export const companyLinks = [
   { name: "About Us", path: "/about-us" },
   { name: "Contact Us", path: "/contact-us" },
   { name: "Support", path: "/support" },
];

export const contactDetails = [
   {
      contactIcon: {
         iconSrc: Images.Phone,
         iconAlt: "phone",
      },
      contactOption: {
         optionHref: "tel:+313 533 5333",
         optionLabel: "+313 533 5333",
      },
   },
   {
      contactIcon: {
         iconSrc: Images.WhiteEnvelope,
         iconAlt: "white-envelope",
      },
      contactOption: {
         optionHref: "mailto:wellnessdaisy@gmail.com",
         optionLabel: "wellnessdaisy@gmail.com",
      },
   },
];

export const wellnessDaisyInfo = "Wellness helps companies improve their management!";
export const signUpInfo = "We promise not to spam you!";

export const copyrightTitles = ["© 2022 - Wellness", "Powered by Eachbase"];

export const termsAndPrivacyLinks = [
   { name: "Terms & Conditions", path: "/terms-and-conditions" },
   { name: "Privacy Policy", path: "/privacy-policy" },
];
