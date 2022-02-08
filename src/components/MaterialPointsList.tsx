import React, {FC} from "react";
import {useMainContext} from "../context/MainContextProvider";
import Box from "@mui/material/Box";
import {MaterialPointCard} from "./MaterialPointCard";

export const MaterialPointsList: FC = () => {
    const { materialPoints, isProcessing, removePoint, updatePoint } = useMainContext();
    return (
        <React.Fragment>
            {materialPoints.map(point =>
                <Box key={point.id} sx={{mb: 1}}>
                    <MaterialPointCard
                        key={point.id}
                        point={point}
                        onChange={updatePoint}
                        onDelete={removePoint}
                        disabled={isProcessing}
                    />
                </Box>
            )}
        </React.Fragment>
    );
}