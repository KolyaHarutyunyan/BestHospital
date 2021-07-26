import React, { useState } from "react";
import { Paper, Table, TableContainer } from "@material-ui/core";
import { AgentsTableHead, AgentsTableBody } from "./core";
import { useGlobalStyles } from "@eachbase/utils";
import { useSelector } from "react-redux";
import { PaginationItem } from "@eachbase/components";

export const AgentsTable = ({}) => {
  const globalStyle = useGlobalStyles();
  const [page, setPage] = useState(1);

  const { agentList } = useSelector((state) => ({
    agentList: state.agents.agentList
  }));

  const changePage = (number) => {
    setPage(number);
  };

  const list = agentList && agentList.length && agentList[page - 1]
  return (
    <div className={globalStyle.tableWrapper}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <AgentsTableHead />
          {list.length && list.map((item, i) => (
            <AgentsTableBody
              data={item}
              key={i}
            />
          ))}
        </Table>

        <PaginationItem page={page} handleReturn={(number) => changePage(number)} count={agentList.length} />

      </TableContainer>
    </div>
  );
};
