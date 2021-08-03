import {Paper, Table, TableContainer} from "@material-ui/core";
import {StaffTableBody, StaffTableHead} from "./core";
import {useGlobalStyles} from "@eachbase/utils";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Loader, PaginationItem} from "@eachbase/components";

export const StaffTable = ({}) => {
    const globalStyle = useGlobalStyles();
    const [page, setPage] = useState(1);
    const { adminsList, httpOnLoad } = useSelector((state) => ({
        adminsList: state.admins.adminsList,
        httpOnLoad: state.httpOnLoad
    }));
    const changePage = (number) => {
        setPage(number);
    };
    const list = adminsList && adminsList.length && adminsList[page - 1]
    return (
        <div className={globalStyle.tableWrapper}>
            <TableContainer component={Paper}>
                <Table
                    className={globalStyle.table}
                    size="small"
                    aria-label="a dense table"
                >
                    <StaffTableHead/>
                    {httpOnLoad.length ?
                        <Loader/>
                        :
                        list.length && list.map((item, i) => (
                            <StaffTableBody
                                data={item}
                                key={i}
                            />
                        ))}
                </Table>
                <PaginationItem
                    text={'Showing 30 to 30 of 500 entries'}
                    handleReturn={(number) => changePage(number)}
                    page={page}
                    count={adminsList.length}
                />
            </TableContainer>
        </div>
    );
};
