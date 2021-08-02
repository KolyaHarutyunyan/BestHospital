import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {TableWrapper, SimpleTabs, Card, Notes, TableWrapperGeneralInfo, InactiveModal} from "@eachbase/components";
import {OfficesInfo, StaffTable, CreateStaff,} from "@eachbase/fragments";

import {officeActions} from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";
import otherDetails from '@eachbase/assets/images/icons/otherDetails.svg'


export const Staff = ({general}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [open, setOpen] = useState(false)
    useEffect(() => {
        dispatch(officeActions.getOffices())
    }, []);

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
            {/*{!officeById ?*/}
            {/*    (*/}
            {/*<TableWrapper*/}
            {/*    firstButton={"Active"}*/}
            {/*    secondButton={"Inactive"}*/}
            {/*    buttonsTab={true}*/}
            {/*    buttonsTabAddButton={true}*/}
            {/*    addButtonText={'Add Staff Member'}*/}
            {/*    openCloseInfo={open}*/}
            {/*    handleOpenClose={handleOpenClose}*/}
            {/*    body={<CreateStaff handleClose={handleOpenClose}/>}*/}
            {/*>*/}
            {/*    <StaffTable/>*/}
            {/*</TableWrapper>*/}

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

            {/*)*/}
            {/*: (<OfficesInfo info={officeById}/>)*/}


        </>
    );
}
