import React, {FC} from "react";
import {Grid} from "@mui/material";
import {MaterialPointCard} from "./components/MaterialPointCard/MaterialPointCard";
import {MaterialPoint} from "./helpers/types";

const p: MaterialPoint = {
    id: 'id',
    name: 'test',
    mass: 100000,
    prevVector: {
        azimuth: 180.1234567,
        value: 100,
        point: {x: 0, y: 0}
    },
    nextVector: {
        azimuth: 0,
        value: 0,
        point: {x: 0, y: 0}
    }
}

export const App: FC = () => {

    return (
        <Grid container spacing={0}>
            <Grid item xs={1.5}>
                <MaterialPointCard point={p} disabled={false} onChange={()=>{}} onDelete={()=>{}} />
            </Grid>
            <Grid item xs={10.5}>
                <div></div>
            </Grid>
        </Grid>
    );
}