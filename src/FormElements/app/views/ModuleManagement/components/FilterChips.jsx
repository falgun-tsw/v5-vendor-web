import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import CancelIcon from '@mui/icons-material/Cancel'
import Chip from '@mui/material/Chip';
import { styled } from '@mui/system';
//import { setClientFilterDetails } from 'app/redux/ClientManagement/clientManagementSlice'
import { useDispatch, useSelector } from 'react-redux'
import { startCase } from 'lodash'
import { convertDate } from 'src/FormElements/app/utilities/DateFormat';
import { setModuleFilterDetails, setStateByName, setFiltersData, clearFilter } from 'src/FormElements/app/redux/ModuleManagement/moduleManagementSlice';
import { capitalizeFirstLetter } from '@app/FormElements/utils';

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
    const { empRole } = useSelector((state) => state.screenBuilder.modules);
    const [roleKey, setRoleKey] = useState("");
    const dispatch = useDispatch();

    const handleDelete = (value) => {
        let data = { ...chipData }
        if (data[value] instanceof Date) {
            data[value] = null
        } else {
            data[value] = ''
        }
        dispatch({
            type: setStateByName.type, payload: {
                name: 'moduleChipsFilterDetails', value: data
            }
        });
        dispatch({ type: setFiltersData.type, payload: data })
        setChipData(data)
    }

    useEffect(() => {
        setChipData(chipInfo);
        let role = empRole?.filter((el) => el.id === chipInfo);
        setFilterData(filtersInfo);
        let exists = Object.keys(chipInfo).some(function (k) {
            return (
                (chipInfo[k] && chipInfo[k].length > 0) ||
                (chipInfo[k] && typeof chipInfo[k] === 'object')
            )
        })

        setFilterExists(exists);
    }, [chipInfo, empRole]);

    const handleClear = () => {
        dispatch({ type: clearFilter.type })
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
                                    label={renderName(empRole, chipData, key)}
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

function renderName(empRole, chipData, key) {
    let roleValue = empRole.filter((el) => JSON.stringify(el.id) === JSON.stringify(chipData[key]))
    let label = "";
    if (key === "static_employeeId") {
        label = "Emp ID"
    } else if (key === "static_userName") {
        label = "Emp Name"
    } else if (key === "static_role") {
        label = "Emp Role"
    }
    return (
        <span>
            <span style={{ color: '#00000099' }}>{label ? label : capitalizeFirstLetter(key)}</span>:
            {/* {key === 'from' || key === 'to'
                ? convertDate(chipData[key])
                : chipData[key]} */}
            {key === "static_role" ? roleValue[0]?.name : chipData[key]}
        </span>
    )
}

export default FilterChips
