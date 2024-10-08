import React, { Fragment } from 'react'
import useSettings from 'src/FormElements/app/hooks/useSettings'
import { styled, Box } from '@mui/system'
import { Menu, ThemeProvider } from '@mui/material'

const MenuButton = styled(Box)(({ theme }) => ({
    display: 'inline-block',
    color: theme.palette.text.primary,
    '& div:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}))

const V5GlobalMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const children = React.Children.toArray(props.children)
    let { shouldCloseOnItemClick = true, horizontalPosition = 'left' } = props
    const { settings } = useSettings()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Fragment>
            <MenuButton onClick={handleClick} sx={{ marginLeft: '5px'}}>
                {props.menuButton}
            </MenuButton>
            <ThemeProvider theme={settings.themes[settings.activeTheme]}>
                <Menu
                    elevation={8}
                    getContentAnchorEl={null}
                    anchorEl={anchorEl}
                    open={!!anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: horizontalPosition,
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: horizontalPosition,
                    }}
                >
                    {children.map((child, index) => (
                        <div
                            onClick={
                                shouldCloseOnItemClick ? handleClose : () => { }
                            }
                            key={index}
                        >
                            {child}
                        </div>
                    ))}
                </Menu>
            </ThemeProvider>
        </Fragment>
    )
}

export default V5GlobalMenu
