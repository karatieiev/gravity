import React, {createContext, useState, useContext, FC, useRef} from "react";
import {MaterialPoint} from "../helpers/types";
import cloneDeep from "lodash/cloneDeep";

interface ContextProps {
    materialPoints: MaterialPoint[],
    addPoint: Function,
    removePoint: Function,
    replacePoints: Function,
    updatePoint: Function,
    isProcessing: boolean,
    setProcessing: Function
}

const MainContext = createContext<ContextProps>({
    materialPoints: [],
    addPoint: () => {},
    removePoint: () => {},
    replacePoints: () => {},
    updatePoint: () => {},
    isProcessing: false,
    setProcessing: () => {}
});

export const MainContextProvider: FC = ({children}) => {
    const [materialPoints, setPoints] = useState<MaterialPoint[]>([]);
    const [isProcessing, setProcessing] = useState<boolean>(false);
    const nameNumber = useRef<number>(0);

    const addPoint = (point: MaterialPoint) => {
        let p = point;

        if (!point.name) {
            p = cloneDeep(point);
            p.name = `P${nameNumber.current}`;
            nameNumber.current++;
        }
        setPoints(prevState => [...prevState, p]);
    }

    const removePoint = (point: MaterialPoint) => {
        setPoints(prevState => prevState.filter(item => item.id !== point.id));
    }

    const replacePoints = (points: MaterialPoint[]) => {
        setPoints(points);
    }

    const updatePoint = (point: MaterialPoint) => {
        setPoints(prevState => prevState.map(item => item.id === point.id ? point : item));
    }

    return (
        <MainContext.Provider value={{
            materialPoints,
            addPoint,
            removePoint,
            replacePoints,
            updatePoint,
            isProcessing,
            setProcessing
        }}>
            {children}
        </MainContext.Provider>
    )
}

export const useMainContext = () => useContext(MainContext);
