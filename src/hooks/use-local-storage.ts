import React, { useEffect, useState } from "react";

function useLocalStorage<TState>(key: string, newState: TState): [TState, React.Dispatch<React.SetStateAction<TState>>] {
    let stateStr = window.localStorage.getItem(key);

    let newnewState = stateStr ? JSON.parse(stateStr) : newState;
    
    const [state, setState] = useState<TState>(newnewState);

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}

export default useLocalStorage;