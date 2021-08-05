import React, {useEffect, useState} from "react";
import {SimpleTabs, Card, Notes, TableWrapperGeneralInfo, InactiveModal} from "@eachbase/components";
import {adminActions, fundingSourceActions} from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";
import otherDetails from '@eachbase/assets/images/icons/otherDetails.svg';
import {useLocation, useParams} from "react-router-dom";
import {CardItem} from "../../../components/card/cardItem";
import {FundingSourceGeneral, FundingSourceSingleHeader} from "./core";

export const FundingSourceItem = ({general}) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const params = useParams()
    const data = useSelector(state => state.fundingSource.fundingSourceItem)
    const [activeTab, setActiveTab] = useState(0)


    useEffect(() => {
        dispatch(adminActions.getAdmins())
        dispatch(fundingSourceActions.getFundingSourceById(params.id))
    }, []);

    const {adminInfoById} = useSelector((state) => ({
            adminInfoById: state.admins.adminInfoById
        })
    )

    const handleOpenClose = () => {
        setOpen(!open)
    }
    // component
    const [inputField, setInputField] = useState('')
    console.log(inputField, 'inputField');
    const tabsLabels = [
        {label: 'General Information'},
        {label: 'Services'},
        {label: 'Notes'},
        {label: 'History'}
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
    const tabsContent = [
        {
            tabComponent: <FundingSourceGeneral data={data}/>
        },
        {
            tabComponent: (<Notes bodyTitles={bodyTitles} headerTitles={headerTitles}/>)
        },
        {
            tabComponent: thirdTab()
        },
        {
            tabComponent: thirdTab()
        },
    ];
    // component



    return (
        <>
            <TableWrapperGeneralInfo
                title={data?.name}
                status='inactive'
                buttonsTabAddButton={true}
                activeInactiveText={'Inactive'}
                openCloseInfo={open}
                handleOpenClose={handleOpenClose}
                body={<InactiveModal handleOpenClose={handleOpenClose} handleClose={handleOpenClose}/>}
            >
                <div style={{backgroundColor: 'white', padding: '20px'}}>
                   <FundingSourceSingleHeader title={data?.name} activeTab={activeTab} />
                   <SimpleTabs setActiveTab={setActiveTab} tabsLabels={tabsLabels} tabsContent={tabsContent}/>
                </div>
            </TableWrapperGeneralInfo>
            {/*// : (<OfficesInfo info={officeById}/>)*/}
        </>
    );
}