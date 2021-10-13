import React from "react";
import {serviceSingleStyles} from "./styles";
import {Colors, Images} from "@eachbase/utils";
import {AddButton, AddModalButton, SimpleModal, AddNotes} from "@eachbase/components";
import {CreateStaff, CredentialModal} from "@eachbase/fragments";
import {useSelector} from "react-redux";
import {EmploymentModal, TimesheetModal} from "./modals";
import {Switch} from "@material-ui/core";

const editButtonStyle = {
    height: 36,
    paddingInline: 24
}

export const StaffItemHeader = ({
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
                                }) => {

    const classes = serviceSingleStyles()

    const {adminInfoById, adminsList} = useSelector((state) => ({
            adminInfoById: state.admins.adminInfoById,
            adminsList: state.admins.adminsList,
        })
    )


    let changeSwitch = (e)=>{
        console.log(e.target.checked)
    }


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
                <li>
                    {
                        activeTab === 0 ?
                            <AddModalButton btnStyles={editButtonStyle} handleClick={handleOpenClose}
                                            text='edit'/>
                            : activeTab === 2 ? <AddButton text='Add Timesheet'
                                                           handleClick={handleOpenClose}
                            />
                            : activeTab === 3 ?
                                <AddButton text='Add Credential'
                                           handleClick={() => openCloseCredModal('addCredential')}/>
                                : activeTab === 1 ? <div style={{display: 'flex', alignItems: "center"}}>
                                        <p style={{color:Colors.ThemeBlue, fontWeight: 'bold'}}>Clinician</p>
                                       <div style={{margin: '0 24px 0 8px'}}>
                                           <Switch onChange={changeSwitch} color={"primary"} />
                                       </div>
                                        <AddButton text='Add Employemnt' handleClick={handleOpenClose}/>
                                    </div>
                                    : activeTab === 7 ?
                                        <AddButton text='Add Note' handleClick={handleOpenClose}/> : null
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
                        <TimesheetModal handleClose={handleOpenClose}/>
                        : activeTab === 3 ?
                            <CredentialModal globalCredentialInformation={globalCredentialInformation}
                                             globalCredentials={globalCredentials} credModalType={credModalType}
                                             handleClose={() => openCloseCredModal()}/>
                            : activeTab === 1 ? <EmploymentModal handleClose={handleOpenClose}/>
                                : activeTab === 7 ?
                                    <AddNotes model='Staff' noteModalTypeInfo={noteModalTypeInfo}
                                              handleClose={handleOpenClose}/> : null}
            />
        </div>
    )
}