import {Box, Paper, Table, TableContainer} from "@material-ui/core";
import { officesFragments, CarriersTableBody, CarriersTableHead } from "./core";
import { useGlobalStyles } from "@eachbase/utils";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {PaginationItem} from "@eachbase/components";

export const CarriersTable = ({ }) => {
    const globalStyle = useGlobalStyles();

    const [page, setPage] = useState(1);

    const { officesList } = useSelector((state) => ({
        // officesList: state.fundingSource.officesList
    }));

    const changePage = (number) => {
        setPage(number);
    };

    // const list = officesList && officesList.length && officesList[page - 1]

    return (
        <div className={globalStyle.tableWrapper}>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <CarriersTableHead />

                    {/*{list.length && list.map((item, i) => (*/}
                        <CarriersTableBody
                            // data={item}
                            // key={i}
                        />
                    {/*))}*/}

                </Table>
                <PaginationItem page={page} handleReturn={(number) => changePage(number)}
                                // count={officesList.length}
                                count={1}
                />

            </TableContainer>
        </div>
    );
};
