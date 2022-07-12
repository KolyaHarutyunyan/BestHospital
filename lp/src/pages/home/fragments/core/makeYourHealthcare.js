import React, { Fragment, useContext, useState } from "react";
import { Button, SimpleModal, YoutubeEmbed } from "components";
import { BookDemoContext } from "utils";
import { homeFirstBoxContentSubtitle, homeFirstBoxContentTitle } from "../constants";

export const MakeYourHealthcare = () => {
   const [videoModalIsOpen, setVideoModalIsOpen] = useState(false);

   const { handleModalOpenClose } = useContext(BookDemoContext);

   return (
      <Fragment>
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
                  <Button
                     buttonType={"button"}
                     buttonClassName={"watch-video-button"}
                     onClickButton={() => setVideoModalIsOpen(true)}
                  >
                     Watch Video
                  </Button>
               </div>
            </div>
            <div className="first-box-picture" />
         </div>
         <SimpleModal
            modalClassName={"home-video-modal"}
            modalOpen={videoModalIsOpen}
            closeModal={() => setVideoModalIsOpen(false)}
         >
            <YoutubeEmbed embedId={"4ju2G3KtKNA"} allowFullScreen autoPlay />
         </SimpleModal>
      </Fragment>
   );
};
