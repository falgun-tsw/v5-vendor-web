import React from "react";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { createStyles, makeStyles } from "@mui/styles";
import { alpha } from "@mui/material/styles";
import cx from "classnames";
import Stack from "@app/component/common/Stack";
import List from "@app/component/common/List";
import Divider from "@app/component/common/Divider";
import ListItem from "@app/component/common/ListItem";
import IconButton from "@app/component/common/IconButton";
import ListItemText from "@app/component/common/ListItemText";
import ListItemIcon from "@app/component/common/ListItemIcon";
import ListItemAvatar from "@app/component/common/ListItemAvatar";
import ListSubheader from "@app/component/common/ListSubheader";
import ListItemButton from "@app/component/common/ListItemButton";
import ListItemSecondaryAction from "@app/component/common/ListItemSecondaryAction";

const SidebarMenu = (props) => {
  const { menuConfig = [], isDrawerExpanded } = props;
  const [selectedIndex, setSelectedIndex] = React.useState("");
  const classes = useStyles();

  const handleMenuExpandClick = (index) => {
    setSelectedIndex(index === selectedIndex ? "" : index);
  };

  const GenerateSubMenuItem = (data, key) => {
    const {
      type,
      onClick = () => {},
      primaryText,
      secondaryText = "",
      icon = null,
      secondaryAction = "",
      isActive = false,
      isDisabled = false,
      avatar,
      logoUrl = "",
    } = data;
    if (isDrawerExpanded) {
      return (
        <>
          <ListItemButton
            onClick={onClick}
            sx={{ pl: 4 }}
            disabled={isDisabled}
            classes={{
              root: cx({
                [classes.listItemRoot]: true,
                [classes.listItemActive]: isActive,
              }),
            }}
          >
            {icon && (
              <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
                {icon}
              </ListItemIcon>
            )}
            {avatar && (
              <ListItemAvatar classes={{ root: classes.listItemAvatarRoot }}>
                {avatar}
              </ListItemAvatar>
            )}
            <ListItemText
              primary={primaryText}
              secondary={secondaryText}
              classes={{
                primary: cx({
                  [classes.listItemPrimaryText]: true,
                  [classes.listItemPrimaryTextActive]: isActive,
                }),
                secondary: cx({
                  [classes.listItemSecondaryText]: true,
                  [classes.listItemSecondaryTextActive]: isActive,
                }),
              }}
            />
          </ListItemButton>
        </>
      );
    }
    return (
      <>
        <ListItemButton
          onClick={onClick}
          disabled={isDisabled}
          classes={{
            root: cx({
              [classes.listItemCollapsedRoot]: true,
              [classes.listItemActive]: isActive,
            }),
          }}
        >
          {icon && (
            <IconButton disableRipple disableFocusRipple>
              {icon}
            </IconButton>
          )}
          {avatar && (
            <ListItemAvatar classes={{ root: classes.listItemAvatarRoot }}>
              {avatar}
            </ListItemAvatar>
          )}
        </ListItemButton>
      </>
    );
  };
  return (
    <List
      classes={{
        root: classes.listRoot,
      }}
    >
      {menuConfig.map((item, index) => {
        const {
          type,
          onClick = () => {},
          primaryText,
          secondaryText = "",
          icon = null,
          secondaryAction = "",
          isActive = false,
          isDisabled = false,
          avatar,
          logoUrl = "",
          children = [],
        } = item;
        const key = `${type}__${index}`;

        if (type === "header") {
          return <ListSubheader key={key}>{primaryText}</ListSubheader>;
        }

        if (type === "item") {
          if (isDrawerExpanded) {
            return (
              <ListItem key={key} sx={{ py: 0 }}>
                <ListItemButton
                  onClick={onClick}
                  disabled={isDisabled}
                  classes={{
                    root: cx({
                      [classes.listItemRoot]: true,
                      [classes.listItemActive]: isActive,
                    }),
                  }}
                >
                  {icon && (
                    <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
                      {icon}
                    </ListItemIcon>
                  )}
                  {avatar && (
                    <ListItemAvatar
                      classes={{ root: classes.listItemAvatarRoot }}
                    >
                      {avatar}
                    </ListItemAvatar>
                  )}
                  <ListItemText
                    primary={primaryText}
                    secondary={secondaryText}
                    classes={{
                      primary: cx({
                        [classes.listItemPrimaryText]: true,
                        [classes.listItemPrimaryTextActive]: isActive,
                      }),
                      secondary: cx({
                        [classes.listItemSecondaryText]: true,
                        [classes.listItemSecondaryTextActive]: isActive,
                      }),
                    }}
                  />
                  {secondaryAction ? (
                    <ListItemSecondaryAction>
                      {secondaryAction}
                    </ListItemSecondaryAction>
                  ) : null}
                </ListItemButton>
              </ListItem>
            );
          }
          return (
            <ListItem key={key} sx={{ px: 1.5, py: 0 }}>
              <ListItemButton
                onClick={onClick}
                disabled={isDisabled}
                classes={{
                  root: cx({
                    [classes.listItemCollapsedRoot]: true,
                    [classes.listItemActive]: isActive,
                  }),
                }}
              >
                {icon && (
                  <IconButton disableRipple disableFocusRipple>
                    {icon}
                  </IconButton>
                )}
                {avatar && (
                  <ListItemAvatar
                    classes={{ root: classes.listItemAvatarRoot }}
                  >
                    {avatar}
                  </ListItemAvatar>
                )}
              </ListItemButton>
              {/* <ListItemIcon>{icon}</ListItemIcon> */}
            </ListItem>
          );
        }

        if (type === "divider") {
          return (
            <ListItem key={key} className={classes.divider}>
              <Divider />
            </ListItem>
          );
        }

        if (type === "spacer") {
          return <ListItem key={key} className={classes.spacer} />;
        }

        if (type === "dropdown") {
          if (isDrawerExpanded) {
            return (
              <React.Fragment key={key}>
                <ListItem sx={{ py: 0, display: "block", width: "100%" }}>
                  <ListItemButton
                    onClick={() => handleMenuExpandClick(index)}
                    disabled={isDisabled}
                    classes={{
                      root: cx({
                        [classes.listItemRoot]: true,
                        // [classes.listItemActive]: isActive,
                      }),
                    }}
                  >
                    {icon && (
                      <ListItemIcon
                        classes={{ root: classes.listItemIconRoot }}
                      >
                        {icon}
                      </ListItemIcon>
                    )}
                    {avatar && (
                      <ListItemAvatar
                        classes={{ root: classes.listItemAvatarRoot }}
                      >
                        {avatar}
                      </ListItemAvatar>
                    )}
                    <ListItemText
                      primary={primaryText}
                      secondary={secondaryText}
                      classes={{
                        primary: cx({
                          [classes.listItemPrimaryText]: true,
                          [classes.listItemPrimaryTextActive]: isActive,
                        }),
                        secondary: cx({
                          [classes.listItemSecondaryText]: true,
                          [classes.listItemSecondaryTextActive]: isActive,
                        }),
                      }}
                    />
                    {index === selectedIndex ? (
                      <ExpandLess
                        fontSize="small"
                        sx={{ color: isActive ? "#38a1ff" : "#A2A7AE" }}
                      />
                    ) : (
                      <ExpandMore
                        sx={{ color: isActive ? "#38a1ff" : "#A2A7AE" }}
                        fontSize="small"
                      />
                    )}
                    {secondaryAction ? (
                      <ListItemSecondaryAction>
                        {secondaryAction}
                      </ListItemSecondaryAction>
                    ) : null}
                  </ListItemButton>
                  <Collapse
                    in={index === selectedIndex}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {children.map((data, index) => (
                        <React.Fragment key={`${key}_${data.type}_${index}`}>
                          {GenerateSubMenuItem(data, key)}
                        </React.Fragment>
                      ))}
                    </List>
                  </Collapse>
                </ListItem>
              </React.Fragment>
            );
          }
          return (
            <ListItem key={key} sx={{ px: 1.5, py: 0, display: "block" }}>
              <ListItemButton
                onClick={() => handleMenuExpandClick(index)}
                disabled={isDisabled}
                classes={{
                  root: cx({
                    [classes.listItemCollapsedRoot]: true,
                    [classes.listItemActive]: isActive,
                  }),
                }}
              >
                {icon && (
                  <IconButton disableRipple disableFocusRipple>
                    {icon}
                  </IconButton>
                )}
                {avatar && (
                  <ListItemAvatar
                    classes={{ root: classes.listItemAvatarRoot }}
                  >
                    {avatar}
                  </ListItemAvatar>
                )}
              </ListItemButton>
              <Collapse
                in={index === selectedIndex}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {children.map((data) => GenerateSubMenuItem(data, key))}
                </List>
              </Collapse>
              {/* <ListItemIcon>{icon}</ListItemIcon> */}
            </ListItem>
          );
        }
        if (type === "broker") {
          return (
            <Stack
              sx={{ borderTop: "1px solid #e0e0e0", px: "12px", py: "16px" }}
              key={key}
            >
              {/* <Text
                                variant="caption2"
                                color="#afb7bd"
                            sx={{ textAlign: "center",fontWeight:"fontWeightBold" }}>
                                PREFFERED PARTNER
                            </Text> */}
              <img
                src={logoUrl}
                height={45}
                alt="img"
                style={{ objectFit: "contain" }}
              />
            </Stack>
          );
        }

        console.log(`${item.type} is not supported by SidebarMenu`);
        return null;
      })}
    </List>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    listRoot: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      paddingBottom: 0,
    },
    listItemRoot: {
      borderRadius: `${theme.spacing(0.5)} !important`,
      paddingLeft: `${theme.spacing(1.5)} !important`,
      paddingRight: `${theme.spacing(1.5)} !important`,
    },
    listItemCollapsedRoot: {
      borderRadius: `${theme.spacing(0.5)} !important`,
      paddingLeft: `${theme.spacing(1)} !important`,
      paddingRight: `${theme.spacing(1)} !important`,
      display: "flex",
      justifyContent: "center",
    },
    listItemActive: {
      backgroundColor: `${alpha(theme.palette.primary.main, 0.12)} !important`,
    },

    listItemAvatarRoot: {
      minWidth: "18px !important",
      marginRight: "12px",
    },
    listItemIconRoot: {
      minWidth: "18px !important",
      marginRight: "12px",
    },

    listItemPrimaryText: {
      fontSize: `${theme.typography.small.fontSize} !important`,
      color: "#252C32 !important",
      lineHeight: `${theme.typography.body2.lineHeight} !important`,
    },
    listItemPrimaryTextActive: {
      color: `${theme.palette.primary.main} !important`,
      fontWeight: `500 !important`,
    },

    listItemSecondaryText: {
      fontSize: `${theme.typography.caption1.fontSize} !important`,
      color: "#252C32 !important",
      lineHeight: `${theme.typography.body2.lineHeight} !important`,
      maxWidth: "130px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    listItemSecondaryTextActive: {
      color: `${theme.palette.primary.main} !important`,
    },

    spacer: {
      flexGrow: 1,
    },

    divider: {
      display: "block !important",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
    },
  })
);

export default React.memo(SidebarMenu);
