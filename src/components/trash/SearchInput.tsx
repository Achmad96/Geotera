import React, { useEffect, useReducer } from "react";
import { debounce } from "lodash";

interface SearchActionType {
    type: "SET_QUERY" | "SET_SUGGESTIONS";
    payload?: any;
}
interface StateInterface {
    query: string;
    suggestions: string[];
}

const reducer = (state: StateInterface, action: SearchActionType) => {
    switch (action.type) {
        case "SET_QUERY":
            return { ...state, query: action.payload };
        case "SET_SUGGESTIONS":
            return { ...state, suggestions: action.payload };
        default:
            return state;
    }
};

const SearchInput = ({ dispatch }: { dispatch: Function }) => {
    const [state, localDispatch] = useReducer(reducer, { query: "", suggestions: [] });
    const fetchSuggestions = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_HERE_API_URL;
        const apiKey = process.env.NEXT_PUBLIC_HERE_API_KEY;
        const params = new URLSearchParams({
            q: state.query as string,
            in: "countryCode:IDN",
            apiKey: apiKey as string,
        });

        try {
            const response = await fetch(`${apiUrl}?${params}`);
            const data = await response.json();
            localDispatch({ type: "SET_SUGGESTIONS", payload: data.items });
        } catch (error) {
            console.error("Error fetching data from HERE API", error);
        }
    };

    const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

    useEffect(() => {
        if (state.query.length > 2 && state.suggestions !== undefined) {
            debouncedFetchSuggestions();
        } else {
            localDispatch({ type: "SET_SUGGESTIONS", payload: [] });
        }

        return () => {
            debouncedFetchSuggestions.cancel();
        };
    }, [state.query]);

    return (
        <div className="w-full">
            <input
                name="location"
                type="text"
                value={state.query}
                autoComplete="off"
                onChange={e => localDispatch({ type: "SET_QUERY", payload: e.target.value })}
                onKeyDown={e => {
                    if (state.suggestions?.length > 0) {
                        if (e.key === "ArrowDown") {
                            e.preventDefault();
                            const btn = document.querySelector(".suggest-0") as HTMLElement;
                            btn?.focus();
                        }
                    }
                }}
                placeholder="Search for locations"
                className="w-[80%] outline-none h-10 border-b-1 max-sm:text-sm pl-2"
                required
            />
            <div className="w-[80%] hover:cursor-pointer">
                {state.suggestions?.map((item: any, index: number) => (
                    <button
                        key={index}
                        onKeyDown={e => {
                            e.preventDefault();
                            if (e.key === "Enter") {
                                localDispatch({ type: "SET_SUGGESTIONS", payload: undefined });
                                localDispatch({ type: "SET_QUERY", payload: item.title });
                                dispatch({ type: "SET_FORM_DATAS", payload: { location: item.title } });
                            } else if (e.key === "ArrowDown") {
                                const btn = document.querySelector(`.suggest-${index !== state.suggestions.length - 1 ? index + 1 : 0}`) as HTMLElement;
                                btn?.focus();
                            } else if (e.key === "ArrowUp") {
                                const btn = document.querySelector(`.suggest-${index !== 0 ? index - 1 : state.suggestions.length - 1}`) as HTMLElement;
                                btn?.focus();
                            }
                        }}
                        onClick={() => {
                            localDispatch({ type: "SET_SUGGESTIONS", payload: undefined });
                            localDispatch({ type: "SET_QUERY", payload: item.title });
                            dispatch({ type: "SET_FORM_DATAS", payload: { location: item.title } });
                        }}
                        className={`btn-location text-left w-full pl-3 text-md max-sm:pl-2 max-sm:text-xs focus:bg-neutral-200 focus:outline-none hover:bg-neutral-200 suggest-${index}`}
                    >
                        {item.title}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchInput;
