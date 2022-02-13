import React, {FC, useEffect, useRef, useState} from "react";
import {Circle, Line} from "react-konva";
import {ChangePlanetEvent, Point} from "../../helpers/types";
import {getVector, sumVectors} from "../../helpers/vectors";

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
    color, name, onChange
}) => {
    const pathPoints = useRef<number[]>([]);
    const [directionPoint, setDirectionPoint] = useState<Point>({x: 180, y: 100})

    const updateDirection = () => {
        const summedVector = sumVectors([{azimuth, value: 80}]);
        setDirectionPoint({
            x: x + summedVector.dX,
            y: y + summedVector.dY
        });
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
                onDragEnd={e => onChange({
                    name: e.target.name(),
                    x: e.target.x(),
                    y: e.target.y(),
                    azimuth
                })}
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
                        x={directionPoint.x}
                        y={directionPoint.y}
                        radius={5}
                        fill="#888"
                        draggable
                        onDragMove={e => {
                            const vector = getVector({x,y}, {x: e.target.x(), y: e.target.y()})
                            onChange({
                                name,
                                x,
                                y,
                                azimuth: vector.azimuth
                            });
                            updateDirection();
                        }}
                    />
                    <Line
                        stroke="#888"
                        strokeWidth={1}
                        lineCap="round"
                        points={[x,y,directionPoint.x,directionPoint.y]}
                    />
                </>
            }
        </>
    );
}
