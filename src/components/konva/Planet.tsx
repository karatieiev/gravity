import React, {FC, useEffect, useRef} from "react";
import {Circle, Line} from "react-konva";
import {ChangePlanetEvent, Point} from "../../helpers/types";
import {sumVectors} from "../../helpers/vectors";

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

export const Planet: FC<Props> = ({
    isProcessing, x, y, showPath, azimuth,
    color, index, name, onChange
}) => {
    const pathPoints = useRef<number[]>([]);
    const directionPoint = useRef<Point>({x: 180, y: 100});

    const updateDirection = () => {
        const summedVector = sumVectors([{azimuth, value: 100}]);
        directionPoint.current = {
            x: x + summedVector.dX,
            y: y + summedVector.dY
        }
    }

    useEffect(() => {
        if (isProcessing && showPath) {
            pathPoints.current.push(x);
            pathPoints.current.push(y);
        }
        if (!showPath) pathPoints.current = [];
        if (!isProcessing) updateDirection();
    }, [x, y, isProcessing, showPath]);

    return (
        <>
            <Circle
                opacity={1}
                x={x}
                y={y}
                radius={10}
                fill={color}
                draggable
                name={name}
                onDragMove={e => onChange({
                    name: e.target.name(),
                    x: e.target.x(),
                    y: e.target.y(),
                    azimuth
                })}
                onDragEnd={updateDirection}
            />
            <Line
                opacity={0.2}
                stroke={color}
                strokeWidth={1}
                lineCap="round"
                points={pathPoints.current}
            />
            {!isProcessing &&
                <>
                    <Circle
                        x={directionPoint.current.x}
                        y={directionPoint.current.y}
                        radius={5}
                        fill="#888"
                    />
                    <Line
                        stroke="#888"
                        strokeWidth={1}
                        lineCap="round"
                        points={[x,y,directionPoint.current.x,directionPoint.current.y]}
                    />
                </>
            }
        </>
    );
}
