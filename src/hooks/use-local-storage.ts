import { useState } from "react";

const useLocalStorage = <TState>(key: string, newState: TState) => {
    const [state, setState] = useState<TState>(() => {
        const stateString = window.localStorage.getItem(key);
        return stateString ? JSON.parse(stateString) as TState : newState;
    })

    const updateState = (state: TState) => {
        window.localStorage.setItem(key, JSON.stringify(state))
        setState(state)
    }

    return [state, updateState];
}

export default useLocalStorage;