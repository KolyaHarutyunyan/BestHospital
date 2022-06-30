import { Route, Routes } from "react-router-dom";
import {
   Home,
   AboutUs,
   ContactUs,
   Support,
   TermsAndConditions,
   PrivacyPolicy,
   NotFound,
} from "pages";
import { Main } from "fragments";

export const Routers = () => {
   return (
      <Main>
         <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/about-us"} element={<AboutUs />} />
            <Route path={"/contact-us"} element={<ContactUs />} />
            <Route path={"/support"} element={<Support />} />
            <Route path={"/terms-and-conditions"} element={<TermsAndConditions />} />
            <Route path={"/privacy-policy"} element={<PrivacyPolicy />} />
            <Route path={"*"} element={<NotFound />} />
         </Routes>
      </Main>
   );
};
