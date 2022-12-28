import React from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';

export type HoverCardProps = React.ComponentProps<typeof HoverCard.Root> & {
    title?: string,
};
const HoverCardComponent = ({children, open, onOpenChange}: HoverCardProps) => (
    <HoverCard.Root open={open} onOpenChange={onOpenChange}>
        <HoverCard.Portal>
            <HoverCard.Content className="HoverCardContent" sideOffset={5}>
                {children}
                <HoverCard.Arrow className="HoverCardArrow"/>
            </HoverCard.Content>
        </HoverCard.Portal>
    </HoverCard.Root>
);

export default HoverCardComponent;
