import {Paper, Table, TableContainer} from "@material-ui/core";
import {FundingSourceTableBody, FundingSourceTableHead} from "./core";
import {useGlobalStyles} from "@eachbase/utils";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Loader, PaginationItem} from "@eachbase/components";

export const FundingSourceTable = ({}) => {
    const globalStyle = useGlobalStyles();
    const [page, setPage] = useState(1);
    const {officesList, httpOnLoad} = useSelector((state) => ({
        officesList: state.offices.officesList,
        httpOnLoad: state.httpOnLoad,
    }));
    const changePage = (number) => {
        setPage(number);
    };
    const list = officesList && officesList.length && officesList[page - 1]
    return (
        <div className={globalStyle.tableWrapper}>
            <TableContainer component={Paper}>
                <Table
                    className={globalStyle.table}
                    size="small"
                    aria-label="a dense table"
                >
                    <FundingSourceTableHead/>
                    {httpOnLoad.length ?
                        <Loader/>
                        :
                        list.length && list.map((item, i) => (
                            <FundingSourceTableBody
                                data={item}
                                key={i}
                            />
                        ))}
                </Table>
                <PaginationItem
                    text={'Showing 30 to 30 of 500 entries'}
                    handleReturn={(number) => changePage(number)}
                    page={page}
                    count={officesList.length}
                />
            </TableContainer>
        </div>
    );
};
