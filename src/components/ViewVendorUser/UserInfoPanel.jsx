import React from "react";
import { InputAdornment, Drawer } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Stack from "@app/component/common/Stack";
import Button from "@app/component/common/Button";
import TextField from "@app/component/common/TextField";
import IconButton from "@app/component/common/IconButton";

export default function UserInfoPanel(props) {
  const {
    openUserInfoPanel,
    closeUserPanel,
    handleModalOpen,
    changePanelPasswordVisibility,
    showUserPanelPassword,
    data
  } = props;
  return (
    <Stack>
      <Drawer
        open={openUserInfoPanel}
        anchor="right"
        onClose={() => {
          closeUserPanel();
        }}
      >
        <Stack
          direction={{ xs: "column" }}
          p={2}
          spacing={{ xs: 1, sm: 8 }}
          justifyContent="space-between"
          sx={{ height: "100%" }}
        >
          <Stack
            direction={{ xs: "column" }}
            spacing={{ xs: 1, sm: 2 }}
            justifyContent="space-between"
            sx={{ height: "100%" }}
          >
            <Stack direction={{ xs: "column" }} spacing={{ xs: 3, sm: 4 }}>
              <TextField
                id="JoiningDate"
                size="small"
                label="Joining Date"
                name="joiningDate"
                value={data.joiningDate?.split("T")[0]}
                sx={{ fontSize: "1rem" }}
                disabled
              />
              <TextField
                id="UserId"
                size="small"
                label="User ID"
                name="userId"
                value={data.userName}
                sx={{ fontSize: "1rem" }}
                disabled
              />
              <TextField
                type={showUserPanelPassword ? "text" : "password"}
                id="Password"
                size="small"
                label="Password"
                name="password"
                value={data.password}
                sx={{ fontSize: "1rem" }}
                disabled
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={(e) => {
                          changePanelPasswordVisibility();
                        }}
                        edge="end"
                      >
                        {showUserPanelPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack spacing={{ xs: 2 }}>
              <Button
                variant="contained"
                size="small"
                onClick={(e) => {
                  handleModalOpen();
                }}
              >
                CHANGE PASSWORD
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Drawer>
    </Stack>
  );
}
