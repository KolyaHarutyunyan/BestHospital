import {Paper, Table, TableContainer} from "@material-ui/core";
import {ClientTableBody, ClientTableHead} from "./core";
import {useGlobalStyles} from "@eachbase/utils";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Loader, PaginationItem} from "@eachbase/components";

export const ClientTable = ({setEditClient,handleClose}) => {
    const globalStyle = useGlobalStyles();
    const [page, setPage] = useState(1);


    const {clientList, httpOnLoad} = useSelector((state) => ({
        clientList: state.client.clientList,
        httpOnLoad: state.httpOnLoad,
    }));
    const changePage = (number) => {
        setPage(number);
    };


    return (
        <div className={globalStyle.tableWrapper}>
            <TableContainer component={Paper}>
                <Table
                    className={globalStyle.table}
                    size="small"
                    aria-label="a dense table"
                >
                    <ClientTableHead/>
                    {httpOnLoad.length ?
                        <Loader/>
                        :
                        clientList.length && clientList.map((item, i) => (
                            <ClientTableBody
                                data={item}
                                key={i}
                                setEditClient={setEditClient}
                                handleClose={handleClose}
                            />
                        ))}
                </Table>
                <PaginationItem
                    text={'Showing 30 to 30 of 500 entries'}
                    handleReturn={(number) => changePage(number)}
                    page={page}
                    count={clientList.length}
                />
            </TableContainer>
        </div>
    );
};
