import React, {useEffect, useState} from "react";
import {ValidationInput, SelectInput, CreateChancel, ModalHeader} from "@eachbase/components";
import {createClientStyle,} from "./styles";
import {ErrorText} from "@eachbase/utils";
import {useDispatch, useSelector} from "react-redux";
import {clientActions, fundingSourceActions} from "@eachbase/store";
import {useParams} from "react-router-dom";
import {createClientsAuthorizationsServ} from "../../../store/client/client.action";


export const AddAuthorizationService = ({handleClose, info, fundingId, authId}) => {

    const [error, setError] = useState("");
    const [inputs, setInputs] = useState(info ? {...info, funding: info?.funderId?.name} : {});
    const [modCheck, setModCheck] = useState([]);
    const params = useParams()
    const dispatch = useDispatch()
    const modifiers = useSelector(state => state.fundingSource.modifiers.modifiers)
    useEffect(() => {
        dispatch(fundingSourceActions.getFoundingSourceServiceById(fundingId))
    }, []);


    const fSelect = useSelector(state => state.fundingSource.fundingSourceServices)


    const classes = createClientStyle()

    const handleChange = e => {
        if (e.target.name === 'modifiers') {
            let id = fSelect.find(item => item.name === e.target.value)._id
            dispatch(fundingSourceActions.getFoundingSourceServiceModifiers(id))
        }
        setInputs(
            prevState => ({...prevState, [e.target.name]: e.target.value}),
            error === e.target.name && setError(''),
        )
    };


    const handleCreate = () => {
        if (inputs.total && inputs.modifiers) {
            // let funderId;
            // fSelect.forEach(item => {
            //     if (inputs.funding === item.name) {
            //         funderId = item.id
            //     }
            // })
            const data = {
                "total": +inputs.total,
                "modifiers": ['dgdfg','fdgdfg'],

            }
            if (info) {
                // dispatch(clientActions.editClientsAuthorizations(data, info.id))
            } else {

                 dispatch(clientActions.createClientsAuthorizationsServ(data, authId, params.id, ))
            }
            handleClose()
        } else {
            setError(
                !inputs.total ? 'total' :
                !inputs.modifiers ? 'modifiers' :
                    'Input is not field'
            )
        }
    }

    function onModifier(index) {
        let arr = new Set([...modCheck])
        if (arr.has(index)) {
            arr.delete(index)
        } else {
            arr.add(index)
        }
        let newArr = []
        arr.forEach(item => {
            newArr.push(item)
        })
        setModCheck(newArr)


    }


    return (
        <div className={classes.createFoundingSource}>
            <ModalHeader
                handleClose={handleClose}
                title={info ? "Edit Authorization Service" : 'Add Authorization Service'}
                text={'To add a new authorization service in the system, please fulfill the below fields.'}
            />
            <div className={classes.createFoundingSourceBody}>
                <div className={classes.clientModalBlock}>
                    <div className={classes.clientModalBox}>
                        <p className={classes.inputInfo}>Service</p>
                        <SelectInput
                            name={"modifiers"}
                            label={"Service Code*"}
                            handleSelect={handleChange}
                            value={inputs.modifiers}
                            list={fSelect}
                            typeError={error === 'modifiers' ? ErrorText.field : ''}
                        />

                        <div className={classes.displayCodeBlock2}>
                            <p className={classes.displayCodeBlockText}>Available Modfiers </p>
                            <div className={classes.availableModfiers}>
                                {modifiers && modifiers.length > 0 ? modifiers.map((item, index) => {

                                    return (
                                        <p className={classes.availableModfier} onClick={() => onModifier(index)}
                                           style={modCheck.includes(index) ? {
                                               background: '#347AF0',
                                               color: '#fff'
                                           } : {}}>
                                            {item.name}</p>
                                    )
                                }) : <p>N/A</p>}
                            </div>
                        </div>

                        <p className={classes.inputInfo}>Availability</p>
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            value={inputs.total}
                            type={"number"}
                            label={"Total Units*"}
                            name='total'
                            typeError={error === 'total' && ErrorText.field}
                        />
                        <div className={classes.displayCodeBlock}>
                            <p className={classes.displayCodeBlockText}>Completed Units: <span
                                className={classes.displayCode}>N/A</span></p>
                            <p className={classes.displayCodeBlockText} style={{marginTop: 16}}>Available Units: <span
                                className={classes.displayCode}>N/A</span></p>
                            <p className={classes.displayCodeBlockText} style={{marginTop: 16}}>Percent
                                Utilization: <span
                                    className={classes.displayCode}>N/A</span></p>
                        </div>
                    </div>
                </div>
                <div className={classes.clientModalBlock}>
                    <CreateChancel
                        create={info ? "Save" : 'Add'}
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
