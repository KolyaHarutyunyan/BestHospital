import React, { useState, useEffect } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { inputsStyle } from "./styles";
import axios from "axios";
import { CountryList, useGlobalStyles } from "@eachbase/utils";
import { ErrMessage, SelectInput, ValidationInput } from "@eachbase/components";
import { State } from "country-state-city";

export const AddressInput = ({
   handleSelectValue,
   info,
   disabled,
   flex,
   oneInput,
   errorBoolean,
   auth,
   all,
   type,
   handleGetAll,
   onTrigger,
   enteredValue,
}) => {
   const classes = inputsStyle();
   const globalInputs = useGlobalStyles();

   const [address, setAddress] = useState(enteredValue || "");
   const [error, setError] = useState("");
   const [fullAddress, setFullAddress] = useState("");
   const [loading, setLoading] = useState(false);
   const [code, setCode] = useState("");
   const [inputs, setInputs] = useState(
      info ? (type === "another" ? { ...info } : { ...info.address }) : {}
   );

   const Country = inputs.country
      ? inputs.country
      : fullAddress.country
      ? fullAddress.country
      : all
      ? all.country
      : "";

   const City = inputs.city
      ? inputs.city
      : fullAddress.city
      ? fullAddress.city
      : all
      ? all.city
      : "";

   const States = inputs.state
      ? inputs.state
      : fullAddress.state
      ? fullAddress.state
      : all
      ? all.state
      : "";

   const Zip = inputs.zip
      ? inputs.zip
      : fullAddress.zip
      ? fullAddress.zip
      : all
      ? all.zip
      : "";

   const Street = fullAddress
      ? fullAddress.street
      : address
      ? address
      : all
      ? all.street
      : "";

   const fullAddressCompleted = `${Street} ${City} ${States} ${Zip} ${Country}`;

   useEffect(() => {
      onTrigger(fullAddressCompleted);
   }, [fullAddressCompleted]);

   const handleChangeAddress = (value, name) => {
      handleSelectValue(address);
      if (name !== "other") {
         setAddress(value);
      }
   };

   const handleSelect = async (value, ev) => {
      setAddress(value);
      setLoading(true);
      await axios
         .post(`/address`, { address: value })
         .then(function (response) {
            handleSelectValue(response.data.formattedAddress);
            setInputs({ ...response.data });
            setFullAddress(response.data);
            setLoading(false);
            handleGetAll && handleGetAll(response.data);
         })
         .catch(function (error) {});
   };

   const handleChange = (e) =>
      setInputs(
         (prevState) => ({ ...prevState, [e.target.name]: e.target.value }),
         error === e.target.name && setError(""),
         handleSelectValue(fullAddressCompleted)
      );

   let authPlaceHolder = info ? info.location : "Service Location";

   const stateList = code
      ? State.getStatesOfCountry(code)
      : State.getStatesOfCountry("US");

   const placeholder = auth
      ? authPlaceHolder
      : info
      ? info.address.formattedAddress
      : "Physical Address*";

   return (
      <div style={{ display: flex ? flex : "flex", width: "100%" }}>
         <PlacesAutocomplete
            value={address}
            onChange={handleChangeAddress}
            onSelect={(ev) => handleSelect(ev)}
         >
            {({
               getInputProps,
               suggestions,
               getSuggestionItemProps,
               loading,
            }) => (
               <div
                  className={
                     !oneInput
                        ? globalInputs.simpleInput
                        : globalInputs.simpleInputFull
                  }
               >
                  <input
                     className={
                        !!errorBoolean
                           ? classes.searchAddressError
                           : classes.searchAddress
                     }
                     {...getInputProps({
                        placeholder: placeholder,
                        disabled: disabled,
                        onBlur: (e) => {
                           handleChangeAddress(e.target.value);
                        },
                     })}
                  />
                  <ErrMessage text={errorBoolean} />
                  <div>
                     {loading && <div>Loading...</div>}

                     <div className={classes.valuesContainer}>
                        {suggestions.map((suggestion, index) => {
                           const className = suggestion.active
                              ? "suggestion-item--active"
                              : "suggestion-item";
                           const style = suggestion.active
                              ? {
                                   margin: "15px",
                                   cursor: "pointer",
                                }
                              : { margin: "15px", cursor: "pointer" };
                           return (
                              <div
                                 key={index}
                                 {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style,
                                 })}
                              >
                                 <div>
                                    <span
                                       className={
                                          classes.searchfAddressDescriptionText
                                       }
                                    >
                                       {suggestion.description}
                                    </span>
                                 </div>
                              </div>
                           );
                        })}
                     </div>
                  </div>
               </div>
            )}
         </PlacesAutocomplete>
         {!oneInput && (
            <>
               <SelectInput
                  style={globalInputs.simpleInput}
                  name={"country"}
                  label={"Country*"}
                  handleBlur={(e) => {
                     handleChangeAddress(e, "other");
                  }}
                  handleSelect={handleChange}
                  handleChangeCountryCode={setCode}
                  loader={loading}
                  value={Country}
                  list={CountryList}
                  disabled={disabled}
               />
               <ValidationInput
                  style={globalInputs.simpleInput}
                  variant={"outlined"}
                  name={"city"}
                  type={"name"}
                  label={"City*"}
                  handleSendAddress={(e) => {
                     handleChangeAddress(e, "other");
                  }}
                  onChange={handleChange}
                  value={City}
                  loader={loading}
                  disabled={disabled}
               />
               <SelectInput
                  style={globalInputs.simpleInput}
                  name={"state"}
                  label={"State"}
                  handleBlur={(e) => {
                     handleChangeAddress(e, "other");
                  }}
                  handleSelect={handleChange}
                  loader={loading}
                  value={States}
                  list={stateList}
                  disabled={disabled}
               />
               <ValidationInput
                  variant={"outlined"}
                  name={"zip"}
                  type={"text"}
                  label={"Zip Code"}
                  handleSendAddress={(e) => {
                     handleChangeAddress(e, "other");
                  }}
                  onChange={handleChange}
                  value={Zip}
                  loader={loading}
                  disabled={disabled}
               />
            </>
         )}
      </div>
   );
};
