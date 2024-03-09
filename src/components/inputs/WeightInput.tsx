import { ChangeEvent, Dispatch } from "react";
import type {
  OrderModalStateType,
  OrderModalActionType,
} from "@/components/modals/OrderModal";

const WeightInput = ({
  state,
  dispatch,
}: {
  state: OrderModalStateType;
  dispatch: Dispatch<OrderModalActionType>;
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, min, max } = e.currentTarget;
    const weight: number = Math.max(
      Number(min),
      Math.min(Number(max), Number(value)),
    );
    dispatch({
      type: "orderFormData",
      payload: { weight, prices: weight ? Math.ceil(weight * 0.9) : 90 },
    });
  };

  return (
    <div className="flex items-end justify-start gap-5">
      <div className="flex w-[74%] flex-col">
        <p>Weight (g)</p>
        <input
          name="weight"
          type="number"
          value={state.formData?.weight ? state.formData?.weight : 100}
          placeholder="Garbage weight"
          onChange={handleChange}
          className="h-10 w-full border-b pl-2 outline-none"
          min={100}
          max={10000}
          required
        />
      </div>
      <div className="flex w-full items-center gap-3">
        <p>Rp</p>
        <input
          type="number"
          name="prices"
          className="h-10 w-[74%] border-b pl-2 outline-none"
          placeholder="prices"
          value={state.formData?.prices ? state.formData.prices : 90}
          disabled
        />
      </div>
    </div>
  );
};

export default WeightInput;
