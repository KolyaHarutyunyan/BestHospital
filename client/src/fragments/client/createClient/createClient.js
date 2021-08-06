import React, {useState} from "react";
import {AddressInput, ValidationInput, SelectInput, CreateChancel, ModalHeader} from "@eachbase/components";
import {createClientStyle, } from "./styles";
import {EmailValidator, ErrorText} from "@eachbase/utils";
// import {fundingSourceActions, officeActions} from "client/src/store";
import {useDispatch} from "react-redux";


export const CreateClient = ({handleClose}) => {
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({});
    const [fullAddress, setFullAddress] = useState(null)

    const classes = createClientStyle()
    const dispatch = useDispatch()
    const handleCheck = (bool) => {
        if (bool === true) {
            setError("Not valid email");
        } else {
            setError("");
        }
    };

    const handleChange = e => setInputs(
        prevState => ({...prevState, [e.target.name]: e.target.value}),
        error === e.target.name && setError(''),
    );


    const handleCreate = () => {
        const data = {
            "name": inputs.name,
            "email": inputs.email,
            "phoneNumber": inputs.phone,
            'type': inputs.type,
            'contact': inputs.contact,
            'website': inputs.website,
            "address": fullAddress,
            "status": 1
        }
        if (inputs.name && inputs.email && inputs.phone && inputs.type && inputs.contact && inputs.website) {
            // dispatch(fundingSourceActions.createFundingSource(data))
        } else {
            setError(
                !inputs.name ? 'name' :
                    !inputs.email ? 'email' :
                        !inputs.phone ? 'phone' :
                            !inputs.type ? 'type' :
                                !inputs.contact ? 'contact' :
                                    !inputs.website ? 'website' :
                                        'Input is not field'
            )
        }
    }

    const list = [
        {name: 'first'},
        {name: 'second'}
    ]


    return (
        <div className={classes.createFoundingSource}>
            <ModalHeader headerBottom={true} handleClose={handleClose} title={'Add Client'}/>
            <div className={classes.createFoundingSourceBody}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{width: 400}}>


                    </div>
                    <div style={{width: 400}}>

                    </div>
                </div>
                <div style={{display: "flex", justifyContent: 'space-between'}}>


                    <CreateChancel
                        // classes={globalInputs.buttonsStyle}
                        create={"Add"}
                        chancel={"Cancel"}
                        onCreate={handleCreate}
                        onClose={handleClose}
                        buttonWidth='400px'
                    />
                </div>
            </div>

        </div>
    );
};
