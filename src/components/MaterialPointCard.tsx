import React, {FC} from "react";
import {MaterialPoint} from "../helpers/types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import cloneDeep from "lodash/cloneDeep";

interface Props {
    point: MaterialPoint,
    onChange: Function,
    onDelete: Function,
    disabled: boolean
}

export const MaterialPointCard: FC<Props> = ({point, onChange, onDelete, disabled}) => {

    const handleChange = (field: string, value: string) => {
        const newPoint = cloneDeep(point);
        switch (field) {
            case "name":
                newPoint.name = value;
                break;
            case "mass":
                newPoint.mass = +value;
                break;
            case "azimuth":
                newPoint.prevVector.azimuth = +value;
                newPoint.nextVector.azimuth = +value;
                break;
            case "value":
                newPoint.prevVector.value = +value;
                newPoint.nextVector.value = +value;
                break;
            case "x":
                newPoint.prevVector.point.x = +value;
                newPoint.nextVector.point.x = +value;
                break;
            case "y":
                newPoint.prevVector.point.y = +value;
                newPoint.nextVector.point.y = +value;
                break;
            default:
                return;
        }
        onChange(newPoint);
    }

    return (
        <Card>
            <Box sx={{ p: 1, display: "flex" }}>
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
                    value={point.prevVector.azimuth}
                    sx={{pr: 0.5}}
                    onChange={e => handleChange('azimuth', e.target.value)}
                />
                <TextField
                    disabled={disabled}
                    label="Speed"
                    size="small"
                    value={point.prevVector.value}
                    sx={{pl: 0.5}}
                    onChange={e => handleChange('value', e.target.value)}
                />
            </Box>
            <Box sx={{ px: 1, pb: 1, display: 'flex'}}>
                <TextField
                    disabled={disabled}
                    label="X"
                    size="small"
                    value={point.prevVector.point.x}
                    sx={{pr: 0.5}}
                    onChange={e => handleChange('x', e.target.value)}
                />
                <TextField
                    disabled={disabled}
                    label="Y"
                    size="small"
                    value={point.prevVector.point.y}
                    sx={{pl: 0.5}}
                    onChange={e => handleChange('y', e.target.value)}
                />
            </Box>
        </Card>
    );
}
