import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import CancelIcon from '@mui/icons-material/Cancel'
import Chip from '@mui/material/Chip';
import { styled } from '@mui/system';
import { format } from 'date-fns'
//import { setClientFilterDetails } from 'app/redux/ClientManagement/clientManagementSlice'
import { useDispatch } from 'react-redux'
import { startCase } from 'lodash'
import { convertDate } from 'src/FormElements/app/utilities/DateFormat';
import { setReportFilters } from 'src/FormElements/app/redux/ReportsManagement/reportsManagementSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    listStyle: {
        display: 'flex',
        listStyle: 'none',
        justifyContent: 'flex-end'
    },
    deleteIcon: {
        color: '#51BFB6',
        height: '16px',
    },
}))

const StyledChip = styled(Chip)(({primaryColor}) => ({
    border: `1px solid ${primaryColor} !important`,
    color: primaryColor
}))

function FilterChips({ chipInfo, filtersInfo, primaryColor }) {
    const classes = useStyles();
    const [chipData, setChipData] = useState(chipInfo);
    const [filterData, setFilterData] = useState(filtersInfo);
    const [filterExists, setFilterExists] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = (value) => {
        let data = { ...chipData }
        if (data[value] instanceof Date) {
            data[value] = null
        } else {
            data[value] = ''
        }
        dispatch({ type: setReportFilters.type, payload: data })
        setChipData(data)
    }

    useEffect(() => {
        setChipData(chipInfo);
        setFilterData(filtersInfo);
        let exists = Object.keys(chipInfo).some(function (k) {
            return (
                (chipInfo[k] && chipInfo[k].length > 0) ||
                (chipInfo[k] && typeof chipInfo[k] === 'object')
            )
        })

        setFilterExists(exists);
    }, [chipInfo]);

    const handleClear = () => {
        dispatch({ 
            type: setReportFilters.type, 
            payload: {
                fromDate: null,
                toDate: null,
                sites: null
            }
        }) 
    }

    return (
        <div className={`flex justify-end mt-1 ${classes.listStyle}`}>
            {filterExists && (
                <StyledChip
                    variant="outlined"
                    label="Clear all"
                    onDelete={handleClear}
                    className={classes.chip}
                    deleteIcon={<CancelIcon className={classes.deleteIcon} />}
                    primaryColor={primaryColor}
                />
            )}
            {chipData &&
                Object.keys(chipData).map(
                    (key) =>
                        chipData[key] && (
                            <li key={key}>
                                <StyledChip
                                    variant="outlined"
                                    label={renderName(chipData, key)}
                                    onDelete={() => handleDelete(key)}
                                    className={classes.chip}
                                    deleteIcon={
                                        <CancelIcon
                                            className={classes.deleteIcon}
                                        />
                                    }
                                    primaryColor={primaryColor}
                                />
                            </li>
                        )
                )}
        </div>
    )
}

function renderName(chipData, key) {
    return (
        <span>
            <span style={{ color: '#00000099' }}>{startCase(key)}</span>:
            {
                key === 'fromDate' || key === 'toDate'
                ? convertDate(chipData[key]):
                Array.isArray(chipData[key])? chipData[key].join(","): chipData[key]
            }
        </span>
    )
}

export default FilterChips;
