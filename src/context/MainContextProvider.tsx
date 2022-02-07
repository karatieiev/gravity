import React, {createContext, useState, useContext, FC} from "react";
import {MaterialPoint} from "../helpers/types";

interface ContextProps {
    materialPoints: MaterialPoint[],
    addPoint: Function,
    removePoint: Function,
    replacePoints: Function,
    updatePoint: Function
}

const MainContext = createContext<ContextProps>({
    materialPoints: [],
    addPoint: () => {},
    removePoint: () => {},
    replacePoints: () => {},
    updatePoint: () => {}
});

export const MainContextProvider: FC = ({children}) => {
    const [materialPoints, setPoints] = useState<MaterialPoint[]>([]);

    const addPoint = (point: MaterialPoint) => {
        setPoints(prevState => [...prevState, point]);
    }

    const removePoint = (point: MaterialPoint) => {
        setPoints(prevState => prevState.filter(item => item.id !== point.id));
    }

    const replacePoints = (points: MaterialPoint[]) => {
        setPoints(points);
    }

    const updatePoint = (point: MaterialPoint) => {
        setPoints(prevState => [...prevState.filter(item => item.id !== point.id), point]);
    }

    return (
        <MainContext.Provider value={{
            materialPoints, addPoint, removePoint, replacePoints, updatePoint
        }}>
            {children}
        </MainContext.Provider>
    )
}

export const useMainContext = () => useContext(MainContext);
