import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import { OrderTypes } from "@/types";

const SearchInput = ({ setDatas }: { setDatas: Function }) => {
    const [query, setQuery]: [string, Function] = useState("");
    const [suggestions, setSuggestions]: [string[], Function] = useState([]);
    const fetchSuggestions = async () => {
        const apiUrl = `https://autocomplete.search.hereapi.com/v1/autocomplete`;
        const apiKey = process.env.NEXT_PUBLIC_HERE_API_KEY;
        const params = new URLSearchParams({ q: query as string, apiKey: apiKey as string });

        try {
            const response = await fetch(`${apiUrl}?${params}`);
            const data = await response.json();
            setSuggestions(data.items);
        } catch (error) {
            console.error("Error fetching data from HERE API", error);
        }
    };

    const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);
    useEffect(() => {
        if (query.length > 2 && suggestions !== undefined) {
            debouncedFetchSuggestions();
        } else {
            setSuggestions([]);
        }

        return () => {
            debouncedFetchSuggestions.cancel();
        };
    }, [query]);

    return (
        <div className="w-full">
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search locations" className="w-[80%] outline-none border-b-1" required />
            <ul className="w-full hover:cursor-pointer">
                {suggestions?.map((item: any, index: number) => (
                    <li
                        key={index}
                        onClick={() => {
                            setSuggestions(undefined);
                            setQuery(item.title);
                            setDatas((prev: OrderTypes) => ({ ...prev, location: item.title }));
                        }}
                        className="hover:bg-neutral-200 w-max text-sm"
                    >
                        {item.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchInput;
