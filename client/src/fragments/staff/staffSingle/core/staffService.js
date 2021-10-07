import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AddButton, Card, NoItemText, SlicedText} from "@eachbase/components";

import {Colors, ErrorText, Images,} from "@eachbase/utils";
import {SelectInputPlaceholder} from "@eachbase/components";
import {httpRequestsOnSuccessActions, systemActions} from "@eachbase/store";
import {systemItemStyles} from "../../../system/core";
import {serviceSingleStyles} from "./styles";

const credentialBtn = {
    maxWidth: '174px',
    width: '100%',
    flex: '0 0 174px',
    padding: 0
}


export const StaffService = ({removeItem, openModal, staffGeneral}) => {
  let  globalCredentials=[{name: 'fgdfg'}]
    const dispatch = useDispatch()
    const classes = systemItemStyles()
    const classes2 = serviceSingleStyles()
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState('');

    const editCredential = (modalType, modalId) => {
        openModal(modalType,modalId)
    }

    const handleChange = e => {
        setInputs(
            prevState => (
                {...prevState, [e.target.name]: e.target.value}
            ));
        error === e.target.name && setError('')
    }

    const checkType = (type) => {
        if (type === 'Degree') {
            return 0
        } else if (type === 'Clearance') {
            return 1
        } else if (type === 'licence') {
            return 2
        }
    }

    const convertType = (index) =>{
        if (index === 0) {
            return 'Degree'
        } else if (index === 1) {
            return 'Clearance'
        } else if (index === 2) {
            return 'licence'
        }
    }

    const handleSubmit = () => {
        let data = {
            name: inputs.name,
            type: checkType(inputs.type)
        }
        if (inputs.name ) {
            // dispatch(systemActions.createCredentialGlobal(data));
        } else {
            setError(
                !inputs.name ? 'name' :
                    !inputs.type ? 'type' :
                        'Input is not filled'
            )
        }
    }

    const isDisabled = inputs.name && inputs.type

    const generalInfo = [
        {title: 'First Name', value: staffGeneral?.firstName},
        {title: 'Middle Name', value: staffGeneral?.middleName},
        {title: 'Last Name', value: staffGeneral?.lastName},
        {title: 'Primary Email', value: staffGeneral?.email},
        {title: 'Secondary Email', value: staffGeneral?.secondaryEmail},
        {title: 'Primary Phone Number', value: staffGeneral?.phone},
        {title: 'Secondary Phone Number', value: staffGeneral?.secondaryPhone},
    ]


    return (
        <div className={classes2.staffGeneralWrapper}>
            <Card
                width='49%'
                cardInfo={generalInfo}
                showHeader={true}
                title='General Info'
                color={Colors.BackgroundBlue}
                icon={Images.generalInfoIcon}
            />
            <div className={`${classes.flexContainer} ${classes.headerSize}`} style={{marginLeft: 24, borderRadius : '8px' , boxShadow: '0px 0px 6px #8A8A8A3D', padding: 24, width: '100%', flexDirection: 'column'}}>
                <p className={classes.title} style={{marginBottom : 24}}>Services</p>
             <div style={{display: 'flex', width: "100%"}}>
                 <SelectInputPlaceholder
                     placeholder='Service Type'
                     style={classes.credentialInputStyle2}
                     name={"type"}
                     handleSelect={handleChange}
                     value={inputs.type}
                     list={[]}
                     typeError={error === 'issuingState' ? ErrorText.field : ''}
                 />
                 <AddButton
                     // loader={loader}
                     type={'CREATE_CREDENTIAL_GLOBAL'}
                     // disabled={!isDisabled}
                     styles={credentialBtn}
                     handleClick={handleSubmit}
                     text='Add Service Type'
                 />
             </div>
                <div className={classes.credentialTable} style={{width: '100%'}}>
                    {
                        globalCredentials && globalCredentials.length ? globalCredentials.map((credentialItem, index) => {
                            return (
                                <div className={classes.item} key={index} style={{flex: '0 0 100%'}}>
                                    <p style={{display: 'flex',alignItems: 'center'}}>
                                    <span>
                                        <SlicedText type={'responsive'} size={25} data={credentialItem.name}/>
                                    </span>
                                        {` - ${convertType(credentialItem.type)}`}
                                    </p>
                                    <div className={classes.icons}>
                                        <img src={Images.remove} alt="delete"
                                             // onClick={() => removeItem({id: credentialItem._id,name: credentialItem.name,type: 'editCredential'} )}
                                        />
                                    </div>
                                </div>
                            )
                        }) : <NoItemText text='No Items Yet' />
                    }

                </div>
            </div>


        </div>
    )
}