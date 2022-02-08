import React, {FC, useEffect} from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import {useMainContext} from "../context/MainContextProvider";
import {calcMovement, generateMaterialPoint, syncVectors} from "../helpers/logic";
import cloneDeep from "lodash/cloneDeep";

export const ControlPanel: FC = () => {
    const { isProcessing, setProcessing, addPoint, materialPoints, replacePoints } = useMainContext();

    useEffect(() => {
        if (isProcessing) {
            setTimeout(() => {
                const mp = cloneDeep(materialPoints);
                calcMovement(mp);
                syncVectors(mp);
                replacePoints(mp);
            }, 1000);
        }
    }, [isProcessing, materialPoints]);

    return (
        <Card>
            <Box sx={{p: 1, pl: 2, pr: 2, display: 'flex'}}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isProcessing}
                            onChange={() => setProcessing(!isProcessing)}
                            name="Process"
                            color="primary"
                            size="small"
                        />
                    }
                    label="Go"
                />
                <Button
                    size="small"
                    disabled={isProcessing}
                    onClick={() => addPoint(generateMaterialPoint())}
                >
                    add
                </Button>
            </Box>
        </Card>
    );
}
