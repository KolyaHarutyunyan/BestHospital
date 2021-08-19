import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { inputsStyle } from "./styles";
import { API_BASE } from "@eachbase/store";
import axios from "axios";
import { CountryList, useGlobalStyles } from "@eachbase/utils";
import { SelectInput, ValidationInput } from "@eachbase/components";
import { Country, State, City } from 'country-state-city';



const path = `${API_BASE}`;
export const AddressInput = ({styles, handleSelectValue, disableLabels, Value, handleSendAddresses, info, disabled, flex }) => {
  const classes = inputsStyle();
  const globalInputs = useGlobalStyles();
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [fullAddress, setFullAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState('')
  const [inputs, setInputs] = useState(info ? { ...info.address } : {});
  const Country = inputs.country ? inputs.country : fullAddress.country ? fullAddress.country : ''
  const City = inputs.city ? inputs.city : fullAddress.city ? fullAddress.city : ''
  const States = inputs.state ? inputs.state : fullAddress.state ? fullAddress.state : ''
  const Zip = inputs.zip ? inputs.zip : fullAddress.zip ? fullAddress.zip : ''
  const Street = fullAddress ? fullAddress.street : address ? address : ''

  const fullAddressCompleted = `${Street} ${City} ${States} ${Zip} ${Country}`

  const handleChangeAddress = (value) => { 
    setAddress(value);
  };

  const handleSelect = async (value, ev) => {
    setAddress(value);
    setLoading(true)
    await axios.post(`/address`, { address: value })
      .then(function (response) {
        handleSelectValue(response.data.formattedAddress);
        setFullAddress(response.data);
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = e => setInputs(
    prevState => ({ ...prevState, [e.target.name]: e.target.value }),
    error === e.target.name && setError(''),
    handleSelectValue(fullAddressCompleted),
  );

  const stateList = code ? State.getStatesOfCountry(code) : State.getStatesOfCountry('US')

  const disable = false;
  const placeholder = Value ? Value : "Physical Address*";

  return (
    <div style={{ display: flex ? flex : 'flex', width: '100%' }}>
      <PlacesAutocomplete value={address} onChange={handleChangeAddress} onSelect={(ev) => handleSelect(ev)}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={{...styles}} className={globalInputs.simpleInput}>
            <input
              className={classes.searchAddress}
              {...getInputProps({
                placeholder: placeholder,
                disabled: disabled,
                style: { marginBottom: flex ? '8px' : '' }
              })}
            />
            <div className={classes.searchAddressDescription}>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, index) => {
                const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    key={index}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}>
                    <span className={classes.searchAddressDescriptionText}>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>



      <SelectInput
        styles={{...styles}}
        style={globalInputs.simpleInput}
        name={"country"}
        label={"Country*"}
        handleSelect={handleChange}
        handleChangeCountryCode={setCode}
        loader={loading}
        value={Country}
        list={CountryList}
        disabled={disabled}
      />

      <ValidationInput
          styles={{...styles}}
        style={globalInputs.simpleInput}
        variant={"outlined"}
        name={"city"}
        type={"name"}
        label={"City*"}
        onChange={handleChange}
        value={City}
        loader={loading}
        disabled={disabled}
      />


      <SelectInput
          styles={{...styles}}
        style={globalInputs.simpleInput}
        name={"state"}
        label={"State"}
        handleSelect={handleChange}
        loader={loading}
        value={States}
        list={stateList}
        disabled={disabled}

      />

      <ValidationInput
          styles={{...styles}}
        variant={"outlined"}
        name={"zip"}
        type={"number"}
        label={"Zip Code"}
        onChange={handleChange}
        value={Zip}
        loader={loading}
        disabled={disabled}
      />
    </div>
  );
}
