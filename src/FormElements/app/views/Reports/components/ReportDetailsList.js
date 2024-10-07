import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Grid, Button, ClickAwayListener, alertTitleClasses, IconButton } from '@mui/material';
import DataTable from 'src/FormElements/app/components/V5GlobalDataTable/DataTable';
import DataTable1 from 'src/FormElements/app/components/V5GlobalDataTable/DataTable1';
import PopoverMenu from 'src/FormElements/app/components/PopoverMenu/PopoverMenu';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { V5GlobalHeaderActionList, V5GlobalIconButtons } from 'src/FormElements/app/components'
import { styled } from '@mui/system';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    arrowIcon: {
        color: "#bbb",
        fontSize: "1.3rem"
    },
    boxStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        border: 'none !important',
        borderRadius: "2px",
        width: '360px'
    },
    tablePopupContainer: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        marginTop: '0.3rem',
    },
    popOverMenu: {
        boxShadow: "-1px 10px 20px lightgrey",
        width: "200px",
        overflowY: "scroll",
        maxHeight: "23rem",
        marginTop: "-0.5rem",
        zIndex: "10000",
        display: "flex",
        flexDirection: "column",
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
    }
}));

const OutlinedButton = styled(Button)(({primaryColor, isAllCoumnsSelected }) => ({
    backgroundColor: `rgba(${primaryColor}, .2)`,
    color: isAllCoumnsSelected? primaryColor: 'rgba(0, 0, 0, 0.6)',
    border: isAllCoumnsSelected? `1px solid ${primaryColor}`: '1px solid rgba(0, 0, 0, 0.6)'
}))

function ReportDetailsList(props) {
    const {
        allFormsData,
        formattedColumns,
        formattedRows,
        handleFilterClick,
        isFilterPopupOpen,
        selectedModuleName,
        handleView,
        handleIconClick,
        fetchData,
        primaryColor
    } = props;
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const anchorRef = useRef(null);
    const { moduleFilterDetails, moduleChipsFilterDetails, workflowData } = useSelector((state) => state.screenBuilder.modules);
    const [isAllCoumnsSelected, setIsAllCoumnsSelected] = useState(false);
    const [checkedValues, setCheckedValues] = useState(['actionHeader']);
    const [filteredTableHeading, setFilteredTableHeading] = useState([]);

    function selectColumn(key) {
        if (checkedValues && checkedValues.length > 0) {
            if (key !== "all") {
                setCheckedValues(
                    checkedValues.includes(key)
                        ? checkedValues.filter((c) => {
                            if (key === "subModules") {
                                return c !== key && c !== "drop"
                            } else {
                                return c !== key
                            }

                        })
                        : key === "subModules" ? [...checkedValues, key, "drop", "name"] : [...checkedValues, key]
                );
                const cv = checkedValues.includes(key)
                    ? checkedValues.filter((c) => c !== key)
                    : [...checkedValues, key];
                let all = true;
                formattedColumns.forEach((el) => {
                    if (!cv.includes(el.id)) {
                        all = false;
                    }

                });
                setIsAllCoumnsSelected(all);
            } else {
                let cv = [];
                formattedColumns.forEach((el) => {
                    cv.push(el.id);
                });
                setCheckedValues(cv);
                setIsAllCoumnsSelected(true);
            }
        }
    }
    useEffect(() => {
        if (formattedColumns && formattedColumns.length) {
            const filterHeading = formattedColumns.filter((el) =>
                checkedValues.includes(el.id)
            );
            setFilteredTableHeading(filterHeading);
        }
    }, [checkedValues]);

    return (
        <div>
            <Grid
                sx={{ maxWidth: '100%', overflowX: 'scroll', mt: 2}}
                spacing={3}
                direction="column">
                <Grid item>
                    <DataTable1
                        allFormsData={allFormsData}
                        formattedColumns={filteredTableHeading.length > 1 ? filteredTableHeading : formattedColumns}
                        formattedRows={formattedRows}
                        reference={anchorRef}
                        setIsOpen={setIsOpen}
                        isOpen={isOpen}
                        workflowData={workflowData}
                        handleView={handleView}
                        handleIconClick={handleIconClick}
                        fetchData={fetchData}
                    />
                </Grid>
            </Grid>
            <PopoverMenu
                width={200}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                anchorEl={anchorRef.current}
            >
                <ClickAwayListener onClickAway={() => setIsOpen(false)}>
                    {/* Keep your code here */}
                    <div
                        style={{
                            paddingTop: "1rem",
                            paddingBottom: "1rem"
                        }}
                        className={`${classes.popOverMenu}`}>
                        <div key={"all_0"} className={classes.tablePopupContainer}  >
                            <OutlinedButton 
                                onClick={() => selectColumn("all")}
                                style={{ 
                                    justifyContent: "left",
                                }}
                                className={`w-full mt-2 pl-3 pr-3 ml-5 mr-5`}
                                isAllCoumnsSelected={isAllCoumnsSelected}
                                variant="outlined"
                                primaryColor={primaryColor}
                            >
                                {"Select All"}
                            </OutlinedButton>
                        </div>
                        {formattedColumns && formattedColumns.map((el, index) => {
                            return el.id !== "actionHeader" &&
                                (
                                    <div key={index} className={classes.tablePopupContainer}>
                                        {el.icon ? null :
                                            <OutlinedButton
                                                onClick={() => selectColumn(el.id)}
                                                style={{ justifyContent: "left" }}
                                                className={`w-full mt-2 pl-3 pr-3 ml-5 mr-5`}
                                                isAllCoumnsSelected={checkedValues.includes(el.id)}
                                                primaryColor={primaryColor}
                                            >
                                                {el.label && el.label.length > 14 ? el.label.slice(0, 14) + "..." : el.label}
                                            </OutlinedButton>
                                        }
                                    </div>
                                )
                        })}
                    </div>
                </ClickAwayListener>
            </PopoverMenu>
        </div>
    )
}

export default ReportDetailsList;