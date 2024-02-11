import {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  FormEvent,
  KeyboardEvent,
  useRef,
} from "react";

type PropsType = {
  name: string;
  type?: HTMLInputTypeAttribute;
  label?: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  placeholder?: string;
  required?: boolean;
  isTextArea?: boolean;
};

const CustomInput = ({
  name,
  type,
  onChange,
  label,
  placeholder = "",
  required = false,
  isTextArea = false,
}: PropsType) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  return (
    <div className="flex flex-col justify-start gap-5">
      <p>{!label ? name.replace(/\b\w/g, (m) => m.toUpperCase()) : label}</p>
      {isTextArea ? (
        <textarea
          ref={ref}
          name={name}
          placeholder={placeholder}
          className="w-[90%] min-h-10 max-h-[120px] overflow-y-hidden outline-none border-b pl-2 resize-none"
          onChange={onChange}
          required={required}
          autoComplete="off"
          rows={1}
          onInput={(e: FormEvent<HTMLTextAreaElement>) => {
            if (ref.current && e.currentTarget.scrollHeight <= 120) {
              ref.current.style.height = "auto";
              ref.current.style.height = `${e.currentTarget.scrollHeight}px`;
            }
          }}
          onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
            if (
              ref.current &&
              e.key === "Enter" &&
              ref.current.scrollHeight >= 120
            ) {
              e.preventDefault();
            }
          }}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className="w-[90%] h-10 outline-none border-b pl-2"
          onChange={onChange}
          required={required}
          autoComplete="off"
        />
      )}
    </div>
  );
};

export default CustomInput;
