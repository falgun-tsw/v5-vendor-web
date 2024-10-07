import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ProfileMenu = (props) => {
    const { menuOptions, listSize } = props
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    

    return (
        <div style={{ marginTop: "-8px" }}>
            <IconButton
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: listSize * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {menuOptions.map((option, index) => (
                    <MenuItem  onClick={() => null}>
                        {option?.name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

export default React.memo(ProfileMenu);