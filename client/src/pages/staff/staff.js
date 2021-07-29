import React, {useEffect} from "react";
import { TableWrapper} from "@eachbase/components";
import {OfficesInfo, StaffTable, CreateStaff,} from "@eachbase/fragments";
import { useHistory } from "react-router-dom";
import { officeActions } from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";


export const Staff = ({}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(officeActions.getOffices())
    }, []);

    // const {officeById} = useSelector((state)=>({
    //         officeById: state.offices.officeById,
    //     })
    // )

    return (
        <>
            {/*{!officeById ?*/}
            {/*    (*/}
                    <TableWrapper
                        firstButton={"Active"}
                        secondButton={"Inactive"}
                        buttonsTab={true}
                        buttonsTabAddButton={true}
                        addButtonText={'Add Staff Member'}
                        body={ <CreateStaff/> }
                    >

                        <StaffTable/>

                    </TableWrapper>
                {/*)*/}
                {/*: (<OfficesInfo info={officeById}/>)*/}

            }
        </>
    );
}
