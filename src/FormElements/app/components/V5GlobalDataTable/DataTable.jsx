import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@mui/styles';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
//import VisibilityIcon from '@material-ui/icons/Visibility';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Icon, IconButton, TableSortLabel, Tooltip, Chip, Button } from '@mui/material';
import { camelCase } from 'lodash';
import { convertDate } from 'src/FormElements/app/utilities/DateFormat';
import { styled } from '@mui/material/styles';
import { capitalizeFirstLetter } from '@app/FormElements/utils';

let StickyTableCell = withStyles((theme) => ({
    head: {
        backgroundColor:"white",
        right: '-1rem',
        position: 'sticky',
        zIndex: 100,
        border: 'none',
        paddingLeft: '5rem',
        paddingRight: '2rem',
        paddingTop: '0px',
        paddingBottom: '1px',
        width: "2rem"
    },
    body: {
        backgroundColor: 'inherit',
        marginRight: 0,
        marginLeft: 0,
        right: '-1rem',
        left: 0,
        position: 'sticky',
        zIndex: 550,
    },
}))(TableCell)

const useStyles = makeStyles((theme) => ({
    chip: {
        backgroundColor: '#FFFFFF',
        marginRight: '3px'
    },
    link: {
        textDecoration: 'underline',
        color: '#51BFB6',
        marginLeft: '5px'
    },
    table: {
        marginTop: '0rem',
        fontSize: '1rem',
        backgroundColor: "white",
        borderRadius: '4px 4px 0px 0px',
        boxShadow: '0 3px 10px rgba(81, 190, 183, 0.3)',
        "& .MuiTableCell-root": {
            padding: "6px 5px 6px 22px" // <-- arbitrary value
        }
    },
    Paper: {
        padding: "0.5rem 0 0.5rem 0.5rem",
        boxShadow: "none",
        backgroundColor: "transparent",
        visibility: "none",
        '&::-webkit-scrollbar': {
            width: 0,
        }

    },
    iconsColor: {
        color: '#9f9f9e',
        display: 'flex',
        alignItems: 'center',
    },
    tableHeader: {
        backgroundColor: 'transparent',
        whiteSpace: 'nowrap',
        padding: '0px !important'
    },
    TableCell: {
        whiteSpace: 'nowrap',
        color: '#00000099',
        fontWeight: 400
    },
    tableRow: {
        borderBottom: "0.5px solid rgba(0, 0, 0, 0.1)",
        borderLeft: "0.5px solid transparent",
        borderRight: "0.5px solid transparent",
        '&:hover': {
            border: "0.5px solid rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            borderRight: "none",
            borderLeft: "none"

        },
        '&:last-child ': {
            borderBottom: "0.5px solid transparent"
        },
        '&:first-child ': {
            borderTop: "0.5px solid transparent"
        }

    },
    paginationCount: {
        marginLeft: 'auto',
        marginRight: '2rem',
        marginTop: '1rem',
    },
    rangeSelector: {
        border: '1px solid gray',
        borderBottom: 'none',
    },
    disabledView: {
        backgroundColor: 'rgba(242, 242, 242, .99) !important',
        //  backgroundColor: '#EDEDF0 !important',
        //  opacity: '.54',
        position:'relative',
        borderBottom: "0.5px solid rgba(0, 0, 0, 0.1)",
        borderLeft: "0.5px solid transparent",
        borderRight: "0.5px solid transparent",
        // borderBottom: "0.5px solid transparent",
        '&:hover': {
            border: "0.5px solid rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            borderRight: "none",
            borderLeft: "none"

        },
        '& .MuiTableCell-body': {
            color: "rgba(0, 0, 0, .3) !important",

        }
    },
    disabledViewIcons: {
        //  backgroundColor: '#EDEDF0 !important',
        backgroundColor: 'rgba(242, 242, 242, .99) !important',
    },
    inActiveBtn: {
        color: '#BF334C !important',
        fontSize: '13px',
        border: '1px solid #C13C54',
        zIndex:'1',
        padding:"0.1rem 0.2rem",
        width: '73px',
        backgroundColor: "#EAD9DD"
    },
    activeBtn: {
        color: '#01A299 !important',
        fontSize: '13px',
        padding:"0.1rem .2rem",
        width: '73px',
        border:'1px solid #01A299',
        backgroundColor: '#E7F7F1'
    },
    draftedBtn: {
        color: '#00000099  !important',
        border: '1px solid #00000099',
        fontSize: '13px',
        padding: '0.1rem .2rem',
        width: '73px'
    },
    iconColumnActive: {
        backgroundColor: '#F4F6FC'
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: '#F5F5F5'
    },
    '&:nth-of-type(odd)': {
        backgroundColor: '#57C2BA0A'
    },
    root: {
        zIndex: theme.zIndex.appBar + 1
    }
}));

function DataTable({
    hasDeleteIcon,
    hasEditIcon,
    hasViewIcon,
    hasInfoIcon,
    tableHeading,
    tableData,
    handleEdit,
    handleDelete,
    handleInfo,
    handleView,
    handleSort,
    columnToSort,
    sortDirection,
    setIsOpen,
    isOpen,
    reference
}) {
    const classes = useStyles();
    const [dotActive, setDotActive] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setDotActive(true);
        } else {
            setDotActive(false);
        }
    }, [isOpen])

    const handlePopup = () => {
        setIsOpen(true);
    }

    return (
        <div>
            <TableContainer className={classes.Paper} component={Paper}>
                <Table
                    className={`${classes.table} w-full`}
                    aria-label="simple table"
                >
                    <TableHead ref={reference} className={classes.tableHeader}>
                        <TableRow>
                            {tableHeading.map((heading) => {
                                return heading.key === 'actionHeader' ? (
                                    <StickyTableCell className={classes.head} style={{ padding: "0px !important" }}>
                                        <TableCell
                                            key={heading.key}
                                            className="font-semibold pl-5 border-none pt-0 pb-0"
                                        >
                                            <IconButton style={{ marginLeft: '55px' }} onClick={handlePopup}>
                                                <Icon className={dotActive ? "color-primary" : ""}>{heading.icon}</Icon>
                                            </IconButton>
                                        </TableCell>
                                    </StickyTableCell>
                                ) : (

                                    <TableCell
                                        key={heading.key}
                                        className={`font-semibold text-14 border-none cursor-pointer ${classes.TableCell}`}
                                    >
                                            {heading.name === "Resource Count" || heading.name === "Store Count" || heading.name === "Gender" || heading.name === "Age (Yrs)" || heading.name === "Contact Number" || heading.name === "Mapped Store" ? heading.name : <TableSortLabel
                                            active={columnToSort === heading && heading.name? heading.name.toUpperCase().split(" ").join("_"): ''}
                                            direction={sortDirection === 'DESC' ? "desc" : "asc"}
                                                onClick={() => handleSort(heading.name)
                                                }
                                                IconComponent={UnfoldMoreIcon}
                                        >
                                            {heading.name}
                                            {columnToSort === heading.name.toUpperCase().split(" ").join("_") ? (
                                                <Box component="span" className="hidden">
                                                    {sortDirection === 'DESC' ? 'sorted descending' : 'sorted ascending'}
                                                </Box>
                                            ) : null}
                                        </TableSortLabel>}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData &&
                            tableData.map((userProp, index) => (

                                <StyledTableRow
                                    key={index}
                                    className={
                                        `
                                        ${tableData[index].status ===
                                            'INACTIVE' ||
                                            tableData[index].status === 'DRAFT'
                                            ? classes.disabledView
                                            : classes.tableRow} ${tableData[index].status ===
                                                'INACTIVE' ? 'color-primary' : ''}`
                                    }
                                >

                                    {tableHeading.map((el, index) => {

                                        return (
                                            <>
                                                {index === tableHeading.length - 1
                                                    ? (
                                                        <StickyTableCell
                                                            className={`${userProp.status === 'INACTIVE' ? classes.disabledViewIcons : ''} border-none p-0`}
                                                        >
                                                            <TableCell className="border-none">
                                                                <TableCell className="p-0 border-none">
                                                                    <div
                                                                        className={
                                                                            classes.iconsColor
                                                                        }
                                                                    >
                                                                        {hasDeleteIcon ? (
                                                                            <DeleteIcon
                                                                                className={`m-2 cursor-pointer `}
                                                                                onClick={() =>
                                                                                    handleDelete(
                                                                                        userProp
                                                                                    )
                                                                                }
                                                                            />
                                                                        ) : null}
                                                                        {hasEditIcon ? (
                                                                            <EditIcon
                                                                                className={`m-2 cursor-pointer `}
                                                                                onClick={() =>
                                                                                    handleEdit(
                                                                                        userProp
                                                                                    )
                                                                                }
                                                                            />
                                                                        ) : null}
                                                                        {/* {hasViewIcon ? (
                                                                            <VisibilityIcon
                                                                                className={`m-2 cursor-pointer ${userProp.status === 'INACTIVE' ? 'in-active' : ''}`}
                                                                                onClick={() =>
                                                                                    handleView(
                                                                                        userProp
                                                                                    )
                                                                                }
                                                                            />
                                                                        ) : null} */}
                                                                        {hasInfoIcon ? (
                                                                            <InfoOutlinedIcon
                                                                                className={`m-2 cursor-pointer`}
                                                                                onClick={() =>
                                                                                    handleInfo(
                                                                                        userProp
                                                                                    )
                                                                                }
                                                                            />
                                                                        ) : null}
                                                                    </div>
                                                                </TableCell>
                                                            </TableCell>
                                                        </StickyTableCell>
                                                    ) :
                                                    (
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                            
                                                            className={`${el.key === 'status' && `${classes[camelCase(userProp[el.key])]}`} border-none font-normal ${classes.TableCell} ${classes.body} ${typeof userProp[el.key] === "number" && el.key !== "users" ? "text-right" : el.key === "users" ? "text-right pr-8 w-0" : ''} ${el.key === "contactNumber" ? "text-right" : ''}`}
                                                            onClick={() =>
                                                                handleView(
                                                                    userProp
                                                                )
                                                            }
                                                        >
                                                            {userProp[el.key] === "" || (userProp[el.key] === null && el.key !== 'mappedStores' && el.key !== 'modules' ? "-" : "")}
                                                            {userProp[el.key] && userProp[el.key].length > 10 && el.key !== 'createdAt' ?
                                                                <Tooltip title={userProp[el.key]} arrow>
                                                                    <div>
                                                                        {userProp[el.key] && capitalizeFirstLetter(userProp[el.key]).slice(0, 10) + " ..."}
                                                                    </div>
                                                                </Tooltip>

                                                                : userProp[el.key] && el.key === "clientId" ? userProp[el.key].toUpperCase() : userProp[el.key] && el.key === "status" ?
                                                                    <Button
                                                                        variant="outlined"
                                                                        className={`${userProp[el.key].toLowerCase() === "active" ?
                                                                            classes.activeBtn : userProp[el.key].toLowerCase() === "inactive" ?
                                                                                classes.inActiveBtn : classes.draftedBtn}`}>{userProp[el.key].toUpperCase()}</Button>
                                                                    :
                                                                    el.key !== 'createdAt'
                                                                        ? el.key === 'mappedStores' || el.key === 'modules' ?
                                                                        renderChipsView(userProp, el.key, classes, handleEdit)
                                                                            : typeof userProp[el.key] === 'number' ? userProp[el.key] : capitalizeFirstLetter(userProp[el.key])
                                                                        : convertDate(userProp[el.key])}

                                                        </TableCell>
                                                    )
                                                }
                                            </>
                                        )
                                    })}
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

const renderChipsView = (data, key, classes, handleEdit) => {
    return <> 
        {
            data[key] && data[key].slice(0, 2).map((chipValue)=>(
                <Chip
                    variant="outlined"
                    label={chipValue}
                    className={classes.chip}
                />
            ))
        }
        {data[key] && data[key].length > 2 && 
                <Chip
                    variant="outlined"
                    label={`+${data[key].length-2}`}
                    className={classes.chip}
                />
        }
        {(data[key] === null || data[key].length === 0) && 
            <p onClick={()=>handleEdit(data)} className={`${classes.link} cursor-pointer`}>
                ASSIGN
            </p>
        }
    </>
}

export default DataTable;
