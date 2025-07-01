import { ButtonHTMLAttributes, forwardRef, memo, ReactNode } from "react";
import classNames from "classnames";

import styles from "./Button.module.scss";

export type ButtonProps = {
  buttonType?: "bigButton" | "smallButton";
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    ({ buttonType = "bigButton", className, disabled = false, children, ...props }, ref) => {
      return (
        <button
          ref={ref}
          disabled={disabled}
          className={classNames(className, styles.root, styles[buttonType as keyof typeof styles], {
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
