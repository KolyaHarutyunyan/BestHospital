import React, {useEffect, useState} from "react";
import {CustomBreadcrumbs, AddModalButton, SelectStatusInput, SelectInput} from "@eachbase/components";
import {wrapperStyle} from "./styles";
import {SimpleModal} from "../modal";
import {Colors} from "@eachbase/utils";
import {inputStyle} from "../../fragments/client/clientSingle/core/styles";
import {fundingSourceActions} from "../../store";
import {useDispatch} from "react-redux";

export const TableWrapperGeneralInfo =
    ({
         children,
         body,
         openCloseInfo,
         handleOpenClose,
         title,
         parent,
         parentLink,
         selectStatus,


         status,
         setGetStatus,
         setPrevStatus,
         id,
         handleOpen,
         path,
        type,

         // inputs,
         // handleChange,
     }) => {
        const classes = wrapperStyle();
        const dispatch = useDispatch()


        const list = [
            {name: 'ACTIVE'},
            {name: 'INACTIVE'},
            {name: 'HOLD'},
            {name: 'TERMINATE'},
        ]

        const [inputs, setInputs] = useState(status);

        useEffect(() => {
            setInputs(status)
        }, [])


        const handleChange = e => {
            setPrevStatus(inputs)
            setGetStatus(e.target.value)
            if (e.target.value === 'INACTIVE' || e.target.value === 'HOLD' || e.target.value === 'TERMINATE') {
                handleOpen(e.target.value)
            }
            if (e.target.value === 'ACTIVE') {
                dispatch(fundingSourceActions.setStatus(id, path, e.target.value, type))
            }

            setInputs(e.target.value)
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
                            value={inputs ? inputs : status}
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
