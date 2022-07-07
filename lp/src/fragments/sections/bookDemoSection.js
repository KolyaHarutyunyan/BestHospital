import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, CheckBoxInput, SelectInput } from "components";
import {
   bookDemoContentTitle,
   bookDemoInformation,
   companySizeOptions,
   inputsToBookDemo,
} from "./constants";
import { BookDemoContext } from "utils";

export const BookDemoSection = () => {
   const [subscribeIsChecked, setSubscribeIsChecked] = useState(false);
   const [selectedCompanySize, setSelectedCompanySize] = useState(companySizeOptions[0]);
   const [loader, setLoader] = useState(false);

   const { handleSubmit, register, reset } = useForm();

   const { handleModalOpenClose } = useContext(BookDemoContext);

   function onSubmit(data) {
      const demoFormData = {
         ...data,
         subscribeIsChecked,
         companySize: selectedCompanySize,
      };
      setLoader(true);
      axios
         .post("https://rresdx/fd", demoFormData)
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
                  <SelectInput
                     selectInputId={"company-size"}
                     selectInputName={"companySize"}
                     selectInputLabelText={"Company size"}
                     selectInputOptions={companySizeOptions}
                     selectInputProps={{ ...register("select") }}
                     selectInputIsRequired={true}
                     onChangeSelectInput={(e) => setSelectedCompanySize(e.target.value)}
                  />
                  <CheckBoxInput
                     inputId={"subscribe"}
                     inputLabelText={"Subscribe to Wellness"}
                     inputChecked={subscribeIsChecked}
                     onInputChange={(e) => setSubscribeIsChecked(e.target.checked)}
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
