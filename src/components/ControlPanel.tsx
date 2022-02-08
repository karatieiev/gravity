import React, {FC} from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import {useMainContext} from "../context/MainContextProvider";
import {generateMaterialPoint} from "../helpers/logic";

export const ControlPanel: FC = () => {
    const { isProcessing, setProcessing, addPoint } = useMainContext();

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
