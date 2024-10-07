import React, { useState } from 'react';
import PropTypes from "prop-types";
import { IconButton, Tooltip, Icon } from '@mui/material';
import { makeStyles } from '@mui/styles'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
//import PersonAddIcon from '@material-ui/icons/PersonAdd';
//import GroupAddIcon from '@material-ui/icons/GroupAdd';
function V5GlobalIconButtons(props) {
    const {
        iconType,
        tooltipTitle,
        areaLabel,
        iconComponent,
        iconClickHandler,
        filterPopupOpen,
        reference,
        length,
        isDisabled,
        color
    } = props;
    const useStyles = makeStyles(() => ({
        svgIcons: {
            filter: "invert(0.2)",
            '&:hover': {
                filter: "invert(0)",
                '&>*': {
                    opacity: 1,
                },
                '& > *': {
                    opacity: 1,
                },
            }
        },
        svgIcons1: {
            opacity: 0.5,
            '&:hover': {
                opacity: 1,
                color: "black"
            }
        },
        svgIcons2: {
            color: "#50BFB7"
        }
    }))
    const classes = useStyles();
    const [hovered, setHovered] = useState(false);
    return (
        <>
            {(() => {
                switch (iconType) {
                    case 'GroupAddIcon':
                        return (
                            <Tooltip title={tooltipTitle}>
                                <IconButton
                                    className={`material-icons-two-tone`}
                                    aria-label={areaLabel}
                                    component={iconComponent}
                                    onClick={iconClickHandler}
                                    onMouseEnter={() => setHovered(true)}
                                    onMouseLeave={() => setHovered(false)}
                                >
                                    <Icon className="material-icons-two-tone">
                                        <svg className={classes.svgIcons} id="Component_146_27" data-name="Component 146 – 27" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <rect id="Rectangle_2274" data-name="Rectangle 2274" width="24" height="24" fill="none" />
                                            <g id="group_add_black_24dp" transform="translate(2 2)">
                                                <g id="Group_6486" data-name="Group 6486">
                                                    <rect id="Rectangle_2492" data-name="Rectangle 2492" width="20" height="20" fill="none" />
                                                    <rect id="Rectangle_2493" data-name="Rectangle 2493" width="20" height="20" fill="none" />
                                                </g>
                                                <g id="Group_6488" data-name="Group 6488" transform="translate(0 3.333)">
                                                    <g id="Group_6487" data-name="Group 6487">
                                                        <path id="Path_5536" data-name="Path 5536" d="M7,15c-2.25,0-4.833,1.075-5,1.675V17.5H12v-.833C11.833,16.075,9.25,15,7,15Z" transform="translate(-0.333 -5.833)" opacity={`${hovered ? '1' : '0.38'}`} />
                                                        <circle id="Ellipse_360" data-name="Ellipse 360" cx="1.667" cy="1.667" r="1.667" transform="translate(5 1.667)" opacity={`${hovered ? '1' : '0.38'}`} />
                                                        <path id="Path_5537" data-name="Path 5537" d="M21.333,8.667V7H19.667V8.667H18v1.667h1.667V12h1.667V10.333H23V8.667Z" transform="translate(-3 -4.5)" opacity={`${hovered ? '1' : '0.5'}`} />
                                                        <path id="Path_5538" data-name="Path 5538" d="M7.333,10.667A3.333,3.333,0,1,0,4,7.333,3.332,3.332,0,0,0,7.333,10.667Zm0-5A1.667,1.667,0,1,1,5.667,7.333,1.672,1.672,0,0,1,7.333,5.667Z" transform="translate(-0.667 -4)" opacity={`${hovered ? '1' : '0.5'}`} />
                                                        <path id="Path_5539" data-name="Path 5539" d="M6.667,13C4.442,13,0,14.117,0,16.333v2.5H13.333v-2.5C13.333,14.117,8.892,13,6.667,13Zm5,4.167h-10v-.825c.167-.6,2.75-1.675,5-1.675s4.833,1.075,5,1.667Z" transform="translate(0 -5.5)" opacity={`${hovered ? '1' : '0.5'}`} />
                                                        <path id="Path_5540" data-name="Path 5540" d="M12.51,4.05a4.984,4.984,0,0,1,0,6.583,3.317,3.317,0,0,0,0-6.583Z" transform="translate(-2.085 -4.008)" opacity={`${hovered ? '1' : '0.5'}`} />
                                                        <path id="Path_5541" data-name="Path 5541" d="M16.53,13.83a3.531,3.531,0,0,1,1.225,2.642v2.5h1.667v-2.5C19.422,15.263,18.1,14.38,16.53,13.83Z" transform="translate(-2.755 -5.638)" opacity={`${hovered ? '1' : '0.5'}`} />
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </Icon>
                                </IconButton>
                            </Tooltip>
                        );
                    case 'PersonAddIcon':
                        return (
                            <Tooltip title={tooltipTitle}>

                                <IconButton
                                    aria-label={areaLabel}
                                    component={iconComponent}
                                    onClick={iconClickHandler}
                                    className={`material-icons-two-tone`}
                                    onMouseEnter={() => setHovered(true)}
                                    onMouseLeave={() => setHovered(false)}
                                >
                                    <Icon className="material-icons-two-tone">
                                        <svg className={classes.svgIcons} id="Component_146_24" data-name="Component 146 – 23" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <rect id="Rectangle_2274" data-name="Rectangle 2274" width="24" height="24" fill="none" />
                                            <g id="Group_5874" data-name="Group 5874" transform="translate(-1139 -79.019)">
                                                <path id="Icon_22333" data-name="Icon 22333" d="M15.392,10.892V8.455h1.625v2.437h2.437v1.625H17.017v2.437H15.392V12.517H12.955V10.892Z" transform="translate(1140.546 75.565)" opacity={`${hovered ? '1' : '0.38'}`} />
                                                <g id="MDI_account-tie" data-name="MDI / account-tie" transform="translate(1139 82.02)" opacity={`${hovered ? '1' : '0.38'}`}>
                                                    <g id="Path_account-tie" data-name="Path / account-tie" transform="translate(-0.667 -0.5)" fill="none">
                                                        <path d="M10.667,3A3.333,3.333,0,1,1,7.333,6.333,3.332,3.332,0,0,1,10.667,3M14,11.783a9.493,9.493,0,0,1-1.825,5.242L11.5,13l.783-1.567a14.392,14.392,0,0,0-1.617-.1,14.392,14.392,0,0,0-1.617.1L9.833,13l-.675,4.025a9.493,9.493,0,0,1-1.825-5.242C5.342,12.367,4,13.417,4,14.667V18H17.333V14.667C17.333,13.417,16,12.367,14,11.783Z" stroke="none" />
                                                        <path d="M 10.66666507720947 4.5 C 9.655765533447266 4.5 8.833334922790527 5.322429656982422 8.833334922790527 6.333330154418945 C 8.833334922790527 7.344240188598633 9.655765533447266 8.166669845581055 10.66666507720947 8.166669845581055 C 11.67756462097168 8.166669845581055 12.49999523162842 7.344240188598633 12.49999523162842 6.333330154418945 C 12.49999523162842 5.322429656982422 11.67756462097168 4.5 10.66666507720947 4.5 M 15.21561813354492 13.94730949401855 C 15.03050422668457 14.69510078430176 14.72915172576904 15.5650691986084 14.24192905426025 16.5 L 15.83332443237305 16.5 L 15.83332443237305 14.66666984558105 C 15.83332443237305 14.49882888793945 15.63263320922852 14.22984886169434 15.21561813354492 13.94730949401855 M 6.117988586425781 13.94842147827148 C 5.700770378112793 14.23095703125 5.499995231628418 14.49943542480469 5.499995231628418 14.66666984558105 L 5.499995231628418 16.5 L 7.09140682220459 16.5 C 6.604429244995117 15.56554412841797 6.303127288818359 14.69595718383789 6.117988586425781 13.94842147827148 M 10.66666507720947 3 C 12.50833511352539 3 13.99999523162842 4.491670608520508 13.99999523162842 6.333330154418945 C 13.99999523162842 8.175000190734863 12.50833511352539 9.666669845581055 10.66666507720947 9.666669845581055 C 8.824995040893555 9.666669845581055 7.333334922790527 8.175000190734863 7.333334922790527 6.333330154418945 C 7.333334922790527 4.491670608520508 8.824995040893555 3 10.66666507720947 3 Z M 10.66666507720947 11.33333015441895 C 11.22500514984131 11.33333015441895 11.7666654586792 11.375 12.28333473205566 11.43332958221436 L 11.49999523162842 13 L 12.17500495910645 17.02499961853027 C 13.76666450500488 14.72500038146973 13.99999523162842 12.66666984558105 13.99999523162842 11.78332996368408 C 15.99999523162842 12.36666965484619 17.33332443237305 13.41666984558105 17.33332443237305 14.66666984558105 L 17.33332443237305 18 L 3.999994277954102 18 L 3.999994277954102 14.66666984558105 C 3.999994277954102 13.41666984558105 5.341665267944336 12.36666965484619 7.333334922790527 11.78332996368408 C 7.333334922790527 12.66666984558105 7.566664695739746 14.72500038146973 9.158334732055664 17.02499961853027 L 9.833334922790527 13 L 9.050004959106445 11.43332958221436 C 9.566664695739746 11.375 10.10833549499512 11.33333015441895 10.66666507720947 11.33333015441895 Z" stroke="none" opacity="1" fill="#000" />
                                                    </g>
                                                    <path id="Path_account-tie-2" data-name="Path / account-tie" d="M10.667,3A3.333,3.333,0,1,1,7.333,6.333,3.332,3.332,0,0,1,10.667,3M14,11.783a9.493,9.493,0,0,1-1.825,5.242L11.5,13l.783-1.567a14.392,14.392,0,0,0-1.617-.1,14.392,14.392,0,0,0-1.617.1L9.833,13l-.675,4.025a9.493,9.493,0,0,1-1.825-5.242C5.342,12.367,4,13.417,4,14.667V18H17.333V14.667C17.333,13.417,16,12.367,14,11.783Z" transform="translate(-0.667 -0.5)" opacity="0.3" />
                                                </g>
                                            </g>
                                        </svg>
                                    </Icon>

                                    {/* <img className={classes.addPerson} src={`/assets/images/icons/add_person.svg`} alt={"addPerson"} /> */}

                                </IconButton>
                            </Tooltip>
                        );
                    case 'AddModule':
                        return (
                            <Tooltip title={<span className="text-13" >{tooltipTitle}</span>}>
                                <IconButton
                                    aria-label={areaLabel}
                                    component={iconComponent}
                                    onClick={iconClickHandler}
                                >
                                    <Icon className="material-icons-two-tone">
                                        <svg className={classes.svgIcons} id="Component_146_16" data-name="Component 146 – 16" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <g id="Group_5872" data-name="Group 5872">
                                                <rect id="Rectangle_2274" data-name="Rectangle 2274" width="24" height="24" fill="none" />
                                            </g>
                                            <path id="Icon_simple-addthis" data-name="Icon simple-addthis" d="M12,9.062H9v3H7v-3H4v-2H7v-3H9v3h3Zm2-9H2a2.006,2.006,0,0,0-2,2v12a2.006,2.006,0,0,0,2,2H14a2.007,2.007,0,0,0,2-2v-12a2.007,2.007,0,0,0-2-2Z" transform="translate(4 3.938)" opacity="0.38" />
                                        </svg>
                                    </Icon>
                                </IconButton>
                            </Tooltip>
                        );
                    case 'SaveAltIcon':
                        return (
                            <Tooltip title={tooltipTitle}>
                                <IconButton
                                    aria-label={areaLabel}
                                    component={iconComponent}
                                    onClick={iconClickHandler}

                                >
                                    <Icon className="material-icons-two-tone">
                                        <svg className={classes.svgIcons} id="upload_file_black_36dp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <rect id="Rectangle_2274" data-name="Rectangle 2274" width="24" height="24" fill="none" />
                                            <g id="upload_file_black_24dp" transform="translate(2 2)" opacity="0.38">
                                                <g id="Group_6476" data-name="Group 6476">
                                                    <rect id="Rectangle_2490" data-name="Rectangle 2490" width="20" height="20" fill="none" />
                                                </g>
                                                <g id="Group_6478" data-name="Group 6478" transform="translate(3.333 1.667)">
                                                    <g id="Group_6477" data-name="Group 6477">
                                                        <path id="Path_5529" data-name="Path 5529" d="M11.833,4H6V17.333H16V8.167H11.833Z" transform="translate(-4.333 -2.333)" opacity="0.3" />
                                                        <path id="Path_5530" data-name="Path 5530" d="M12.333,2H5.667A1.664,1.664,0,0,0,4.008,3.667L4,17a1.664,1.664,0,0,0,1.658,1.667H15.667A1.672,1.672,0,0,0,17.333,17V7Zm3.333,15h-10V3.667H11.5V7.833h4.167Z" transform="translate(-4 -2)" />
                                                        <path id="Path_5531" data-name="Path 5531" d="M8,14.333h2.5V11h1.667v3.333h2.5l-3.325,3.333Z" transform="translate(-4.667 -3.5)" />
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>

                                    </Icon>
                                </IconButton>
                            </Tooltip>
                        );
                    case 'download':
                        return (
                            <Tooltip title={<span className="text-13" >{tooltipTitle}</span>}>
                                <IconButton
                                    aria-label={areaLabel}
                                    component={iconComponent}
                                    onClick={iconClickHandler}
                                    disabled={isDisabled}
                                >
                                    <Icon className={`material-icons`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={color ? color : "#000"}>
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                                        </svg>
                                        {/* <svg className={classes.svgIcons2} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={color ? color : ""}>
                                            <g id="filter_alt_black_24dp">
                                                <g id="Group_6475" data-name="Group 6475">
                                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                                    <path d="M13 9V5h-2v6H9.83L12 13.17 14.17 11H13z" opacity=".3" />
                                                    <path d="M15 9V3H9v6H5l7 7 7-7h-4zm-3 4.17L9.83 11H11V5h2v6h1.17L12 13.17zM5 18h14v2H5z" />
                                                </g>

                                            </g>

                                        </svg> */}
                                    </Icon>
                                </IconButton>
                            </Tooltip>
                        );
                    case 'Filter':
                        return (
                            <Tooltip title={<span className="text-13" >{tooltipTitle}</span>}>
                                <IconButton
                                    aria-label={areaLabel}
                                    component={iconComponent}
                                    onClick={iconClickHandler}
                                    ref={reference}

                                >
                                    {

                                        <Icon className={`material-icons`} >
                                            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill={color ? color : "#000"}>
                                                <g>
                                                    <path d="M0,0h24 M24,24H0" fill="none" />
                                                    <path d="M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6c0,0,3.72-4.8,5.74-7.39 C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z" />
                                                    <path d="M0,0h24v24H0V0z" fill="none" />
                                                    </g>
                                                </svg>

                                        </Icon> 
                                    }
                                </IconButton>
                            </Tooltip>
                        );
                    case 'add_box':
                        return (
                            <Tooltip title={<span className="text-13" >{tooltipTitle}</span>}>
                                <IconButton
                                    aria-label={areaLabel}
                                    component={iconComponent}
                                    onClick={iconClickHandler}
                                >
                                    <Icon className={`material-icons-two-tone ${classes.svgIcons1} `}>
                                        add_box
                                    </Icon>
                                </IconButton>
                            </Tooltip>
                        );
                    case 'analytics':
                        return (
                            <Tooltip title={<span className="text-13" >{tooltipTitle}</span>}>
                                <IconButton
                                    aria-label={areaLabel}
                                    component={iconComponent}
                                    onClick={iconClickHandler}
                                >
                                    <Icon className={`material-icons-two-tone ${classes.svgIcons1} `}>
                                        analytics
                                    </Icon>
                                </IconButton>
                            </Tooltip>
                        );
                    case 'bar_chart':
                        return (
                            <Tooltip title={<span className="text-13" >{tooltipTitle}</span>}>
                                <IconButton
                                    aria-label={areaLabel}
                                    component={iconComponent}
                                    onClick={iconClickHandler}
                                >
                                    <Icon className={`material-icons`}>
                                        <svg className={classes.svgIcons2} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={color ? color : "#000"}>
                                            <g id="filter_alt_black_24dp">
                                                <g id="Group_6475" data-name="Group 6475">
                                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                                    <path d="M5 9.2h3V19H5zM16.2 13H19v6h-2.8zm-5.6-8h2.8v14h-2.8z" />
                                                </g>
                                            </g>

                                        </svg>
                                    </Icon>
                                </IconButton>
                            </Tooltip>
                        );
                    case 'stacked_line_chart':
                        return (
                            <Tooltip title={<span className="text-13" >{tooltipTitle}</span>}>
                                <IconButton
                                    aria-label={areaLabel}
                                    component={iconComponent}
                                    onClick={iconClickHandler}
                                >
                                    <Icon className={`material-icons`}>
                                        <svg className={classes.svgIcons2} xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill={color ? color : "#000"}>
                                            <g id="filter_alt_black_24dp" >
                                                <g id="Group_6475" data-name="Group 6475">
                                                    <rect fill="none" height="24" width="24" />
                                                    <path d="M2,19.99l7.5-7.51l4,4l7.09-7.97L22,9.92l-8.5,9.56l-4-4l-6,6.01L2,19.99z M3.5,15.49l6-6.01l4,4L22,3.92l-1.41-1.41 l-7.09,7.97l-4-4L2,13.99L3.5,15.49z" />
                                                </g>
                                            </g>

                                        </svg>
                                    </Icon>
                                </IconButton>
                            </Tooltip>
                        );
                    case 'pie_chart':
                        return (
                            <Tooltip title={<span className="text-13" >{tooltipTitle}</span>}>
                                <IconButton
                                    aria-label={areaLabel}
                                    component={iconComponent}
                                    onClick={iconClickHandler}
                                >
                                    <Icon className={`material-icons`}>
                                        <svg className={classes.svgIcons2} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={color ? color : "#000"}>
                                            <g id="filter_alt_black_24dp" >
                                                <g id="Group_6475" data-name="Group 6475">
                                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                                    <path d="M4 12c0 4.07 3.06 7.44 7 7.93V4.07C7.06 4.56 4 7.93 4 12zm9 7.93c3.61-.45 6.48-3.32 6.93-6.93H13v6.93zm0-15.86V11h6.93c-.45-3.61-3.32-6.48-6.93-6.93z" opacity=".3" />
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.86-7-7.93s3.06-7.44 7-7.93v15.86zm2 0V13h6.93c-.45 3.61-3.32 6.48-6.93 6.93zM13 11V4.07c3.61.45 6.48 3.32 6.93 6.93H13z" />
                                                </g>
                                            </g>

                                        </svg>
                                    </Icon>
                                </IconButton>
                            </Tooltip>
                        );
                    case 'add_site':
                        return (
                            <Tooltip title={<span className="text-13" >{tooltipTitle}</span>}>
                                <IconButton
                                    aria-label={areaLabel}
                                    component={iconComponent}
                                    onClick={iconClickHandler}
                                >
                                    <Icon className={`material-icons-two-tone ${classes.svgIcons1} `}>
                                        add_business
                                    </Icon>
                                </IconButton>
                            </Tooltip>
                        );
                    case 'download_excel':
                        return (
                            <Tooltip title={<span className="text-13" >{tooltipTitle}</span>}>
                                <IconButton
                                    aria-label={areaLabel}
                                    component={iconComponent}
                                    onClick={iconClickHandler}
                                    disabled={length > 0 ? false : true}
                                >
                                    <Icon className="material-icons-two-tone" >
                                        <svg className={classes.svgIcons} id="upload_file_black_36dp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <rect id="Rectangle_2274" data-name="Rectangle 2274" width="24" height="24" fill="none" />
                                            <g id="upload_file_black_24dp" transform="translate(2 2)" opacity="0.38">
                                                <g id="Group_6476" data-name="Group 6476">
                                                    <rect id="Rectangle_2490" data-name="Rectangle 2490" width="20" height="20" fill="none" />
                                                </g>
                                                <g id="Group_6478" data-name="Group 6478" transform="translate(3.333 1.667)">
                                                    <g id="Group_6477" data-name="Group 6477">
                                                        <path id="Path_5529" data-name="Path 5529" d="M11.833,4H6V17.333H16V8.167H11.833Z" transform="translate(-4.333 -2.333)" opacity="0.3" />
                                                        <path id="Path_5530" data-name="Path 5530" d="M12.333,2H5.667A1.664,1.664,0,0,0,4.008,3.667L4,17a1.664,1.664,0,0,0,1.658,1.667H15.667A1.672,1.672,0,0,0,17.333,17V7Zm3.333,15h-10V3.667H11.5V7.833h4.167Z" transform="translate(-4 -2)" />
                                                        <path id="Path_5531" data-name="Path 5531" d="M8,14.333h2.5V11h1.667v3.333h2.5l-3.325,3.333Z" transform="translate(-4.667 -3.5)" />
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </Icon>
                                </IconButton>
                            </Tooltip>
                        );
                    case 'addBulkSite':
                        return (
                            <Tooltip title={<span className="text-13" >{tooltipTitle}</span>}>
                                <IconButton
                                    aria-label={areaLabel}
                                    component={iconComponent}
                                    onClick={iconClickHandler}
                                >
                                    <Icon className="material-icons-two-tone">
                                        <svg className={classes.svgIcons} id="Component_146_36" data-name="Component 146 – 36" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <rect id="Rectangle_2274" data-name="Rectangle 2274" width="24" height="24" fill="none" />
                                            <g id="storefront_black_24dp" transform="translate(2 2)" opacity="0.38">
                                                <g id="Group_6622" data-name="Group 6622">
                                                    <rect id="Rectangle_2539" data-name="Rectangle 2539" width="20" height="20" fill="none" />
                                                </g>
                                                <g id="Group_6624" data-name="Group 6624" transform="translate(1.671 2.5)">
                                                    <g id="Group_6623" data-name="Group 6623">
                                                        <path id="Path_5600" data-name="Path 5600" d="M6.033,9.05,6.517,5H4.875L4.033,8.633a1.13,1.13,0,0,0,.208.975A.978.978,0,0,0,5.025,10,1.048,1.048,0,0,0,6.033,9.05Z" transform="translate(-2.338 -3.333)" opacity="0.3" />
                                                        <path id="Path_5601" data-name="Path 5601" d="M9.5,10A1.071,1.071,0,0,0,10.58,8.908V5H8.946L8.488,8.767a1.12,1.12,0,0,0,.275.892A.989.989,0,0,0,9.5,10Z" transform="translate(-3.084 -3.333)" opacity="0.3" />
                                                        <path id="Path_5602" data-name="Path 5602" d="M14.017,10a1.036,1.036,0,0,0,.8-.342,1.184,1.184,0,0,0,.275-.892L14.633,5H13V8.908A1.06,1.06,0,0,0,14.017,10Z" transform="translate(-3.838 -3.333)" opacity="0.3" />
                                                        <path id="Path_5603" data-name="Path 5603" d="M18.588,4.99,16.98,5l.483,4.05a1.048,1.048,0,0,0,1.008.95.959.959,0,0,0,.775-.392,1.136,1.136,0,0,0,.208-.975Z" transform="translate(-4.501 -3.332)" opacity="0.3" />
                                                        <path id="Subtraction_33" data-name="Subtraction 33" d="M419.158-20786.5h-7.335a1.668,1.668,0,0,1-1.665-1.666v-5.783a1.351,1.351,0,0,0-.1-.1.971.971,0,0,1-.137-.146,2.83,2.83,0,0,1-.517-2.4l.877-3.643a1.625,1.625,0,0,1,1.582-1.27h11.574a1.645,1.645,0,0,1,1.592,1.27l.877,3.643a2.806,2.806,0,0,1-.517,2.406,1.693,1.693,0,0,1-.139.145l-.019.018c-.026.023-.052.049-.077.074v1.445H423.5v-.689a.58.58,0,0,0-.06.01l-.024,0a.61.61,0,0,1-.11.014,2.616,2.616,0,0,1-1.869-.795,2.632,2.632,0,0,1-1.864.795,2.731,2.731,0,0,1-1.911-.779,2.631,2.631,0,0,1-1.858.779,2.666,2.666,0,0,1-1.926-.795,2.592,2.592,0,0,1-1.864.795.613.613,0,0,1-.11-.014.253.253,0,0,1-.036-.008l-.047-.006v5.027h7.335v1.666Zm4.26-13.344-1.608.006.48,4.051a1.045,1.045,0,0,0,1.008.949.97.97,0,0,0,.783-.391,1.106,1.106,0,0,0,.209-.971l-.872-3.645Zm-4.928.006h0v3.91a1.057,1.057,0,0,0,1.018,1.09,1.024,1.024,0,0,0,.794-.338,1.135,1.135,0,0,0,.271-.893l-.449-3.77Zm-3.3,0h0l-.459,3.77a1.186,1.186,0,0,0,.277.893,1.01,1.01,0,0,0,.741.338,1.071,1.071,0,0,0,1.075-1.09v-3.91Zm-3.325,0h0l-.841,3.639a1.121,1.121,0,0,0,.209.971.97.97,0,0,0,.783.391,1.049,1.049,0,0,0,1.008-.949l.486-4.051Z" transform="translate(-409.329 20801.5)" />
                                                        <path id="Path_5605" data-name="Path 5605" d="M19.167,17.5V15H17.5v2.5H15v1.667h2.5v2.5h1.667v-2.5h2.5V17.5Z" transform="translate(-4.171 -5)" />
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </Icon>
                                </IconButton>
                            </Tooltip>
                        );
                    default:
                        return null;
                }
            })()}
        </>

    )
}

V5GlobalIconButtons.propTypes = {
    iconType: PropTypes.string.isRequired,
    tooltipTitle: PropTypes.string.isRequired,
    areaLabel: PropTypes.string.isRequired,
    iconComponent: PropTypes.string.isRequired,
    iconClickHandler: PropTypes.func.isRequired
}

V5GlobalIconButtons.defaultProps = {

};

export default V5GlobalIconButtons;
