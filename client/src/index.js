import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./assets/styles/allStyles.scss";
import { Provider } from "react-redux";
import { store } from "./store";
import {
   CheckupContextProvider,
   DrawerContextProvider,
   initAxiosInterceptors,
   PaginationContextProvider,
} from "@eachbase/utils";

initAxiosInterceptors();

ReactDOM.render(
   // <React.StrictMode>
   <BrowserRouter>
      <Provider store={store}>
         <DrawerContextProvider>
            <PaginationContextProvider>
               <CheckupContextProvider>
                  <App />
               </CheckupContextProvider>
            </PaginationContextProvider>
         </DrawerContextProvider>
      </Provider>
   </BrowserRouter>,
   // </React.StrictMode>,
   document.getElementById("root")
);

reportWebVitals();
