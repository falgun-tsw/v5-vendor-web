import React, { Fragment, useEffect, useState } from 'react';
import useSettings from 'src/FormElements/app/hooks/useSettings';
import { makeStyles } from '@mui/styles';
import { CircularProgress, Grid, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, IconButton, Icon, Tooltip, Paper } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/system';
import { useParams, useHistory } from 'react-router';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

const useStyles = makeStyles(({ palette, ...theme }) => ({

}));

const StyledProgress = styled(CircularProgress)(() => ({
    '@media screen and (min-width: 800px)': {
        position: 'absolute',
        top: '35vh',
        left: `calc(((100% - 260px) / 3) + 260px)`,
    },
    '@media screen and (max-width: 800px)': {
        position: 'absolute',
        top: 'calc(50% - 64px)',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
}))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#ffffff",
        color: "#888888",
        paddingLeft: "10px"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        paddingLeft: "10px"
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        //backgroundColor: theme.palette.action.hover,
        backgroundColor: '#F8FDFD'
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function ReportsListTable({ data, handleClick, fontFamily, handleSort, sortDirection }) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                            <StyledTableCell
                                sx={{ wordBreak: 'normal !important', minWidth: '100px !important', fontFamily: fontFamily }}
                            >
                                <TableSortLabel
                                    // active={true}
                                    direction={sortDirection === 'DESC' ? "desc" : "asc"}
                                    onClick={() => handleSort()}
                                    IconComponent={UnfoldMoreIcon}
                                >
                                Report Name
                                </TableSortLabel>
                            </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { data.map((report)=>
                        <StyledTableRow key={report.id}>
                            <StyledTableCell onClick={() => handleClick(report.id)} sx={{ wordBreak: 'normal !important', cursor: 'pointer', minWidth: '100px !important', fontFamily: fontFamily }}>
                                {report.name}
                            </StyledTableCell>
                        </StyledTableRow>
                    )}     
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ReportsListTable;
