import React, { memo, useEffect, useReducer, useRef } from "react";
import { debounce } from "lodash";
import { ActionType } from "@/components/modals/OrderModal";

type SearchActionType = {
    type: "SET_QUERY" | "SET_SUGGESTIONS" | "SET_CURRENT_LOCATION";
    payload?: any;
};

type LocationType = {
    long: number;
    lat: number;
};

type StateType = {
    query: string;
    suggestions: string[];
    location: LocationType;
};

const matchersLocation: any = {
    "Jalan ": "Jl.",
    ", Indonesia": "",
};

const reducer = (state: StateType, action: SearchActionType): StateType => {
    switch (action.type) {
        case "SET_QUERY":
            return { ...state, query: action.payload };
        case "SET_SUGGESTIONS":
            return { ...state, suggestions: action.payload };
        case "SET_CURRENT_LOCATION":
            return { ...state, location: action.payload };
        default:
            return state;
    }
};

const LocationInput = memo(({ dispatch }: { dispatch: (action: ActionType) => void }) => {
    const [state, localDispatch] = useReducer(reducer, { query: "", suggestions: [], location: { long: 0, lat: 0 } });
    const ref = useRef<HTMLInputElement | null>(null);

    const fetchSuggestions = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_HERE_API_URL;
        const apiKey = process.env.NEXT_PUBLIC_HERE_API_KEY;
        if (!state.location.long || !state.location.lat) {
            const permissionStatus = await navigator.permissions.query({ name: "geolocation" });
            if (permissionStatus.state === "granted") {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        localDispatch({ type: "SET_CURRENT_LOCATION", payload: { lat: position.coords.latitude, long: position.coords.longitude } });
                    },
                    err => console.log(err)
                );
            }
        }

        const params = new URLSearchParams({
            q: state.query as string,
            in: !state.location.long || !state.location.lat ? "countryCode:IDN" : `circle:${state.location.lat},${state.location.long};r=10000`,
            lang: "id-ID",
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

    const debouncedFetchSuggestions = debounce(fetchSuggestions, 1000);

    useEffect(() => {
        if (state.query.length > 2 && state.suggestions !== undefined) {
            debouncedFetchSuggestions();
        } else {
            localDispatch({ type: "SET_SUGGESTIONS", payload: [] });
        }

        return () => debouncedFetchSuggestions.cancel();
    }, [state.query]);

    return (
        <div className="flex flex-col justify-start gap-5 w-full">
            <p>Location</p>
            <input
                name="location"
                type="text"
                ref={ref}
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
                className="w-[90%] outline-none h-10 border-b-1 max-sm:text-sm pl-2"
                required
            />
            <div
                className={"absolute bg-white w-[80%] hover:cursor-pointer"}
                style={{ top: `${ref.current && Math.floor(ref.current.getBoundingClientRect().bottom - ref.current.getBoundingClientRect().height - 10)}px` }}
            >
                {state.suggestions?.map((item: any, index: number) => {
                    const location: any = item.address.label.replace(/Jalan |, [0-9]{5}, Indonesia/g, function (m: string) {
                        return matchersLocation[m];
                    });
                    return (
                        <button
                            key={index}
                            onKeyDown={e => {
                                e.preventDefault();
                                if (e.key === "Enter") {
                                    localDispatch({ type: "SET_SUGGESTIONS", payload: undefined });
                                    localDispatch({ type: "SET_QUERY", payload: location });
                                    dispatch({ type: "SET_FORM_DATAS", payload: { location: location } });
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
                                localDispatch({ type: "SET_QUERY", payload: location });
                                dispatch({ type: "SET_FORM_DATAS", payload: { location: location } });
                            }}
                            className={`text-left w-full pl-3 text-md focus:bg-neutral-200 focus:outline-none hover:bg-neutral-200 max-lg:text-sm max-sm:pl-2 max-sm:text-xs suggest-${index}`}
                        >
                            {location}
                        </button>
                    );
                })}
            </div>
        </div>
    );
});

export default LocationInput;
