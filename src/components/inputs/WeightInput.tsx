import { ChangeEvent } from "react";
import type { StateType, ActionType } from "@/components/modals/OrderModal";

const WeightInput = ({ state, dispatch }: { state: StateType; dispatch: (action: ActionType) => void }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, min, max } = e.currentTarget;
        const weight: number = Math.max(Number(min), Math.min(Number(max), Number(value)));
        dispatch({ type: "SET_FORM_DATAS", payload: { weight, prices: weight ? weight * 0.9 : 90 } });
    };

    return (
        <div className="flex justify-start items-end gap-5">
            <div className="flex flex-col w-[74%]">
                <p>Weight (g)</p>
                <input
                    name="weight"
                    type="number"
                    value={state.formDatas.weight}
                    placeholder="Garbage weight"
                    onChange={handleChange}
                    className="w-full h-10 outline-none border-b pl-2"
                    min={100}
                    max={10000}
                    required
                />
            </div>
            <div className="flex gap-3 items-center w-full">
                <p>Rp</p>
                <input type="number" name="prices" className="w-[74%] h-10 outline-none border-b pl-2" placeholder="prices" value={state.formDatas?.prices ? state.formDatas.prices : 90} disabled />
            </div>
        </div>
    );
};

export default WeightInput;
