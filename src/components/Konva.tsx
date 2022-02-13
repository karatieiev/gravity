import React, {FC, useEffect, useRef} from "react";
import {useMainContext} from "../context/MainContextProvider";
import cloneDeep from "lodash/cloneDeep";
import {Line, Layer, Stage, Circle} from "react-konva";

interface Props {
    id: number,
    x: number,
    y: number,
    mass?: number,
    name: string,
    onDragMove: Function,
    index: number,
    isProcessing: boolean,
    color: string,
    showPath?: boolean
}

const Planet: FC<Props> = (props) => {
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
                onDragMove={e => props.onDragMove(e)}
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

export const Konva: FC = () => {
    const { materialPoints, updatePoint, isProcessing } = useMainContext();

    useEffect(() => {},[materialPoints]);

    return (
        <Stage width={2000} height={2000}>
            <Layer>
                {materialPoints.map((item, index) =>
                    <Planet
                        key={item.id}
                        id={item.id}
                        isProcessing={isProcessing}
                        x={item.point.x}
                        y={item.point.y}
                        name={String(index)}
                        color={item.color}
                        index={index}
                        showPath={item.showPath}
                        onDragMove={(e: { target: { name: () => string | number; x: () => any; y: () => any; }; }) => {
                            const mp = cloneDeep(materialPoints[+e.target.name()]);
                            mp.point.x = e.target.x();
                            mp.point.y = e.target.y();
                            updatePoint(mp);
                        }}
                    />
                )}
            </Layer>
        </Stage>
    );

}