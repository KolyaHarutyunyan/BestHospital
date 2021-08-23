import {Paper, Table, TableContainer} from "@material-ui/core";
import {ClientTableBody, ClientTableHead} from "./core";
import {useGlobalStyles} from "@eachbase/utils";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Loader, PaginationItem} from "@eachbase/components";


export const ClientTable = ({setOpen,handleClose,setDeleteClient}) => {
    const globalStyle = useGlobalStyles();
    const [page, setPage] = useState(1);

    const {clientList, httpOnLoad} = useSelector((state) => ({
        clientList: state.client.clientList,
        httpOnLoad: state.httpOnLoad,
    }));
    const changePage = (number) => {
        setPage(number);
    };

    const list = clientList && clientList.length && clientList[page - 1]

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
                        list.length && list.map((item, i) => (
                            <ClientTableBody
                                data={item}
                                index = {i}
                                setOpen={setOpen}
                                handleClose={handleClose}
                                setDeleteClient={setDeleteClient}
                            />
                        ))}
                </Table>
                <PaginationItem
                    text={`Showing 1 to 1 of ${clientList.length} entries`}
                    handleReturn={(number) => changePage(number)}
                    page={page}
                    count={clientList.length}
                />
            </TableContainer>
        </div>
    );
};
