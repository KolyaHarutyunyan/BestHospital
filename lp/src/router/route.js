import { Route, Routes } from "react-router-dom";
import { 
    Home, 
    AboutUs, 
    ContactUs, 
    Support, 
    TermsAndConditions, 
    PrivacyPolicy, 
    NotFound 
} from "pages";

export const Routers = () => {
    return (
        <div>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/about-us"} element={<AboutUs />} />
                <Route path={"/contact-us"} element={<ContactUs />} />
                <Route path={"/support"} element={<Support />} />
                <Route path={"/terms-and-conditions"} element={<TermsAndConditions />} />
                <Route path={"/privacy-policy"} element={<PrivacyPolicy />} />
                <Route path={"*"} element={<NotFound />} />
            </Routes>
        </div>
    );
};