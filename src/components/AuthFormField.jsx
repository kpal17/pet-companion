import React from "react";

const icons = {
  user: (
    <path d="M12 12.5c2.35 0 4.25-1.9 4.25-4.25S14.35 4 12 4 7.75 5.9 7.75 8.25 9.65 12.5 12 12.5Zm0 2.25c-3.35 0-7 1.78-7 4.2V20h14v-1.05c0-2.42-3.65-4.2-7-4.2Z" />
  ),
  email: (
    <path d="M4 6.5h16v11H4v-11Zm8 6.3 8-5.1M12 12.8 4 7.7" />
  ),
  lock: (
    <path d="M7 10.25h10v9.25H7v-9.25Zm2.25 0V7.75a2.75 2.75 0 0 1 5.5 0v2.5M12 14.1v2.2" />
  ),
  shield: (
    <path d="M12 4.25 18 6.7v4.45c0 3.8-2.55 7.25-6 8.35-3.45-1.1-6-4.55-6-8.35V6.7l6-2.45Zm-2.35 7.6 1.7 1.75 3.25-3.55" />
  ),
};

export default function AuthFormField({
  id,
  label,
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
}) {
  return (
    <div className="signup-field">
      <label className="signup-field__label" htmlFor={id}>
        {label}
      </label>
      <div className="signup-field__control">
        <svg
          className="signup-field__icon"
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill={icon === "user" ? "currentColor" : "none"}
          stroke={icon === "user" ? "none" : "currentColor"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {icons[icon]}
        </svg>
        <input
          id={id}
          className="signup-field__input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required
        />
      </div>
    </div>
  );
}
