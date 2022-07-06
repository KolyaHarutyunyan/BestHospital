import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { inputsToSendMessage, sendMessageTitle } from "../constants";
import { Button } from "components";

export const SendMessageSection = () => {
   const [loader, setLoader] = useState(false);
   const { handleSubmit, register, reset } = useForm();

   function onSubmit(data) {
      setLoader(true);
      axios
         .post("https://rresdx/fd", data)
         .then(() => {
            setLoader(false);
            toast("Your message was sent");
            reset();
         })
         .catch(() => {
            setLoader(false);
            toast("Something went wrong");
         });
   }

   return (
      <div className="send-us-a-message">
         <div className="message-content">
            <h2 className="title">{sendMessageTitle}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
               {inputsToSendMessage.map((input, index) => (
                  <div key={index} className="request-input-card">
                     <label htmlFor={input.registerTarget}>{input.labelText}</label>
                     {input.inputType === "textarea" ? (
                        <textarea
                           id={input.registerTarget}
                           {...register(input.registerTarget)}
                           required={true}
                           placeholder={input.placeholder}
                        />
                     ) : (
                        <input
                           id={input.registerTarget}
                           {...register(input.registerTarget)}
                           required={input.isRequired}
                           type={input.inputType}
                        />
                     )}
                  </div>
               ))}
               <Button
                  buttonType={"submit"}
                  buttonLoader={loader}
                  buttonClassName={"send-message-button"}
               >
                  Send
               </Button>
            </form>
         </div>
      </div>
   );
};
