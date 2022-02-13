import React, {FC, useEffect} from "react";
import {useMainContext} from "../../context/MainContextProvider";
import cloneDeep from "lodash/cloneDeep";
import {Layer, Stage} from "react-konva";
import {Planet} from "./Planet";

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
                        azimuth={item.vector.azimuth}
                        onChange={(e) => {
                            const mp = cloneDeep(materialPoints[+e.name]);
                            mp.point.x = e.x;
                            mp.point.y = e.y;
                            mp.vector.azimuth = e.azimuth;
                            updatePoint(mp);
                        }}
                    />
                )}
            </Layer>
        </Stage>
    );

}
