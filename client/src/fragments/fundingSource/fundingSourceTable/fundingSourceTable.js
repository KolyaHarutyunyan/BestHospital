import React, {useState} from "react";
import {Paper, Table, TableContainer} from "@material-ui/core";
import {FundingSourceTableBody, FundingSourceTableHead} from "./core";
import {useGlobalStyles} from "@eachbase/utils";
import {useDispatch, useSelector} from "react-redux";
import {Loader, PaginationItem} from "@eachbase/components";
import {fundingSourceActions} from "@eachbase/store";

export const FundingSourceTable = ({ status }) => {
    const globalStyle = useGlobalStyles();
    const [page, setPage] = useState(1);
    const dispatch = useDispatch()
    const {fundingSourceList, httpOnLoad} = useSelector((state) => ({
        fundingSourceList: state.fundingSource.fundingSourceList,
        httpOnLoad: state.httpOnLoad,
    }));
    const changePage = (number) => {
        setPage(number)
        console.log(number,'number')
        let start = number > 1 ? number -1  + '1'    : number
        let end = number > 2 ?  number + '0' : 0
        console.log(end,'end')
        dispatch(fundingSourceActions.getFundingSource({ status : status, start : end, end : 10 }))


    };


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
                        fundingSourceList?.funders   && fundingSourceList.funders.map((item, i) => (
                            <FundingSourceTableBody
                                data={item}
                                key={i}
                            />
                        ))}
                </Table>
                {/*<PaginationItem*/}
                {/*    text={`Showing 1-7 of ${list.length} entries`}*/}
                {/*    handleReturn={(number) => changePage(number)}*/}
                {/*    page={page}*/}
                {/*    count={fundingSourceList.length}*/}
                {/*/>*/}
                <PaginationItem
                    listLength={fundingSourceList?.funders?.length}
                    page={page}
                    handleReturn={(number) => changePage(number)}
                    count={fundingSourceList?.count}
                    entries={fundingSourceList?.funders?.length}
                />
            </TableContainer>
        </div>
    );
};


