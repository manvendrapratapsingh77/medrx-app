"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';

interface ModalProps {
  /**
   * The text shown on the button that opens the modal.
   */
  triggerLabel: string;
  /**
   * Modal title.
   */
  title: string;
  /**
   * Optional description under the title.
   */
  description?: string;
  /**
   * Content of the modal body.
   */
  children: React.ReactNode;
  /**
   * Optional footer actions (e.g., Save/Cancel buttons).
   */
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  triggerLabel,
  title,
  description,
  children,
  footer,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="text-primary border-primary hover:bg-primary-light"
        onClick={() => setOpen(true)}
      >
        {triggerLabel}
      </Button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-primary">{title}</h2>
                {description && (
                  <p className="mt-2 text-sm text-secondary">{description}</p>
                )}
              </div>
              <button
                type="button"
                className="text-secondary transition hover:text-primary"
                onClick={() => setOpen(false)}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <div className="mt-6">{children}</div>
            {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
