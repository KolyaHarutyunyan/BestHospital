import React, {useState} from "react";
import {Paper, Table, TableContainer} from "@material-ui/core";
import {useGlobalStyles} from "@eachbase/utils";
import {Loader, PaginationItem} from "@eachbase/components";
import {StaffTableBody, StaffTableHead} from "./core";
import {useDispatch, useSelector} from "react-redux";
import {adminActions} from "@eachbase/store";

export const StaffTable = ({status, handleGetPage}) => {
    const dispatch = useDispatch()
    const globalStyle = useGlobalStyles();
    const [page, setPage] = useState(1);
    const { adminsList, httpOnLoad } = useSelector((state) => ({
        adminsList: state.admins.adminsList,
        httpOnLoad: state.httpOnLoad
    }));

    const changePage = (number) => {
        setPage(number)
        let start = number > 2 ?  number + '0' : 0
        dispatch(adminActions.getAdmins({ status : status, start : start, end : 10 }))
        handleGetPage(start)
    };
    return (
        <div className={globalStyle.tableWrapper}>
            {
                httpOnLoad.length ?  <Loader/>  :
                <TableContainer component={Paper}>
                    <Table
                        className={globalStyle.table}
                        size="small"
                        aria-label="a dense table"
                    >
                        <StaffTableHead/>
                        {
                            adminsList?.staff && adminsList.staff.map((item, i) => (
                                <StaffTableBody
                                    key={i}
                                    data={item}
                                    index={i}
                                />
                            ))}
                    </Table>
                    <PaginationItem
                        listLength={adminsList?.staff?.length}
                        page={page}
                        handleReturn={(number) => changePage(number)}
                        count={adminsList?.count}
                        entries={adminsList?.staff?.length}
                    />
                </TableContainer>
            }
        </div>
    );
};
