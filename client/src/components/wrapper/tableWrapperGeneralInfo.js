import React, {useEffect, useState} from "react";
import {CustomBreadcrumbs, SelectInput} from "@eachbase/components";
import {wrapperStyle} from "./styles";
import {SimpleModal} from "../modal";
import {inputStyle} from "../../fragments/client/clientSingle/core/styles";
import {fundingSourceActions} from "@eachbase/store";
import {useDispatch} from "react-redux";
import {list} from "@eachbase/utils";

export const TableWrapperGeneralInfo = ({children, body, openCloseInfo, handleOpenClose, title, parent, parentLink, selectStatus, status, id, handleOpen, path, type,}) => {
        const classes = wrapperStyle();
        const dispatch = useDispatch()
        const [inputs, setInputs] = useState( '');

        useEffect(() => { setInputs(status) }, [status])

        const handleChange = e => {
            if (e.target.value === 'INACTIVE' || e.target.value === 'HOLD' || e.target.value === 'TERMINATE') {
                handleOpen(e.target.value)
            }
            if (e.target.value === 'ACTIVE') {
                setInputs(e.target.value)
                dispatch(fundingSourceActions.setStatus(id, path, e.target.value, type))
            }

        };

        return (
            <React.Fragment>
                <div className={classes.inactiveActiveHeader}>
                    <div>
                        <CustomBreadcrumbs className={classes.breadcrumb} parent={parent} child={title}
                                           parentLink={parentLink}/>
                    </div>


                    <div>
                        {selectStatus &&
                        <SelectInput
                            styles={inputStyle}
                            name={"active"}
                            handleSelect={handleChange}
                            value={inputs ? inputs : ''}
                            list={list}
                            className={classes.inputTextField}
                        />
                        }
                    </div>

                </div>
                <div className={classes.addButton}>
                    <SimpleModal
                        content={body}
                        handleOpenClose={handleOpenClose}
                        openDefault={openCloseInfo}
                    />
                </div>
                {children}
            </React.Fragment>
        );
    };
