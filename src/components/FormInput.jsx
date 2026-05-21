import { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

const FormInput = forwardRef(function FormInput(
  {
    id,
    label,
    type = "text",
    error,
    touched,
    hint,
    rightLabel,
    leftIcon,
    required = false,
    className = "",
    ...rest
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  const hasError = touched && !!error;

  const inputBase =
    "w-full rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none transition-all duration-150 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const inputPadding = [
    leftIcon ? "pl-10" : "pl-3.5",
    isPassword ? "pr-10" : "pr-3.5",
    "py-2.5",
  ].join(" ");

  const inputBorder = hasError
    ? "border-destructive focus:ring-destructive/30 focus:border-destructive"
    : "border-input focus:ring-ring focus:border-ring";

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {(label || rightLabel) && (
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={id}
              className="text-sm font-medium text-foreground select-none"
            >
              {label}
              {required && (
                <span className="ml-0.5 text-destructive" aria-hidden="true">
                  *
                </span>
              )}
            </label>
          )}
          {rightLabel && (
            <span className="text-xs text-muted-foreground">{rightLabel}</span>
          )}
        </div>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={id}
          type={resolvedType}
          aria-invalid={hasError}
          aria-describedby={
            [hasError && `${id}-error`, hint && `${id}-hint`]
              .filter(Boolean)
              .join(" ") || undefined
          }
          className={`${inputBase} ${inputPadding} ${inputBorder}`}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {hint && !hasError && (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}

      {hasError && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs text-destructive flex items-center gap-1"
        >
          <svg
            className="w-3 h-3 flex-shrink-0"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 3.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4.5zm0 6.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
});

export default FormInput;
