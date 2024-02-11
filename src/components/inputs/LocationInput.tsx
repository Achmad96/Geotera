import React, {
  useEffect,
  useReducer,
  useRef,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import type { OrderModalActionType } from "@/components/modals/OrderModal";
import { debounce } from "lodash";
import LocationItemButton from "@/components/buttons/LocationItemButton";

export type LocationInputActionType = {
  type: "SET_QUERY" | "SET_SUGGESTIONS" | "SET_CURRENT_LOCATION";
  payload?: any;
};

export type LocationInputStateType = {
  query: string;
  suggestions: LocationItemType[];
  location: LocationType;
};

type LocationType = {
  long: number;
  lat: number;
};
interface LocationItemType extends LocationType {
  name: string;
}
const replaceWith: any = {
  "Jalan ": "Jl.",
};

const reducer = (
  state: LocationInputStateType,
  action: LocationInputActionType,
): LocationInputStateType => {
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

const LocationInput = ({
  dispatch,
}: {
  dispatch: (action: OrderModalActionType) => void;
}) => {
  const [state, localDispatch] = useReducer(reducer, {
    query: "",
    suggestions: [],
    location: { long: 0, lat: 0 },
  });
  const ref = useRef<HTMLInputElement | null>(null);

  const fetchSuggestions = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_HERE_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_HERE_API_KEY;
    if (!state.location.long || !state.location.lat) {
      const permissionStatus: PermissionStatus =
        await navigator.permissions.query({
          name: "geolocation",
        });
      if (permissionStatus.state === "granted") {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            localDispatch({
              type: "SET_CURRENT_LOCATION",
              payload: {
                lat: position.coords.latitude,
                long: position.coords.longitude,
              },
            });
          },
          (err: GeolocationPositionError) => console.log(err),
        );
      }
    }

    const params: URLSearchParams = new URLSearchParams({
      q: state.query as string,
      in: "countryCode:IDN",
      at: `${state.location.lat},${state.location.long}`,
      lang: "id-ID",
      limit: "5",
      apiKey: apiKey as string,
    });
    try {
      const response = await fetch(`${apiUrl}/geocode?${params}`);
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
    <div className="flex flex-col justify-start gap-5 w-full relative">
      <p>Location</p>
      <input
        name="location"
        type="text"
        ref={ref}
        value={state.query}
        autoComplete="off"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          localDispatch({ type: "SET_QUERY", payload: e.target.value })
        }
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (state.suggestions?.length > 0) {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              const btn = document.querySelector(".suggest-0") as HTMLElement;
              btn?.focus();
            }
          }
        }}
        placeholder="Search for locations"
        className="w-[90%] outline-none h-10 max-sm:text-sm pl-2 border-b"
        required
      />
      <div
        className={"absolute bg-white w-[80%] hover:cursor-pointer"}
        style={{
          top: `${ref.current && ref.current?.offsetHeight + ref.current?.scrollHeight + 10}px`,
        }}
      >
        {state.suggestions?.map((item: any, index: number) => {
          const location: string = item.address.label.replace(
            /Jalan |, [0-9]{5}, Indonesia/g,
            (m: any) => (!replaceWith[m] ? "" : replaceWith[m]),
          );
          return (
            <LocationItemButton
              key={index}
              index={index}
              state={state}
              location={location}
              localDispatch={localDispatch}
              dispatch={dispatch}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LocationInput;
