import React, {useState} from "react";
import { ButtonsTab } from "../buttons";
import { wrapperStyle } from "./styles";
import { SimpleModal } from "../modal";
import {SelectInput} from "../inputs";
import {ErrorText} from "../../utils";
import moment from "moment";

export const TableWrapper = ({
  buttonsTab,
  buttonsTabAddButton,
  children,
  firstButton,
  secondButton,
  addButtonText, body,
  openCloseInfo, handleOpenClose,getActive,getInactive
}) => {
  const classes = wrapperStyle();

  const [inputs, setInputs] = useState( {checked : 'Active'});
  const [error, setError] = useState("");

  const handleChange = e => setInputs(
      prevState => ({...prevState, [e.target.name]: e.target.value === 0? '0' : e.target.value}),
      error === e.target.name && setError(''),
  );




  return (
    <div>
      {buttonsTab && (
        <div className={classes.buttonsTabStyle}>
          {/*<ButtonsTab*/}
          {/*    getActive={getActive}*/}
          {/*    getInactive={getInactive}*/}
          {/*    first={firstButton}*/}
          {/*    second={secondButton}*/}
          {/*/>*/}
          <SelectInput
              name={"checked"}
              // label={"Active"}
              handleSelect={handleChange}
              value={inputs.checked}
              list={[{name : 'Active' }, {name :'Inactive',},{name :'On Hold',}, {name :'Terminated',}]}
              // typeError={error === 'supervisor' ? ErrorText.field : ''}
              style={{width : 100, height : 36}}
              styles={{height : '36px'}}
          />

          {buttonsTabAddButton && (
            <div className={classes.addButton}>
              <SimpleModal
                addButton={addButtonText}
                content={body}
                handleOpenClose={handleOpenClose}
                openDefault={openCloseInfo}
              />
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
