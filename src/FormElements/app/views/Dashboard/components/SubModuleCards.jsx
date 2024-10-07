import { Grid, Icon } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ModuleCard from './ModuleCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import useAuth from 'src/FormElements/app/hooks/useAuth';
import { setInitialState } from 'src/FormElements/app/redux/Dashboard/dashboardSlice';
import useSettings from 'src/FormElements/app/hooks/useSettings';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    modulesCard: {
        borderRadius: '10px',
        width: `calc(100% - 2px)`,
        minHeight: `calc(100% - 2%)`,
        maxHeight: `calc(100% - 2%)`,
        marginLeft: "0.5rem",
        padding: "0.5rem",
        height: "100vh"
        // minHeight: '7rem',
    },
    submoduleContainer: {
        // marginLeft: "-0.6rem",
    },
    headerHeading: {
        color: "#1D3D4A"
    },
    topHeadingContainer: {
        borderRadius: "10px",
        marginLeft: "1rem",
        marginRight: "0.8rem",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    mobileBackIconPosition: {
        position: "relative",
        top: "-3.2rem"
    }
}))

function SubModuleCards() {
    const { modules, charts } = useSelector(
        (state) => state.dashboard
    );
    const { settings } = useSettings();
    const primaryColor = settings.layout1Settings.main.primaryColor
    const { moduleList } = useSelector((state) => state.screenBuilder.modules);
    const dispatch = useDispatch();
    const { user } = useAuth();
    const history = useHistory();
    const classes = useStyles();
    const { id, name } = useParams();
    const filteredModule = moduleList.find((el) => el.id === id);
    const isMobile = localStorage.getItem("isMobile");

    useEffect(() => {
        dispatch({
            type: setInitialState.type
        });
        dispatch({
            type: 'getDashboardDataAction',
        });
    }, []);

    useEffect(() => {
        if (name !== "Charts") {
            dispatch({
                type: 'getSubModulesAction',
                moduleId: id
            })
        }
    }, [id]);

    const handleBack = () => {
        history('/dashboard');
    }
    const handleCardAction = (subModuleId, name) => {
        if (name === "Charts") {
            history(`/Charts/${subModuleId}`);
        } else if (name === "Reports") {
            history(`/modules/${filteredModule?.id}/reports`);
        } else {
            dispatch({
                type: 'getAllModulesAction',
                payload: { clientId: user.clientSystemId }
            });
            let filteredModule = moduleList.filter((el) => {
                return el.id === id
            });
            let filteredSubModule = filteredModule[0]?.subModules.filter((el) => el.id === subModuleId)
            if (filteredSubModule[0]?.mappedBy) {
                history(`/module-management/modules/${filteredModule[0]?.id}/submodules/${subModuleId}/wid/${filteredSubModule[0]?.workFlowId}/mappedBy/${filteredSubModule[0]?.mappedBy}`)
            } else {
                history(`/module-management/modules/${filteredModule[0]?.id}/submodules/${subModuleId}/wid/${filteredSubModule[0]?.workFlowId}`)
            }
        }
    }
    return (
        <div>
            <div>
                <Icon className={`ml-5 mb-8 cursor-pointer mt-4 ${isMobile === "true" && classes.mobileBackIconPosition}`} onClick={handleBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#000000">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
                    </svg>
                </Icon>
            </div>
            <div style={{ border: `1px solid ${primaryColor}`, marginTop: `${isMobile === 'true' ? '-2.3rem' : '0.25rem'}` }} className={`flex justify-between pt-1 pb-1 ${classes.topHeadingContainer}`}>
                {/* <ArrowBackIcon className="cursor-pointer" onClick={handleBack} /> */}
                <h3 className={`ml-4 mt-1 font-medium ${classes.headerHeading}`}>{name}</h3>
            </div>
            <div className={`${classes.modulesCard} mt-4`}>
                <Grid container className={classes.submoduleContainer}>
                    {name === "Charts" ? charts.map((chart, i) => (
                        <Grid className="mt-2" xs={4}>
                            <ModuleCard modulePage={"subModule"} module={chart} key={i} handleCardAction={handleCardAction} />
                        </Grid>
                    )) :
                        filteredModule?.subModules.map((submodule, i) => (
                            <Grid className="mt-2" xs={4}>
                                <ModuleCard modulePage={"subModule"} module={submodule} key={i} handleCardAction={handleCardAction} />
                            </Grid>
                        ))}
                </Grid>
            </div>
        </div>
    )
}

export default SubModuleCards;