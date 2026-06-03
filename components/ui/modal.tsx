import React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'; // shadcn Dialog wrapper
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

/**
 * Reusable modal (dialog) component using shadcn/ui Dialog.
 * - Styled with MedRx primary colors.
 * - Accepts custom trigger button label and optional footer.
 */
export const Modal: React.FC<ModalProps> = ({
  triggerLabel,
  title,
  description,
  children,
  footer,
}) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" className="text-primary border-primary hover:bg-primary-light">
        {triggerLabel}
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle className="text-primary">{title}</DialogTitle>
        {description && (
          <DialogDescription className="text-secondary">
            {description}
          </DialogDescription>
        )}
      </DialogHeader>
      <div className="py-4">{children}</div>
      {footer && <DialogFooter>{footer}</DialogFooter>}
    </DialogContent>
  </Dialog>
);

export default Modal;
