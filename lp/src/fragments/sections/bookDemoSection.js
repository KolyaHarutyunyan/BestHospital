import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, CheckBoxInput } from "components";
import { Images } from "assets";
import { bookDemoContentTitle, bookDemoInformation, inputsToBookDemo } from "./constants";
import { BookDemoContext } from "utils";

export const BookDemoSection = ({ onClose }) => {
   const [subscribeIsChecked, setSubscribeIsChecked] = useState(false);
   const [loader, setLoader] = useState(false);
   const { handleSubmit, register, reset } = useForm();

   const { handleModalOpenClose } = useContext(BookDemoContext);

   function onSubmit(data) {
      setLoader(true);
      axios
         .post("https://rresdx/fd", data)
         .then(() => {
            setLoader(false);
            toast("Your message was sent");
            reset();
            handleModalOpenClose();
         })
         .catch(() => {
            setLoader(false);
            toast("Something went wrong");
         });
   }

   return (
      <section className="book-demo-container">
         <Button
            buttonType={"button"}
            buttonClassName={"close-button"}
            onClickButton={onClose}
         >
            <img src={Images.CloseIcon} alt="closer" />
         </Button>
         <div className="book-demo-content">
            <h2 className="content-title">{bookDemoContentTitle}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="book-demo-form-container">
                  {inputsToBookDemo.map((input, index) => (
                     <div key={index} className="request-input-card">
                        <label htmlFor={input.registerTarget}>{input.labelText}</label>
                        <input
                           id={input.registerTarget}
                           {...register(input.registerTarget)}
                           required={input.isRequired}
                           type={input.inputType}
                        />
                     </div>
                  ))}
                  <CheckBoxInput
                     inputId={"subscribe"}
                     inputChecked={subscribeIsChecked}
                     onInputChange={(event) =>
                        setSubscribeIsChecked(event.target.checked)
                     }
                     inputLabelText={"Subscribe to Wellness"}
                  />
               </div>
               <div className="information-box">
                  <span className="information">{bookDemoInformation}</span>
                  <Link to={"/privacy-policy"} onClick={handleModalOpenClose}>
                     Privacy Policy
                  </Link>
               </div>
               <Button
                  buttonType={"submit"}
                  buttonLoader={loader}
                  buttonClassName={"submit-button"}
               >
                  Submit
               </Button>
            </form>
         </div>
      </section>
   );
};
