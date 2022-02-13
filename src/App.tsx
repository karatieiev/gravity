import React, {FC} from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {ControlPanel} from "./components/ControlPanel";
import {MaterialPointsList} from "./components/MaterialPointsList";
import {Konva} from "./components/konva/Konva";

export const App: FC = () => {

    return (
        <Grid container spacing={0}>
            <Grid item xs={1.5}>
                <Box sx={{mb: 1}}>
                    <ControlPanel />
                </Box>
                <MaterialPointsList />
            </Grid>
            <Grid item xs={10.5}>
                <Konva />
            </Grid>
        </Grid>
    );
}
