import React, {FC, useEffect, useRef} from "react";
import {Circle, Line} from "react-konva";
import {ChangePlanetEvent} from "../../helpers/types";

interface Props {
    id: number,
    x: number,
    y: number,
    mass?: number,
    name: string,
    onChange: (e: ChangePlanetEvent) => void,
    index: number,
    isProcessing: boolean,
    color: string,
    showPath?: boolean,
    azimuth: number
}

export const Planet: FC<Props> = (props) => {
    const points = useRef<number[]>([]);

    useEffect(() => {
        if (props.isProcessing && props.showPath) {
            points.current.push(props.x);
            points.current.push(props.y);
        }
        if (!props.showPath) points.current = [];
    }, [props.x, props.y, props.isProcessing, props.showPath]);

    return (
        <>
            <Circle
                opacity={1}
                x={props.x}
                y={props.y}
                radius={10}
                fill={props.color}
                draggable
                name={props.name}
                onDragMove={e => props.onChange({
                    name: e.target.name(),
                    x: e.target.x(),
                    y: e.target.y(),
                    azimuth: props.azimuth
                })}
            />
            <Line
                opacity={0.2}
                stroke={props.color}
                strokeWidth={1}
                lineCap="round"
                points={points.current}
            />
        </>
    );
}
