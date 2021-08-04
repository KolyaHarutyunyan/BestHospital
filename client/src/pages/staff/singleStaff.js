import React, {useEffect, useState} from "react";
import {Redirect, Route, Switch, useHistory, useParams} from "react-router-dom";
import {SimpleTabs, Card, Notes, TableWrapperGeneralInfo, InactiveModal} from "@eachbase/components";
import {adminActions, officeActions} from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";
import otherDetails from '@eachbase/assets/images/icons/otherDetails.svg';

export const SingleStaff = ({general}) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    const params = useParams()

    useEffect(() => {
        dispatch(adminActions.getAdminById(params.id))
    }, []);

    const {adminInfoById} = useSelector((state)=>({
            adminInfoById: state.admins.adminInfoById
        })
    )
    console.log(adminInfoById,'adminInfoById');

    // const {officeById} = useSelector((state)=>({
    //         officeById: state.offices.officeById,
    //     })
    // )
    const handleOpenClose = () => {
        setOpen(!open)
    }

    // component

    const [inputField, setInputField] = useState('')
    console.log(inputField, 'inputField');

    const tabsLabels = [
        {
            label: 'Item one'
        },
        {
            label: 'Item two'
        },
        {
            label: 'Item three'
        }
    ]

    const headerTitles = [
        {
            title: 'title 1',
            sortable: true
        },
        {
            title: 'title 2',
            sortable: true
        },
        {
            title: 'title 3',
            sortable: false
        },
    ];

    const bodyTitles = [

        {
            title: 'body title 1',
        },
        {
            title: 'body title 2',
        },
        {
            title: 'b t 3',
        }

    ]

    const thirdTab = () => {
        return (
            <div>
                Third screen
                <input type="text"
                       onChange={
                           (e) => setInputField(e.target.value)
                       }
                />
            </div>
        )
    }

    const cardInfo = [
        {
            title: 'title 1',
            value: 'val 1'
        },
        {
            title: 'title 2',
            value: 'val 2'
        },
        {
            title: 'title 3',
            value: 'val 3'
        },
        {
            title: 'title 4',
            value: 'val 4'
        },

    ]

    const tabsContent = [
        {
            tabComponent: (<Card cardInfo={cardInfo} color='red' icon={otherDetails} title='Title'/>)
        },
        {
            tabComponent: (<Notes bodyTitles={bodyTitles} headerTitles={headerTitles}/>)
        },
        {
            tabComponent: thirdTab()
        }
    ];

    // component

    return (
        <>
            <TableWrapperGeneralInfo
                status='inactive'
                buttonsTabAddButton={true}
                activeInactiveText={'Inactive'}
                openCloseInfo={open}
                handleOpenClose={handleOpenClose}
                body={<InactiveModal handleOpenClose={handleOpenClose} handleClose={handleOpenClose} />}
            >
                <div style={{backgroundColor: 'white', padding: '20px'}}>
                    <SimpleTabs tabsLabels={tabsLabels} tabsContent={tabsContent}/>
                </div>
            </TableWrapperGeneralInfo>
            {/*// : (<OfficesInfo info={officeById}/>)*/}

        </>
    );
}
