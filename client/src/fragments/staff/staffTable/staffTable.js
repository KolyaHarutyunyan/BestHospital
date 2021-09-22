import React, {useState} from "react";
import {Paper, Table, TableBody, TableContainer} from "@material-ui/core";
import {useGlobalStyles} from "@eachbase/utils";
import {Loader, PaginationItem} from "@eachbase/components";
import {StaffTableBody, StaffTableHead} from "./core";
import {useDispatch, useSelector} from "react-redux";
import {adminActions} from "@eachbase/store";

export const StaffTable = ({status, handleGetPage}) => {
    const dispatch = useDispatch()
    const globalStyle = useGlobalStyles();
    const [page, setPage] = useState(1);
    const {adminsList, httpOnLoad} = useSelector((state) => ({
        adminsList: state.admins.adminsList,
        httpOnLoad: state.httpOnLoad
    }));

    const changePage = (number) => {
        let start = number > 1 ? (number - 1) + '0' : 0;
        setPage(number)
        dispatch(adminActions.getAdmins({status: status, start: start, end: 10}))
        handleGetPage(start)
    };
    return (
        <div className={globalStyle.tableWrapper}>
            <Paper className={globalStyle.tableBack}>
                {
                    httpOnLoad.length ? <Loader/> :
                        <TableContainer style={{height: 'calc(100vh - 250px)'}} component={Paper}>
                            <Table
                                stickyHeader
                                className={globalStyle.table}
                                size="small"
                                aria-label="sticky table"
                            >
                                <StaffTableHead/>
                                <TableBody>
                                    {adminsList?.staff && adminsList.staff.map((item, i) => (
                                        <StaffTableBody
                                            key={i}
                                            data={item}
                                            index={i}
                                        />
                                    ))}
                                </TableBody>

                            </Table>
                        </TableContainer>
                }
                {
                    !httpOnLoad.length &&
                    <PaginationItem
                        listLength={adminsList?.staff?.length}
                        page={page}
                        component="div"
                        handleReturn={(number) => changePage(number)}
                        count={adminsList?.count}
                        entries={adminsList?.staff?.length}
                    />
                }

            </Paper>
        </div>
    );
};
