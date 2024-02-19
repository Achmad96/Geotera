import { ChangeEvent, Dispatch } from "react";
import type { OrderModalStateType, OrderModalActionType } from "@/components/modals/OrderModal";

const WeightInput = ({ state, dispatch }: { state: OrderModalStateType; dispatch: Dispatch<OrderModalActionType> }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, min, max } = e.currentTarget;
        const weight: number = Math.max(Number(min), Math.min(Number(max), Number(value)));
        dispatch({
            type: "orderFormData",
            payload: { weight, prices: weight ? Math.ceil(weight * 0.9) : 90 },
        });
    };

    return (
        <div className="flex justify-start items-end gap-5">
            <div className="flex flex-col w-[74%]">
                <p>Weight (g)</p>
                <input
                    name="weight"
                    type="number"
                    value={state.formData?.weight ? state.formData?.weight : 100}
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
                <input type="number" name="prices" className="w-[74%] h-10 outline-none border-b pl-2" placeholder="prices" value={state.formData?.prices ? state.formData.prices : 90} disabled />
            </div>
        </div>
    );
};

export default WeightInput;
