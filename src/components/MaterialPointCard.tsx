import React, {FC, useState} from "react";
import {MaterialPoint} from "../helpers/types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import cloneDeep from "lodash/cloneDeep";
import {Checkbox, FormControlLabel} from "@mui/material";

interface Props {
    point: MaterialPoint,
    onChange: Function,
    onDelete: Function,
    disabled: boolean
}

export const MaterialPointCard: FC<Props> = ({point, onChange, onDelete, disabled}) => {

    const [value, setValue] = useState<string>(String(point.vector.value));

    const handleChange = (field: string, value: string | boolean) => {
        const newPoint = cloneDeep(point);
        switch (field) {
            case "name":
                newPoint.name = value;
                break;
            case "mass":
                newPoint.mass = +value;
                break;
            case "azimuth":
                newPoint.vector.azimuth = +value;
                break;
            case "value":
                const newValue = +value;
                if (isNaN(newValue)) {
                    setValue(String(newPoint.vector.value));
                } else {
                    newPoint.vector.value = newValue;
                }
                break;
            case "x":
                newPoint.point.x = +value;
                break;
            case "y":
                newPoint.point.y = +value;
                break;
            case "path":
                newPoint.showPath = value;
                break;
            default:
                return;
        }
        onChange(newPoint);
    }

    return (
        <Card>
            <Box sx={{backgroundColor: `${point.color}`, pl: 1, pr: 1}}>
                <FormControlLabel
                    control={<Checkbox
                        size="small"
                        checked={point.showPath}
                        onChange={e => handleChange("path", e.target.checked)}
                    />}
                    label="Show path"
                />
            </Box>
            <Box sx={{ p: 1, display: "flex"}}>
                <TextField
                    disabled={disabled}
                    label="Name"
                    size="small"
                    value={point.name}
                    onChange={e => handleChange('name', e.target.value)}
                />
                <Button
                    disabled={disabled}
                    variant="text"
                    color="error"
                    onClick={() => onDelete(point)}
                    size="small"
                >
                    X
                </Button>
            </Box>
            <Box sx={{ px: 1, pb: 1 }}>
                <TextField
                    disabled={disabled}
                    label="Mass"
                    size="small"
                    value={point.mass}
                    onChange={e => handleChange('mass', e.target.value)}
                />
            </Box>
            <Box sx={{ px: 1, pb: 1, display: 'flex'}}>
                <TextField
                    disabled={disabled}
                    label="Azimuth"
                    size="small"
                    value={point.vector.azimuth}
                    sx={{pr: 0.5}}
                    onChange={e => handleChange('azimuth', e.target.value)}
                />
                <TextField
                    disabled={disabled}
                    label="Speed"
                    size="small"
                    value={disabled ? point.vector.value : value}
                    sx={{pl: 0.5}}
                    onChange={e => setValue(e.target.value)}
                    onBlur={e => handleChange('value', e.target.value)}
                />
            </Box>
            <Box sx={{ px: 1, pb: 1, display: 'flex'}}>
                <TextField
                    disabled={disabled}
                    label="X"
                    size="small"
                    value={point.point.x}
                    sx={{pr: 0.5}}
                    onChange={e => handleChange('x', e.target.value)}
                />
                <TextField
                    disabled={disabled}
                    label="Y"
                    size="small"
                    value={point.point.y}
                    sx={{pl: 0.5}}
                    onChange={e => handleChange('y', e.target.value)}
                />
            </Box>
        </Card>
    );
}
