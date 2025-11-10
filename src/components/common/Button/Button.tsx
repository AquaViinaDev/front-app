import { ButtonHTMLAttributes, forwardRef, memo, ReactNode } from "react";
import classNames from "classnames";

import styles from "./Button.module.scss";

export type ButtonProps = {
  buttonType?: "bigButton" | "smallButton";
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
  theme?: 'secondary' | 'primary' 
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    ({ buttonType = "bigButton", className, disabled = false, children, theme = "primary", ...props }, ref) => {
      return (
        <button
          ref={ref}
          disabled={disabled}
          className={classNames(className, styles.root, styles[buttonType as keyof typeof styles], styles[`root${theme.charAt(0).toUpperCase() + theme.slice(1)}` as keyof typeof styles], {
            [styles.disabled]: disabled,
          })}
          {...props}
        >
          {children}
        </button>
      );
    }
  )
);

Button.displayName = "Button";

export default Button;
