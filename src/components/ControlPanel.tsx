import React, {FC, useEffect, useRef} from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import {useMainContext} from "../context/MainContextProvider";
import {calcMovement, generateMaterialPoint, needToUpdateContext} from "../helpers/logic";
import cloneDeep from "lodash/cloneDeep";
import {MaterialPoint} from "../helpers/types";

export const ControlPanel: FC = () => {
    const { isProcessing, setProcessing, addPoint, materialPoints, replacePoints } = useMainContext();
    const draftPoints = useRef<Array<MaterialPoint>>([]);
    const factor = useRef<number>(0);
    const active = useRef<boolean>(false);
    
    const process = () => {
        if (active.current) {
            const mp = cloneDeep(draftPoints.current);
            factor.current = calcMovement(mp);
            if (factor.current > 1) factor.current = 1;
            draftPoints.current = mp;
            // if (needToUpdateContext(materialPoints, mp, factor.current))
                replacePoints(mp);
            setTimeout(process, 0);
        }
    }

    useEffect(() => {
        if (isProcessing) {
            if(draftPoints.current.length === 0) draftPoints.current = cloneDeep(materialPoints);
            if (!active.current)  {
                active.current = true;
                process();
            }
        } else {
            draftPoints.current = [];
            factor.current = 0;
            active.current = false;
        }
    }, [isProcessing]);

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
            {factor.current}
        </Card>
    );
}
