import { ChangeEventHandler, HTMLInputTypeAttribute, FormEvent, KeyboardEvent, useRef } from "react";

type PropsType = {
    name: string;
    type?: HTMLInputTypeAttribute;
    label?: string;
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    placeholder?: string;
    required?: boolean;
};

const DateInput = ({ name, type, onChange, label, placeholder = "", required = true }: PropsType) => {
    return (
        <div className="flex flex-col justify-start gap-5">
            {label && <p>{label}</p>}
            <input name={name} type={type} placeholder={placeholder} className="w-[90%] h-10 outline-none border-b pl-2" onChange={onChange} required={required} autoComplete="off" />
        </div>
    );
};

export default DateInput;
