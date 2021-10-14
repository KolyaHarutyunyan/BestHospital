import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AddButton, Card, DeleteElement, NoItemText, SimpleModal, SlicedText} from "@eachbase/components";
import {Colors, ErrorText, Images,} from "@eachbase/utils";
import {SelectInputPlaceholder} from "@eachbase/components";
import {adminActions, httpRequestsOnErrorsActions, httpRequestsOnSuccessActions, systemActions} from "@eachbase/store";
import {systemItemStyles} from "../../../system/core";
import {serviceSingleStyles} from "./styles";
import {useParams} from "react-router-dom";
import {AddAuthorization} from "../../../client";
import {deleteStaffService} from "../../../../store/admin/admin.action";

const credentialBtn = {
    maxWidth: '174px',
    width: '100%',
    flex: '0 0 174px',
    padding: 0
}
export const StaffService = ({removeItem, openModal, staffGeneral, info}) => {
    const dispatch = useDispatch()
    const classes = systemItemStyles()
    const classes2 = serviceSingleStyles()
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState('');
    const [index, setIndex] = useState(0);
    const [toggleModal, setToggleModal] = useState(false);
    const services = useSelector(state => state.system.services)
 let params = useParams()

    const {httpOnSuccess, httpOnError, httpOnLoad} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));

    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_STAFF_SERVICE'
    const successCreate = httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_STAFF_SERVICE'



    useEffect(() => {
        if (success) {
            setToggleModal(!toggleModal)
            dispatch(httpRequestsOnSuccessActions.removeSuccess('DELETE_STAFF_SERVICE'))
            dispatch(httpRequestsOnErrorsActions.removeError('GET_STAFF_SERVICE'))
        }
        if (successCreate) {
            setToggleModal(!toggleModal)
            dispatch(httpRequestsOnSuccessActions.removeSuccess('CREATE_STAFF_SERVICE'))
            dispatch(httpRequestsOnErrorsActions.removeError('GET_STAFF_SERVICE'))
        }
    }, [success, successCreate])

    useEffect(() => {
        dispatch(systemActions.getServices())
    }, [])
    const handleChange = e => {
        setInputs(
            prevState => (
                {...prevState, [e.target.name]: e.target.value}
            ));
        error === e.target.name && setError('')
    }

    let deleteService = ()=>{
        dispatch(adminActions.deleteStaffService(params.id, info[index]._id));
    }

    const handleSubmit = () => {


        if (inputs.serviceType) {
            let serviceID = services && services.length >0 && services.find(item => item.name === inputs.serviceType).id
             dispatch(adminActions.createStaffService(params.id, serviceID));
        } else {
            setError(
                !inputs.serviceType ? 'serviceType' :
                    'Input is not filled'
            )
        }
    }
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
            <SimpleModal
                handleOpenClose={() => setToggleModal(!toggleModal)}
                openDefault={toggleModal}
                content={
                     <DeleteElement
                        loader={httpOnLoad.length > 0}
                        info={`${info &&  info[index]?.name}`}
                        text={`delete Service`}
                        handleClose={() => setToggleModal(!toggleModal)}
                        handleDel={deleteService}
                    />}
            />
            <Card
                width='49%'
                cardInfo={generalInfo}
                showHeader={true}
                title='General Info'
                color={Colors.BackgroundBlue}
                icon={Images.generalInfoIcon}
            />
            <div className={`${classes.flexContainer} ${classes.headerSize}`} style={{
                marginLeft: 24,
                borderRadius: '8px',
                boxShadow: '0px 0px 6px #8A8A8A3D',
                padding: 24,
                width: '100%',
                flexDirection: 'column'
            }}>
                <p className={classes.title} style={{marginBottom: 24}}>Services</p>
                <div style={{display: 'flex', width: "100%"}}>
                    <SelectInputPlaceholder
                        placeholder='Service Type'
                        style={classes.credentialInputStyle2}
                        name={"serviceType"}
                        handleSelect={handleChange}
                        value={inputs.serviceType}
                        list={services}
                        typeError={error === 'serviceType' ? ErrorText.field : ''}
                    />
                    <AddButton
                        loader={httpOnLoad.length > 0}
                        styles={credentialBtn}
                        handleClick={handleSubmit}
                        text='Add Service Type'
                    />
                </div>
                <div className={classes.credentialTable} style={{width: '100%'}}>
                    {
                        info && info.length ? info.map((item, index) => {
                            return (
                                <div className={classes.item} key={index} style={{flex: '0 0 100%'}}>
                                    <p style={{display: 'flex', alignItems: 'center'}}>
                                    <span>
                                        <SlicedText type={'responsive'} size={25} data={item.name}/>
                                    </span>
                                        {/*{` - ${convertType(credentialItem.type)}`}*/}
                                    </p>
                                    <div className={classes.icons}>
                                        <img src={Images.remove} alt="delete"
                                             onClick={() => {
                                                 setToggleModal(!toggleModal)
                                                 setIndex(index)
                                             }}
                                        />
                                    </div>
                                </div>
                            )
                        }) : <NoItemText text='No Items Yet'/>
                    }

                </div>
            </div>
        </div>
    )
}