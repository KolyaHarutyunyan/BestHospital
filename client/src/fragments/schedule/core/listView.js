import React from "react";
import {Card} from "./card";
import {Filters} from "./filters";
import {scheduleStyle} from "./styles";
import {Images} from "@eachbase/utils";
import {Items} from "./items";
import {SelectInput, Switcher} from "@eachbase/components";
import {Link} from "react-router-dom";
import moment from "moment";

export const ListView = ({changeScreen, handleOpenClose}) => {
    const classes = scheduleStyle()
    let currentDate = new Date();
    let firstday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())).toUTCString();
    let lastday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7)).toUTCString();
    let convertedDate = `${currentDate.toLocaleString('default', { month: 'long' })} ${new Date(firstday).getDate()} - ${new Date(lastday).getDate()}`

    return (
        <div>
            <Filters
                handleOpenClose={handleOpenClose}
                label={convertedDate}
                goToNext={() => console.log('a')}
                goToBack={() => console.log('aaa')}
                handleChangeScreenView={(e) => changeScreen(e)}
            />

            <div className={classes.listWrapper}>
                <div className={classes.wrapp}>
                    <div className={classes.cardWrapper}>
                        <p className={classes.cardTitle}>Monday, Sep 13 2021</p>
                        <Card borderType={'Rendered'}/>
                        <Card borderType={'Cancelled'}/>
                    </div>

                    <div className={classes.cardWrapper}>
                        <p className={classes.cardTitle}>Monday, Sep 13 2021</p>
                        <Card borderType={'Pending'}/>
                        <Card borderType={'Completed'}/>
                        <Card borderType={'Not Rend...'}/>
                    </div>

                    <div className={classes.cardWrapper}>
                        <p className={classes.cardTitle}>Monday, Sep 13 2021</p>
                        <Card borderType={'Pending'}/>
                        <Card borderType={'Completed'}/>
                        <Card borderType={'Not Rend...'}/>
                    </div>
                </div>

                <div className={classes.infoWrapper}>
                    <div className={classes.titleWrapper}>
                        <p>Service Appointment</p>
                        <div>
                            <button>
                                <img src={Images.remove} alt="icon"/>
                            </button>
                            <button>
                                <img src={Images.edit} alt="icon"/>
                            </button>
                        </div>
                    </div>
                    <p className={classes.infoDate}>Sep 13, 2021 <span>09:00 AM - 11:00 AM</span></p>

                    <div className={classes.itemsWrap}>
                        <Items text={'Client:'} subText={'Jane Smith'}/>
                        <Items text={'Authorized Service:'} subText={'PT (HA, HC, HN)'}/>
                        <Items text={'Staff Member:'} subText={'Alice Johansson'}/>
                        <Items text={'Staff Paycode:'} subText={'PT'}/>
                        <Items text={'Client Address:'} subText={'1100 East Broadway #302 Glendale, CA 91205'}/>
                        <Items text={'Place of Service:'} subText={'In Home (02)'}/>
                    </div>

                    <div className={classes.infoFooter}>
                        <p className={classes.infoFooterTitle}>Event Status</p>
                        <SelectInput
                            // language={null}
                            name={"rendered"}
                            label={"Rendered"}
                            // handleSelect={handleChange}
                            // value={inputs?.funding}
                            list={[]}
                            // typeError={error === 'funding' ? ErrorText.field : ''}
                        />

                        <div className={classes.switch}>
                            <div>
                                <Link className={classes.link}>Signature.csv</Link>
                                <img className={classes.download} src={Images.download} alt="icon"/>
                            </div>

                            <div>
                                <p>Require Signature</p>
                                <Switcher/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}