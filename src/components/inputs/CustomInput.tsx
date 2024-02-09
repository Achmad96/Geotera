import { ChangeEventHandler, HTMLInputTypeAttribute, ReactNode, memo } from "react";

const CustomInput = memo(
    ({
        name,
        type,
        onChange,
        label,
        placeholder = "",
        required = false,
        isTextArea = false,
    }: {
        name: string;
        type?: HTMLInputTypeAttribute;
        label?: string;
        onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
        placeholder?: string;
        required?: boolean;
        isTextArea?: boolean;
    }): ReactNode => {
        return (
            <div className="flex flex-col justify-start gap-5">
                <p>
                    {!label
                        ? name.replace(/\b\w/g, function (m) {
                              return m.toUpperCase();
                          })
                        : label}
                </p>
                {isTextArea ? (
                    <textarea name={name} placeholder={placeholder} className="w-[90%] min-h-10 max-h-14 outline-none border-b pl-2" onChange={onChange} required={required} autoComplete="off" />
                ) : (
                    <input name={name} type={type} placeholder={placeholder} className="w-[90%] h-10 outline-none border-b pl-2" onChange={onChange} required={required} autoComplete="off" />
                )}
            </div>
        );
    }
);

export default CustomInput;
