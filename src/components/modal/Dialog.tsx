import * as Dialog from '@radix-ui/react-dialog';
import { useTransition, animated, config } from 'react-spring';
import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog'
import './Dialog.css'
import { Cross2Icon } from '@radix-ui/react-icons';
export type ModalProps = React.ComponentProps<typeof DialogPrimitive.Root> & {
    overlay?: boolean,
    title?: string,
};

const Modal = ({children, open, onOpenChange, ...props}:ModalProps) =>{
    const transitions = useTransition(open, {
        from: { opacity: 0, y: -10 },
        enter: { opacity: 1, y: 0 },
        leave: { opacity: 0, y: 10 },
        config: config.stiff,
    });
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            {transitions((styles, item) =>
                item ? (
                    <>
                        <Dialog.Portal>
                            <Dialog.Overlay className="DialogOverlay" />
                            <Dialog.Content className="DialogContent">
                                <Dialog.Title className="DialogTitle">{props.title}</Dialog.Title>
                                <Dialog.Description className="DialogDescription">
                                    Make changes to your profile here. Click save when you're done.
                                </Dialog.Description>
                                {children}
                                <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                                    <Dialog.Close asChild>
                                        <button className="Button green">Save changes</button>
                                    </Dialog.Close>
                                </div>
                                <Dialog.Close asChild>
                                    <button className="close" aria-label="Close">
                                        <Cross2Icon />
                                    </button>
                                </Dialog.Close>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </>
                ) : null
            )}
        </Dialog.Root>
    );
}
export default Modal;

