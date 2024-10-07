import React,{ memo } from "react";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import Grid from "@app/component/common/Grid";
import TextField from "@app/component/common/TextField";

const RenderForm = ({data}) => {
  return (
    <Grid container spacing={2}>
      {data?.map((item) => {
        if(item.type === "dropdown"){
          return(
            <Grid item {...item.gridSize}>
              <FormControl fullWidth={item.fullWidth} size={item.size} error={item.error}>
                <InputLabel id={item.id}>{item.InputLabel}</InputLabel>
                <Select
                  labelId={item.labelId}
                  label={item.label}
                  value={item.value}
                  sx={item.sx}
                  onChange={(e) => item.onChange(e)}
                >
                  {
                    item.MenuItem?.map((item,idx) => <MenuItem key={`${item.label}_${idx}`} value={item.value}>{item.label}</MenuItem>)
                  }
                </Select>
                <FormHelperText>{item.helperText}</FormHelperText>
              </FormControl>
            </Grid>
          )
        }

        if(item.multiline){
          return (
            <Grid item {...item.gridSize}>
              <TextField
                required={item.required}
                fullWidth={item.fullWidth}
                label={item.label}
                error={item.error}
                helperText={item.helperText}
                value={item.value}
                onChange={(e) => item.onChange(e)}
                sx={[{ fontSize: "1rem" },item.sx]}
                multiline
                rows={item.rows}
                {...data}
              />
            </Grid>
          );
        }

        return (
          <Grid item {...item.gridSize}>
            <TextField
              required={item.required}
              fullWidth={item.fullWidth}
              label={item.label}
              error={item.error}
              helperText={item.helperText}
              value={item.value}
              onChange={(e) => item.onChange(e)}
              sx={[{ fontSize: "1rem" },item.sx]}
              {...data}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default memo(RenderForm);
