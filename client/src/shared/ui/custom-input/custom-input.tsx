"use client";
import React, { ChangeEvent, FC } from "react";
import classes from "./custom-input.module.scss";

interface CustomInputProps {
  label?: string;
  name: string;
  type?: "text" | "email" | "password" | "number";
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  errorMessage?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

const CustomInput: FC<CustomInputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  errorMessage,
  required = false,
  disabled = false,
  className,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
  };

  return (
    <div className={`${classes[`custom-input`]} ${className}`}>
      {label && (
        <label className={classes["custom-input__label"]}>{label}:</label>
      )}

      <input
        className={classes["custom-input__box"]}
        type={type}
        name={name}
        defaultValue={value?.toString()}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
      {errorMessage && (
        <div className={classes["custom-input__error"]}>{errorMessage}</div>
      )}
    </div>
  );
};

export default CustomInput;
