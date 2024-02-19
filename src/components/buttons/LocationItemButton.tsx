import React, { Dispatch, KeyboardEvent } from "react";
import { LocationInputActionType, LocationInputStateType, LocationType } from "@/components/inputs/LocationInput";
import type { OrderModalActionType } from "@/components/modals/OrderModal";

type LocationItemType = {
    index: number;
    location: LocationType;
    dispatch: Dispatch<OrderModalActionType>;
    localDispatch: Dispatch<LocationInputActionType>;
    state: LocationInputStateType;
};

export default function ({ index, location, localDispatch, dispatch, state }: LocationItemType) {
    const handleSubmit = () => {
        localDispatch({ type: "query", payload: location.name });
        dispatch({
            type: "orderFormData",
            payload: { location },
        });
        localDispatch({ type: "suggestions", payload: undefined });
    };

    return (
        <button
            onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
                e.preventDefault();
                if (e.key === "Enter") {
                    handleSubmit();
                } else if (e.key === "ArrowDown") {
                    (document.querySelector(`.suggest-${index !== state.suggestions.length - 1 ? index + 1 : 0}`) as HTMLElement).focus();
                } else if (e.key === "ArrowUp") {
                    (document.querySelector(`.suggest-${index !== 0 ? index - 1 : state.suggestions.length - 1}`) as HTMLElement).focus();
                }
            }}
            onClick={handleSubmit}
            className={`w-full text-left text-md pl-3 focus:bg-neutral-200 focus:outline-none hover:bg-neutral-200 max-lg:text-sm max-sm:pl-2 max-sm:text-xs suggest-${index}`}
        >
            {location.name}
        </button>
    );
}
