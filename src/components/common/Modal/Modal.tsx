"use client";

import { ReactNode, useEffect, useState, KeyboardEvent, memo } from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.scss";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
};

const Modal = memo(({ isOpen, onClose, title, children, className = "" }: ModalProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let root = document.getElementById("modal-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "modal-root";
      document.body.appendChild(root);
    }
    setContainer(root);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey as any);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey as any);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !container) return null;

  return createPortal(
    <div className={styles.overlay} role="dialog" aria-modal="true" onClick={onClose}>
      <div
        className={styles.panel + (className ? ` ${className}` : "")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <button aria-label="Close" className={styles.close} onClick={onClose} type="button">
            ×
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    container
  );
});

Modal.displayName = "Modal.Modal";

export default Modal;
