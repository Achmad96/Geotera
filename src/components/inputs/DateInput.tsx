import { ChangeEventHandler, HTMLInputTypeAttribute, FormEvent, KeyboardEvent, useRef } from "react";

type PropsType = {
    name: string;
    type?: HTMLInputTypeAttribute;
    label?: string;
    placeholder?: string;
    required?: boolean;
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

const DateInput = ({ name, type, onChange, label, placeholder = "" }: PropsType) => {
    return (
        <div className="flex flex-col justify-start gap-5">
            {label && <p>{label}</p>}
            <input name={name} type={type} placeholder={placeholder} className="w-[90%] h-10 outline-none border-b pl-2" onChange={onChange} autoComplete="off" required />
        </div>
    );
};

export default DateInput;
