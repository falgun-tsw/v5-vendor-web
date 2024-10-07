import React, { memo, useState, useEffect } from "react";

import { TablePagination as MtablePagination } from "@mui/material";

const TablePagination = (props) => {
  const defaultOptions = {
    rowsPerPageOptions: [10,20,30,40,50]
  }
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(props.defaultRowsPerPage || 10);
  const { refreshTable, onPageChange, count, defaultRowsPerPage = 10, rowsPerPageOptions = defaultOptions.rowsPerPageOptions, ...restProps } = props;

  useEffect(() => {
    if (refreshTable){
      setPage(0);
      setRowsPerPage(defaultRowsPerPage);
      onPageChange(1, defaultRowsPerPage);
    }
  }, [refreshTable, defaultRowsPerPage, onPageChange]);

  const handleRowsPerPageChange = (e) => {
    setPage(0);
    setRowsPerPage(e.target.value);
    onPageChange(1, parseInt(e.target.value));
  };

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
    onPageChange(newPage + 1, rowsPerPage);
  };

  return (
    <MtablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component="div" 
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={(e, newPage) => handlePageChange(e, newPage)}
      onRowsPerPageChange={(e) => handleRowsPerPageChange(e)}
      count={count}
      labelRowsPerPage=""
      {...restProps}
    />
  );
};

export default memo(TablePagination);
