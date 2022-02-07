import React, {createContext, useState, useContext, FC} from "react";
import {MaterialPoint} from "../helpers/types";

interface ContextProps {
    materialPoints: MaterialPoint[],
    addPoint: Function,
    removePoint: Function,
    updatePoints: Function
}

const MainContext = createContext<ContextProps>({
    materialPoints: [],
    addPoint: () => {},
    removePoint: () => {},
    updatePoints: () => {}
});

export const MainContextProvider: FC = ({children}) => {
    const [materialPoints, setPoints] = useState<MaterialPoint[]>([]);

    const addPoint = (point: MaterialPoint) => {
        setPoints(prevState => [...prevState, point]);
    }

    const removePoint = (id: number | string) => {
        setPoints(prevState => prevState.filter(item => item.id !== id));
    }

    const updatePoints = (points: MaterialPoint[]) => {
        setPoints(points);
    }

    return (
        <MainContext.Provider value={{materialPoints, addPoint, removePoint, updatePoints}}>
            {children}
        </MainContext.Provider>
    )
}

export const useMainContext = () => useContext(MainContext);
