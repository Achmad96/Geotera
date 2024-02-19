import React, { useEffect, useReducer, useRef, KeyboardEvent, ChangeEvent, Dispatch } from "react";
import type { OrderModalActionType } from "@/components/modals/OrderModal";
import { debounce } from "lodash";
import LocationItemButton from "@/components/buttons/LocationItemButton";

export type LocationInputActionType = {
    type: "query" | "suggestions" | "currentLocation";
    payload?: any;
};

type locationsResponseType = {
    address: {
        label: string;
    };
    position: {
        lng: number;
        lat: number;
    };
};

export type LocationInputStateType = {
    query: string;
    suggestions: locationsResponseType[];
    currentLocation: LocationType;
};

export interface LocationType {
    name: string;
    long: number;
    lat: number;
}

const replaceWith: any = {
    "Jalan ": "Jl.",
};

const reducer = (state: LocationInputStateType, action: LocationInputActionType): LocationInputStateType => {
    switch (action.type) {
        case "query":
            return { ...state, query: action.payload };
        case "suggestions":
            return { ...state, suggestions: action.payload };
        case "currentLocation":
            return { ...state, currentLocation: action.payload };
        default:
            return state;
    }
};

const LocationInput = ({ dispatch }: { dispatch: Dispatch<OrderModalActionType> }) => {
    const [state, localDispatch] = useReducer(reducer, {
        query: "",
        suggestions: [],
        currentLocation: { name: "", long: 0, lat: 0 },
    });
    const ref = useRef<HTMLInputElement | null>(null);

    const fetchSuggestions = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_HERE_API_URL;
        const apiKey = process.env.NEXT_PUBLIC_HERE_API_KEY;
        if (!state.currentLocation.long || !state.currentLocation.lat) {
            const permissionStatus: PermissionStatus = await navigator.permissions.query({
                name: "geolocation",
            });
            if (permissionStatus.state === "granted") {
                navigator.geolocation.getCurrentPosition(
                    (position: GeolocationPosition) => {
                        localDispatch({
                            type: "currentLocation",
                            payload: {
                                name: "Your Location",
                                lat: position.coords.latitude,
                                long: position.coords.longitude,
                            },
                        });
                    },
                    (err: GeolocationPositionError) => console.log(err)
                );
            }
        }

        const params: URLSearchParams = new URLSearchParams({
            q: state.query as string,
            in: "countryCode:IDN",
            at: `${state.currentLocation.lat},${state.currentLocation.long}`,
            lang: "id-ID",
            limit: "5",
            apiKey: apiKey as string,
        });
        try {
            const response = await fetch(`${apiUrl}/geocode?${params}`);
            const data = await response.json();
            localDispatch({ type: "suggestions", payload: data.items });
        } catch (error) {
            console.error("Error fetching data from HERE API", error);
        }
    };

    const debouncedFetchSuggestions = debounce(fetchSuggestions, 1000);
    useEffect(() => {
        if (state.query.length > 2 && state.suggestions !== undefined) {
            debouncedFetchSuggestions();
        } else {
            localDispatch({ type: "suggestions", payload: [] });
        }

        return () => debouncedFetchSuggestions.cancel();
    }, [state.query]);

    return (
        <div className="flex flex-col relative w-full justify-start gap-5">
            <p>Location</p>
            <input
                name="location"
                type="text"
                ref={ref}
                value={state.query}
                autoComplete="off"
                onChange={(e: ChangeEvent<HTMLInputElement>) => localDispatch({ type: "query", payload: e.target.value })}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                    if (state.suggestions?.length > 0 && e.key === "ArrowDown") {
                        e.preventDefault();
                        const btn = document.querySelector(".suggest-0") as HTMLElement;
                        btn?.focus();
                    }
                }}
                placeholder="Search for locations"
                className="w-[90%] pl-2 border-b outline-none h-10 max-sm:text-sm"
                required
            />
            <div
                className={"absolute bg-white w-[80%] hover:cursor-pointer"}
                style={{
                    top: `${ref.current && ref.current?.offsetHeight + ref.current?.scrollHeight + 10}px`,
                }}
            >
                {state.suggestions?.map((item: locationsResponseType, index: number) => {
                    const location: LocationType = {
                        name: item.address.label.replace(/Jalan |, [0-9]{5}, Indonesia/g, (m: any) => (!replaceWith[m] ? "" : replaceWith[m])),
                        long: item.position.lng,
                        lat: item.position.lat,
                    };
                    return <LocationItemButton key={index} index={index} state={state} location={location} localDispatch={localDispatch} dispatch={dispatch} />;
                })}
            </div>
        </div>
    );
};

export default LocationInput;
