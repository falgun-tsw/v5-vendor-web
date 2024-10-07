import React, { useState, useEffect } from 'react'
import { Grid, Icon, Tooltip } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { getRandomColor } from '@app/FormElements/utils'
import { useHistory, useParams } from 'react-router-dom'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    card1: {
        minHeight: `calc(100% - 2%)`,
        maxHeight: `calc(100% - 2%)`,
        background: '#FFFFFF ',
        borderRadius: '16px',
        opacity: 1,
        // marginLeft: '1.2rem',
        padding: '8px',
        border: "1px solid black",
        textAlign: 'center',
        '& svg': {
            fontSize: '40px',
            fill: 'blue',
        },
        // position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: "pointer",
        // margin: "0 0.3rem"
        // margin:"0 2rem"
    },
    cardInText: {
        fontSize: '12px',
        marginTop: '1.5rem',
        fontWeight: 'normal',
        lineHeight: '20px',
    },
    lightText: {
        color: '#00000099',
        fontSize: '24px',
    },

    subModule: {
        fontWeight: 'normal',
        textAlign: 'cenetr',
        fontSize: '10px',
        color: '#B3B3B3',
    },
    icon: {
        color: "#fff",
        borderRadius: "100px",
        width: "35px",
        height: "35px",
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        position: "relative",
        top: "1rem"
    }
}))



const ModuleCard = ({ module, key, handleCardAction, modulePage }) => {
    const classes = useStyles()
    const { name, subModulesCount, iconId, id, icon, moduleColor, type } = module;
    const randomColor = getRandomColor();
    const [chartIconName, setChartIconName] = useState("");
    const [widthMeasure, setWidthMeasure] = useState("2px");
    const getSubModuleList = (id, name) => {
        if (type) {
            handleCardAction(id, "Charts")
        } else {
            handleCardAction(id, name)
        }
    }
    useEffect(() => {
        if (type === "BAR_CHART") {
            setChartIconName("bar_chart");
        } else if (type === "LINE_CHART") {
            setChartIconName("stacked_line_chart");
        } else {
            setChartIconName("pie_chart");
        }
    }, []);
    useEffect(() => {
        if (modulePage === "dashboard") {
            setWidthMeasure("2px");
        } else {
            setWidthMeasure("15%");
        }
    }, [modulePage]);

    return (
        <div className={classes.card1} style={{
            border: `1px solid ${moduleColor ? moduleColor : randomColor}`,
            boxShadow: `0px 0.5px 1px 0.5px ${moduleColor ? moduleColor : randomColor}`,
            width: `calc(100% - ${widthMeasure})`,
        }}
            onClick={() => getSubModuleList(id, name)}>
            {type ? <Icon className={classes.icon} style={{ backgroundColor: `${moduleColor ? moduleColor : randomColor}` }}>{chartIconName}</Icon>
                : name === "Reports" ? <Icon className={classes.icon} style={{ backgroundColor: `${moduleColor ? moduleColor : randomColor}` }}>{"table_chart"}</Icon> : <Icon className={classes.icon} style={{ backgroundColor: `${moduleColor ? moduleColor : randomColor}` }}>{iconId ? iconId : "adjust"}</Icon>}

            <Tooltip title={name} arrow>
                <h4 className={classes.cardInText}>{name.length > 9 ? name.slice(0, 10) + " ..." : name}</h4>
            </Tooltip>
        </div>
        // < div className={classes.card1}
        //     style={{
        //         border: `1px solid ${randomColor}`,
        //         boxShadow: `0px 0.5px 1px 0.5px ${randomColor}`
        //     }}
        //     onClick={() => getSubModuleList(id)}>

        //     <Icon
        //         className={classes.iconStyle}
        //         style={{ backgroundColor: `${randomColor}` }}
        //     >
        //         {module.iconId}
        //     </Icon>
        //     <h4 className={classes.cardInText}>{module.name}</h4>
        //     {/* <div className={`${classes.lightText} font-bold`}>
        //             {subModulesCount}
        //         </div>
        //         <div className={classes.subModule}>Sub-Modules</div> */}
        // </div >


    )
}

export default React.memo(ModuleCard)
