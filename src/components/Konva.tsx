import React, {FC, useEffect} from "react";
import {useMainContext} from "../context/MainContextProvider";
import {Circle, Layer, Stage} from "react-konva";
import cloneDeep from "lodash/cloneDeep";

export const Konva: FC = () => {
    const { materialPoints, updatePoint } = useMainContext();

    useEffect(() => {

    }, [materialPoints]);

    return (
        <Stage width={2000} height={2000}>
            <Layer>
                {materialPoints.map((item, index) =>
                    <Circle
                        key={item.id}
                        x={item.point.x}
                        y={item.point.y}
                        radius={10}
                        fill={ index ? "green" : "red"}
                        draggable
                        name={String(index)}
                        onDragMove={e => {
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