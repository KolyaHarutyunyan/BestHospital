import React, {useState} from "react";
import {Colors, useGlobalText} from "@eachbase/utils";
import {officesInfoFragments} from "./index";
import {AddButton, CircleAndTitle, Line, Management, SimpleModal, Switcher} from "@eachbase/components";
import {AddManagerModal} from "./addManagerModal";

export const OfficeManagement = ({}) => {
    const [open, setOpen] = useState(false)
    const classes = officesInfoFragments()
    const globalStyle = useGlobalText()

    const handleOpenClose =()=>{
        setOpen(!open)
    }

    return (
        <div>
            <div>
                <CircleAndTitle number={2} back={Colors.ThemeOrange} title={'Office Management'}/>
                
                
                <div className={classes.lineWrapper}>
                    <Line height={'500px'}/>
                    
                   <div style={{ display:'flex',width:'100%',height:'100%' }}>

                       <div style={{marginRight:'16px',width:'100%'}}>
                    <Management
                        head={
                            <div className={classes.managementHead}>
                                <p className={globalStyle.smallText}  >Office Managers</p>



                                <AddButton
                                    handleClick={ handleOpenClose }
                                    text={"Add Office Manager"} />

                            </div>
                        }
                        body={
                            <div style={{marginTop:'24px'}}>
                               <div style={{
                                    height: '48px',
                                    background: '#E6ECF380 0% 0% no-repeat padding-box',
                                    borderRadius: '4px',
                                    marginBottom:'8px',
                                    justifyContent:'space-between',
                                    display:'flex',
                                    alignItems:'center',
                                    padding:'16px'

                                }}>
                                    <p>Name Surname</p>
                                    <div style={{
                                        display:'flex',
                                        alignItems:'center'}
                                    }>
                                    <button>a</button>
                                    <Switcher/>
                                    </div>
                                </div>
                            </div>
                        }
                    /></div>



                    <Management
                        head={
                            <div className={classes.managementHead}>
                                <p 
                                
                                
                                className={globalStyle.smallText}  >MC Authorites</p>
                                {/* <AddButton
                                    handleClick={ handleOpenClose }
                                    text={"Add Office Manager"} /> */}

                            </div>
                        }
                        body={
                            <div style={{marginTop:'24px'}}>

                                <div style={{
                                    height: '48px',
                                    background: '#E6ECF380 0% 0% no-repeat padding-box',
                                    borderRadius: '4px',
                                    marginBottom:'8px',
                                    justifyContent:'space-between',
                                    display:'flex',
                                    alignItems:'center',
                                    padding:'16px'

                                }}>
                                    <p>Name Surname</p>
                                    <div style={{
                                        display:'flex',
                                        alignItems:'center'}
                                    }>

                                    </div>
                                </div>
                            </div>
                        }
                    />
                   </div>
                </div>
            </div>





            <SimpleModal
                handleOpenClose = {handleOpenClose}
                openDefault={open}
                content={
                    <AddManagerModal
                        handleClose={handleOpenClose}

                    />
                    
                }
            />
        </div>
    )
}