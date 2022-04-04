import React, { useEffect, useState } from "react";
import { ValidationInput, SelectInput } from "@eachbase/components";
import { foundingSourceModalStyle } from "./styles";
import { ErrorText, Images } from "@eachbase/utils";

export const FundingSourceModifiersAdd = ({
   info,
   setPostModifiers,
   globalCredentials,
   modifiersServ,
   addNewMod,
   setGetLastMod,
}) => {
   const [error, setError] = useState("");
   const [inputs, setInputs] = useState({
      name: "",
      chargeRate: "",
      credentialId: "",
      type: "",
   });
   const [inputs2, setInputs2] = useState({
      name: "",
      chargeRate: "",
      credentialId: "",
      type: "",
   });
   const [modifiers, setModifiers] = useState(
      modifiersServ ? [...modifiersServ] : []
   );
   const [credentialID, setCredentialID] = useState(null);
   const [btnStyle, setBtnStyle] = useState(false);
   const [indexItem, setIndexItem] = useState(null);
   const classes = foundingSourceModalStyle();

   const handleChange = (e) => {
      setInputs(
         (prevState) => ({ ...prevState, [e.target.name]: e.target.value }),
         error === e.target.name && setError("")
      );
   };

   const handleChange2 = (e, index) => {
      if (e.target.name === "chargeRate") {
         const modObject = modifiers[index];
         modifiers[index] = { ...modObject, [e.target.name]: +e.target.value };
         setModifiers([...modifiers]);
      } else if (e.target.name === "credentialId") {
         const modObject = modifiers[index];
         modifiers[index] = {
            ...modObject,
            [e.target.name]: globalCredentials.find(
               (elem) => elem.name === e.target.value
            )._id,
         };
         setModifiers([...modifiers]);
      } else {
         const modObject = modifiers[index];
         modifiers[index] = { ...modObject, [e.target.name]: e.target.value };
         setModifiers([...modifiers]);
      }
   };

   useEffect(() => {
      setPostModifiers([...modifiers]);
   }, [modifiers]);

   useEffect(() => {
      globalCredentials &&
         globalCredentials.length > 0 &&
         globalCredentials.forEach((item, index) => {
            if (inputs.credentialId === item.name) {
               setCredentialID(item._id);
            }
            if (
               inputs.credentialId &&
               inputs.chargeRate &&
               inputs.name &&
               inputs.type
            ) {
               if (
                  inputs.credentialId !== "" &&
                  inputs.chargeRate !== "" &&
                  inputs.name !== "" &&
                  inputs.type !== ""
               ) {
                  // setBtnStyle(true)
                  setPostModifiers([
                     ...modifiers,
                     {
                        credentialId: credentialID,
                        chargeRate: +inputs.chargeRate,
                        name: inputs.name,
                        type: +inputs.type,
                     },
                  ]);
                  setGetLastMod({
                     credentialId: credentialID,
                     chargeRate: +inputs.chargeRate,
                     name: inputs.name,
                     type: +inputs.type,
                  });
                  addNewMod({
                     credentialId: credentialID,
                     chargeRate: +inputs.chargeRate,
                     name: inputs.name,
                     type: +inputs.type,
                  });
                  setModifiers([
                     ...modifiers,
                     {
                        credentialId: credentialID,
                        chargeRate: +inputs.chargeRate,
                        name: inputs.name,
                        type: +inputs.type,
                     },
                  ]);

                  setGetLastMod(null);
                  // setModifiers([...modifiers, {
                  //     "credentialId": credentialID,
                  //     "chargeRate": +inputs.chargeRate,
                  //     "name": inputs.name,
                  //     'type': +inputs.type
                  // }])
                  // addNewMod({
                  //     "credentialId": credentialID,
                  //     "chargeRate": +inputs.chargeRate,
                  //     "name": inputs.name,
                  //     'type': +inputs.type
                  // })
                  setInputs({
                     name: "",
                     chargeRate: "",
                     credentialId: "",
                     type: "",
                  });
               }
            } else {
               setPostModifiers([...modifiers]);
               setBtnStyle(false);
            }
         });
   }, [inputs, modifiers]);

   const handleCreate = () => {
      setBtnStyle(false);

      if (
         inputs.credentialId &&
         inputs.chargeRate &&
         inputs.name &&
         inputs.type
      ) {
         if (
            inputs.credentialId !== "" &&
            inputs.chargeRate !== "" &&
            inputs.name !== "" &&
            inputs.type !== ""
         ) {
            setGetLastMod(null);
            setModifiers([
               ...modifiers,
               {
                  credentialId: credentialID,
                  chargeRate: +inputs.chargeRate,
                  name: inputs.name,
                  type: +inputs.type,
               },
            ]);
            addNewMod({
               credentialId: credentialID,
               chargeRate: +inputs.chargeRate,
               name: inputs.name,
               type: +inputs.type,
            });
            setInputs({ name: "", chargeRate: "", credentialId: "", type: "" });
         }
      } else {
         setError(
            !inputs.name
               ? "name"
               : !inputs.chargeRate
               ? "chargeRate"
               : !inputs.credentialId
               ? "credentialId"
               : !inputs.type
               ? "type"
               : "Input is not field"
         );
      }
   };

   let list = [{ name: 0 }, { name: 1 }];

   let editModifier = (i) => {
      if (i !== indexItem) {
         setIndexItem(i);
         setInputs2(modifiers[i]);
      }
   };

   const renderInputs = (item, index) => {
      return (
         <div
            className={classes.foundingSourceModalsBodyBlock}
            onClick={() => editModifier(index)}
            key={index}
         >
            <ValidationInput
               onChange={(e) => handleChange2(e, index)}
               value={item.name}
               variant={"outlined"}
               type={"text"}
               label={"Modifier Name*"}
               name={"name"}
               styles={{ width: 198 }}
            />
            <div style={{ width: 36 }} />
            <ValidationInput
               onChange={(e) => handleChange2(e, index)}
               value={item.chargeRate}
               variant={"outlined"}
               type={"text"}
               label={"Charge Rate*"}
               name={"chargeRate"}
               styles={{ width: 198 }}
            />
            <div style={{ width: 36 }} />
            <SelectInput
               name={"credentialId"}
               label={"Credential*"}
               handleSelect={(e) => handleChange2(e, index)}
               value={
                  info
                     ? globalCredentials.find(
                          (elem) => elem._id === item.credentialId && elem._id
                       )?.name
                     : ""
               }
               list={globalCredentials}
               styles={{ width: 198 }}
            />
            <div style={{ width: 36 }} />
            <SelectInput
               name={"type"}
               label={"Type*"}
               handleSelect={(e) => handleChange2(e, index)}
               value={info ? (item.type === 0 ? "0" : item.type) : ""}
               list={list}
               styles={{ width: 198 }}
            />
         </div>
      );
   };

   return (
      <div>
         <p className={classes.ModifiresTitle}>Modifiers</p>

         <div
            style={{
               height: "150px",
               overflow: "auto",
               marginBottom: "26px",
               padding: "5px 0",
            }}
         >
            <div className={classes.foundingSourceModalsBodyBlock}>
               <ValidationInput
                  onChange={handleChange}
                  value={inputs.name}
                  variant={"outlined"}
                  type={"text"}
                  label={"Modifier Name*"}
                  name={"name"}
                  typeError={error === "name" && ErrorText.field}
                  styles={{ width: 198 }}
               />
               <div style={{ width: 36 }} />
               <ValidationInput
                  onChange={handleChange}
                  value={inputs.chargeRate}
                  variant={"outlined"}
                  type={"number"}
                  label={"Charge Rate*"}
                  name={"chargeRate"}
                  typeError={error === "chargeRate" && ErrorText.field}
                  styles={{ width: 198 }}
               />
               <div style={{ width: 36 }} />
               <SelectInput
                  name={"credentialId"}
                  label={"Credential*"}
                  handleSelect={handleChange}
                  value={inputs.credentialId}
                  list={globalCredentials ? globalCredentials : []}
                  typeError={error === "credentialId" ? ErrorText.field : ""}
                  styles={{ width: 198 }}
               />
               <div style={{ width: 36 }} />
               <SelectInput
                  name={"type"}
                  label={"Type*"}
                  handleSelect={handleChange}
                  value={inputs.type}
                  list={list}
                  typeError={error === "type" ? ErrorText.field : ""}
                  styles={{ width: 198 }}
               />
            </div>
            {modifiers &&
               modifiers?.length > 0 &&
               modifiers.map((item, index) => {
                  return renderInputs(item, index);
               })}
         </div>
         <div className={classes.addmodifiersBlock}>
            <img
               onClick={handleCreate}
               src={btnStyle ? Images.addLight2 : Images.addLight}
               alt=""
               className={classes.iconsCursor}
            />
            <p
               onClick={handleCreate}
               className={classes.addMoreModifiersText}
               style={btnStyle ? { color: "#347AF0" } : { color: "#347AF080" }}
            >
               Add modifiers
            </p>
         </div>
      </div>
   );
};
