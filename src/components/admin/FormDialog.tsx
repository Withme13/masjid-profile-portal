
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type FormDialogProps = {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
  children: React.ReactNode;
  submitLabel?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
};

const FormDialog: React.FC<FormDialogProps> = ({
  title,
  description,
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
  children,
  submitLabel = 'Save',
  maxWidth = 'md',
}) => {
  // Map maxWidth prop to appropriate Tailwind classes
  const maxWidthClasses = {
    sm: 'sm:max-w-md',
    md: 'sm:max-w-xl',
    lg: 'sm:max-w-2xl',
    xl: 'sm:max-w-3xl',
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={`${maxWidthClasses[maxWidth]} max-h-[85vh] overflow-y-auto`}>
        <form onSubmit={onSubmit} className="space-y-6">
          <DialogHeader className="pb-2">
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          
          <div className="py-2 space-y-5 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 180px)' }}>
            {children}
          </div>
          
          <DialogFooter className="sticky bottom-0 pt-4 bg-background flex justify-end space-x-2 border-t mt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Processing...
                </>
              ) : (
                submitLabel
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
