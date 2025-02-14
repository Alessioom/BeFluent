import React, { createContext, useState, useEffect } from "react";

export const GameTimerContext = createContext();

export const GameTimerProvider = ({ children }) => {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTimeElapsed(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const startTimer = () => {
        setTimeElapsed(0); // Azzeriamo il tempo
        setIsRunning(true); // Facciamo ripartire il timer
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    return (
        <GameTimerContext.Provider value={{ timeElapsed, startTimer, stopTimer }}>
            {children}
        </GameTimerContext.Provider>
    );
};
