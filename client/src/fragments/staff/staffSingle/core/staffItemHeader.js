import React, {useEffect, useState} from "react";
import {serviceSingleStyles} from "./styles";
import {
    AddButton,
    AddModalButton,
    SimpleModal,
    AddNotes,
    AvailabilitySchedule,
    ValidationInput,
    SelectInput
} from "@eachbase/components";
import {Colors, Images} from "@eachbase/utils";
import {CreateStaff, CredentialModal} from "@eachbase/fragments";
import {useDispatch, useSelector} from "react-redux";
import {EmploymentModal, TimesheetModal} from "./modals";
import {Switch} from "@material-ui/core";
import {adminActions, fundingSourceActions, httpRequestsOnErrorsActions} from "@eachbase/store";
import {useParams} from "react-router-dom";
import {inputStyle} from "../../../client/clientSingle/core/styles";
import {isClinician} from "../../../../store/admin/admin.action";

const editButtonStyle = {
    height: 36,
    paddingInline: 24
}

const filterBtn = {
    width: 93,
    height: 36
}

export const StaffItemHeader = ({
                                    onModel,
                                    availabilityData,
                                    title,
                                    noteModalTypeInfo,
                                    openModal,
                                    handleOpenClose,
                                    globalCredentialInformation,
                                    globalCredentials,
                                    credModalType,
                                    openCloseCredModal,
                                    openCredModal,
                                    activeTab,
                                    status,handleOpen,
                                    setGetStatus
                                    ,setPrevStatus,
                                    getStatus,
                                    type
                                }) => {
    const [inputs, setInputs] = useState({active: 'Active'});

    const classes = serviceSingleStyles()

    const dispatch = useDispatch()

    const allPaycodes = useSelector(state => state.admins.allPaycodes)

    const params = useParams()


    useEffect(()=>{
        setInputs(getStatus)
    },[getStatus])

    useEffect(()=>{
        setInputs(status)
    },[])


    useEffect(() => {
        dispatch(adminActions.getAllPaycodes(params.id))
    }, []);

    const {adminInfoById, adminsList} = useSelector((state) => ({
            adminInfoById: state.admins.adminInfoById,
            adminsList: state.admins.adminsList,
        })
    )

    let changeSwitch = (e) => {
        dispatch(adminActions.isClinician(params.id,e.target.checked))

    }

    const [searchDate, setSearchDate] = useState('')
    const disabled = !searchDate.length
    const handleChange = e => {
        dispatch(httpRequestsOnErrorsActions.removeError('GET_FUNDING_SOURCE_HISTORIES_BY_ID'))
        setSearchDate(e.target.value)
    }

    const handleSubmit = () => {
        dispatch(fundingSourceActions.getFundingSourceHistoriesById('Staff', searchDate && new Date(searchDate).toISOString()))
    }

    const list = [
        {name: 'ACTIVE'},
        {name: 'INACTIVE'},
        {name: 'HOLD'},
        {name: 'TERMINATE'},
    ]

    const handleChange2 = e => {
        setPrevStatus(inputs)
        setGetStatus(e.target.value)
        if (e.target.value === 'INACTIVE' || e.target.value === 'HOLD' || e.target.value === 'TERMINATE'){
            handleOpen()
        }if (e.target.value === 'ACTIVE') {
            dispatch(fundingSourceActions.setStatus(params.id,'funding', e.target.value, type ))
        }

        setInputs(e.target.value)
    };

    return (
        <div>
            <ul className={classes.tabsWrapper}>
                <li>
                    <img src={Images.userProfile} alt="avatar" className={classes.avatar}/>
                    <div className={classes.nameContent}>
                        <h1 className={classes.name}>{title}</h1>
                        <div className={classes.tagContent}>
                            <p>Tag Name</p>
                            <p>Tag Name</p>
                            <p>Tag Name</p>
                        </div>
                    </div>
                </li>
                <li  className={classes.headerRight}>
                    <SelectInput
                        errorFalse={true}
                        styles={inputStyle}
                        name={"active"}
                        handleSelect={handleChange2}
                        value={inputs ? inputs : status}
                        list={list}
                        className={classes.inputTextField}
                    />
                    {
                        activeTab === 0 ?
                            <AddModalButton styles={{width: 450}} btnStyles={editButtonStyle} handleClick={handleOpenClose}
                                            text='edit'/>
                            : activeTab === 2 ? <AddButton styles={{width: 450}} text='Add Timesheet'
                                                           handleClick={handleOpenClose}/>
                            : activeTab === 3 ?
                                <AddButton styles={{width: 450}} text='Add Credential'
                                           handleClick={() => openCloseCredModal('addCredential')}/>
                                : activeTab === 5 ? <AddButton styles={{width: 450}} text='Available Hours' handleClick={handleOpenClose}/>
                                    : activeTab === 1 ?
                                        <>
                                        <div style={{display: 'flex', alignItems: "center"}}>
                                            <p style={{
                                                color: Colors.ThemeBlue,
                                                fontWeight: 'bold'
                                            }}>Clinician</p>
                                            <div style={{margin: '0 24px 0 8px'}}>
                                                <Switch onChange={changeSwitch} color={"primary"}/>
                                            </div>
                                            </div>
                                            <AddButton styles={{width: 450}} text='Add Employment' handleClick={handleOpenClose}/>
                                        </>


                                        : activeTab === 7 ?
                                            <AddButton styles={{width: 450}} text='Add Note' handleClick={handleOpenClose}

                                            />
                                            : activeTab === 3 ?
                                                <AddButton styles={{width: 450}} text='Add Credential'
                                                           handleClick={() => openCloseCredModal('addCredential')}/>
                                                : activeTab === 1 ?
                                                    <div style={{display: 'flex', alignItems: "center"}}>
                                                        <p style={{
                                                            color: Colors.ThemeBlue,
                                                            fontWeight: 'bold'
                                                        }}>Clinician</p>
                                                        <div style={{margin: '0 24px 0 8px'}}>
                                                            <Switch onChange={changeSwitch} color={"primary"}/>
                                                        </div>
                                                        <AddButton styles={{width: 450}} text='Add Employment' handleClick={handleOpenClose}/>
                                                    </div>
                                                    : activeTab === 7 ?
                                                        <AddButton text='Add Note' handleClick={handleOpenClose}/> :
                                                        activeTab === 8 ?
                                                            <div className={classes.searchContainer}>
                                                                <ValidationInput
                                                                    className={classes.dateInput}
                                                                    errorFalse={true}
                                                                    variant={"outlined"}
                                                                    onChange={(e) => handleChange(e)}
                                                                    value={searchDate}
                                                                    type={"date"}
                                                                    name='searchDate'
                                                                />
                                                                <AddModalButton
                                                                    disabled={disabled}
                                                                    handleClick={handleSubmit} text='Search'
                                                                    btnStyles={filterBtn}
                                                                />
                                                            </div>
                                                            : null
                    }
                </li>
            </ul>
            <SimpleModal
                openDefault={activeTab === 3 ? openCredModal : openModal}
                handleOpenClose={activeTab === 3 ? () => openCloseCredModal() : handleOpenClose}
                content={activeTab === 0 ?
                    <CreateStaff adminsList={adminsList && adminsList.staff} staffGeneral={adminInfoById}
                                 resetData={false} handleClose={handleOpenClose}/>
                        : activeTab === 2 ?
                            <TimesheetModal handleClose={handleOpenClose} allPaycodes={allPaycodes}  />
                            : activeTab === 3 ?
                                <CredentialModal
                                    globalCredentialInformation={globalCredentialInformation}
                                                 globalCredentials={globalCredentials} credModalType={credModalType}
                                                 handleClose={() => openCloseCredModal()}/>
                                : activeTab === 1 ? <EmploymentModal handleClose={handleOpenClose}/>
                                    : activeTab === 7 ?
                                        <AddNotes model='Staff' noteModalTypeInfo={noteModalTypeInfo}
                                                  handleClose={handleOpenClose}/>
                                        : activeTab === 5 ?
                                            <AvailabilitySchedule onModel={onModel} availabilityData={availabilityData}
                                                                  handleClose={handleOpenClose}/>
                                            : null}

            />
        </div>
    )
}