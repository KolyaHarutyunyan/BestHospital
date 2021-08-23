import React, {useState} from "react";
import {ValidationInput, SelectInput, CreateChancel, ModalHeader} from "@eachbase/components";
import {createClientStyle,} from "./styles";
import {ErrorText} from "@eachbase/utils";
import {useDispatch} from "react-redux";



export const AddEnrollment = ({handleClose}) => {
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({});
    const classes = createClientStyle()

    const handleChange = e => setInputs(
        prevState => ({...prevState, [e.target.name]: e.target.value}),
        error === e.target.name && setError(''),
    );

    const handleCreate = () => {
            if (inputs.firstName && inputs.lastName && inputs.phoneNumber && inputs.relationship) {

            } else {
                setError(
                    !inputs.firstName ? 'firstName' :
                        !inputs.lastName ? 'lastName' :
                            !inputs.phoneNumber ? 'phoneNumber' :
                                !inputs.relationship ? 'relationship' :
                                    'Input is not field'
                )
            }
                const data = {

                }
                // dispatch(clientActions.createClientContact(data, params.id))
            }
    const list = [
        {name: 'dfgd'},
        {name: 'femdfgdfgdfgale'}
    ]

    return (
        <div className={classes.createFoundingSource}>
            <ModalHeader
                handleClose={handleClose}
                title={'Add an Enrollment'}
                text={'To add a new enrollment in the system, please fulfill the below fields.'}
            />
            <div className={classes.createFoundingSourceBody}>
                <div className={classes.clientModalBlock}>
                  <div className={classes.clientModalBox}>
                      <SelectInput
                          name={"fundingSource"}
                          label={"Funding Source*"}
                          handleSelect={handleChange}
                          value={inputs.fundingSource}
                          list={list}
                          typeError={error === 'fundingSource' ? ErrorText.field : ''}
                      />
                      <ValidationInput
                          variant={"outlined"}
                          onChange={handleChange}
                          value={inputs.clientID}
                          type={"text"}
                          label={"Client ID"}
                          name='clientID'
                          typeError={error === 'clientID' && ErrorText.field}
                      />
                      <ValidationInput
                          variant={"outlined"}
                          onChange={handleChange}
                          value={inputs.startDate}
                          type={"date"}
                          label={"Start Date*"}
                          name='startDate'
                          typeError={error === 'startDate' && ErrorText.field}
                      />
                      <ValidationInput
                          variant={"outlined"}
                          onChange={handleChange}
                          value={inputs.terminatedDate}
                          type={"date"}
                          label={"Terminated Date*"}
                          name='terminatedDate'
                          typeError={error === 'terminatedDate' && ErrorText.field}
                      />
                        </div>
                </div>
                <div className={classes.clientModalBlock}>
                    <CreateChancel
                        create={"Add"}
                        chancel={"Cancel"}
                        onCreate={handleCreate}
                        onClose={handleClose}
                        buttonWidth='224px'
                    />
                </div>
            </div>
        </div>
    );
};
