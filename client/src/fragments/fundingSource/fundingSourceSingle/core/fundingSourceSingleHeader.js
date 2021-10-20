import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {btnStyles, fundingSourceSingleStyles ,editButtonStyle } from "./styles";
import {Images} from "@eachbase/utils";
import {AddButton, AddModalButton, SimpleModal, AddNotes, SelectInput} from "@eachbase/components";
import {FundingSourceServiceAdd} from "./modals";
import {CreateFundingSource} from "../../createFundingSource";
import {httpRequestsOnSuccessActions} from "@eachbase/store";
import { inputStyle} from "../../../client/clientSingle/core/styles";


export const FundingSourceSingleHeader = ({activeTab, title}) => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const prevData = useSelector(state => state.fundingSource.fundingSourceItem)
    const classes = fundingSourceSingleStyles()
    const [inputs, setInputs] = useState({active: 'Active'});
    const {httpOnSuccess, httpOnError, httpOnLoad} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));
    const handleOpenClose = () => {

        setOpen(!open)

    }

    const successServ = httpOnSuccess.length && httpOnSuccess[0].type === 'CREATE_FUNDING_SOURCE_SERVICE_BY_ID'

    const list = [
        {name: 'Active'},
        {name: 'Inactive'},
        {name: 'On Hold'},
        {name: 'Terminated'},
    ]

    useEffect(() => {
        if (successServ) {
            setOpen(false)
            dispatch(httpRequestsOnSuccessActions.removeSuccess('CREATE_FUNDING_SOURCE_SERVICE_BY_ID'))
        }

    }, [successServ])

    const handleChange = e => setInputs(
        prevState => ({...prevState, [e.target.name]: e.target.value}),
    );


    return (
        <div className={classes.fundingSourceSingleHeaderWrapStyles}>
            <div className={classes.fundingSourceSingleHeaderStyles}>
                <img src={Images.fundingSourceActive} className={classes.foundingIcon} alt="founding"/>
                <p className={classes.title}>{title && title}</p>
            </div>


            <div style={{display : 'flex'}}>
                <SelectInput
                    styles={inputStyle}
                    name={"active"}
                    handleSelect={handleChange}
                    value={inputs.active}
                    list={list}
                    className={classes.inputTextField}
                />
                <SimpleModal
                    openDefault={open}
                    handleOpenClose={handleOpenClose}
                    content={activeTab === 0 ?
                        <CreateFundingSource handleClose={handleOpenClose} info={prevData}/>
                        : activeTab === 1 ?
                            <FundingSourceServiceAdd handleClose={handleOpenClose}/> :
                            activeTab === 2 ?
                                <AddNotes model='Funder' handleClose={handleOpenClose}/> : null}/>

                {activeTab === 0 ?
                    <AddModalButton styles={{width: 450}} handleClick={handleOpenClose} text='Edit'  btnStyles={editButtonStyle} />
                    : activeTab >= 3 ?
                        <div className={classes.clear}/> :
                        <AddButton
                            styles={{width: 450}}
                            text={activeTab === 1 ? 'Add Service' : activeTab === 2 ? 'Add Note' : ''}
                            handleClick={handleOpenClose}/>}
            </div>
        </div>
    )
}