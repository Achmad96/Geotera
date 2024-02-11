import React, { KeyboardEvent } from "react";
import {
  LocationInputActionType,
  LocationInputStateType,
} from "@/components/inputs/LocationInput";
import { OrderModalActionType } from "@/types";

type LocationItemType = {
  index: number;
  location: string;
  dispatch: (action: OrderModalActionType) => void;
  localDispatch: (action: LocationInputActionType) => void;
  state: LocationInputStateType;
};

export default function ({
  index,
  location,
  localDispatch,
  dispatch,
  state,
}: LocationItemType) {
  return (
    <button
      onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (e.key === "Enter") {
          localDispatch({ type: "SET_QUERY", payload: location });
          dispatch({
            type: "SET_FORM_DATAS",
            payload: { location: location },
          });
          localDispatch({
            type: "SET_SUGGESTIONS",
            payload: undefined,
          });
        } else if (e.key === "ArrowDown") {
          const btn = document.querySelector(
            `.suggest-${index !== state.suggestions.length - 1 ? index + 1 : 0}`,
          ) as HTMLElement;
          btn?.focus();
        } else if (e.key === "ArrowUp") {
          const btn = document.querySelector(
            `.suggest-${index !== 0 ? index - 1 : state.suggestions.length - 1}`,
          ) as HTMLElement;
          btn?.focus();
        }
      }}
      onClick={() => {
        localDispatch({ type: "SET_QUERY", payload: location });
        dispatch({
          type: "SET_FORM_DATAS",
          payload: { location: location },
        });
        localDispatch({ type: "SET_SUGGESTIONS", payload: undefined });
      }}
      className={`w-full text-left text-md pl-3 focus:bg-neutral-200 focus:outline-none hover:bg-neutral-200 max-lg:text-sm max-sm:pl-2 max-sm:text-xs suggest-${index}`}
    >
      {location}
    </button>
  );
}
