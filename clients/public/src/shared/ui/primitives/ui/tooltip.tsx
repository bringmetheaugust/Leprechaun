'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '@primitives/lib/utils'

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
            'z-50 overflow-hidden rounded border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className
        )}
        {...props}
    />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

interface TooltipWrapperProps {
    content: React.ReactNode
    isOpen?: boolean
    handleOpen?: (state: boolean) => void
    disabled?: boolean
}

type TooltipWrapperControlledProps = Required<Pick<TooltipWrapperProps, 'isOpen' | 'handleOpen'>> & TooltipWrapperProps;

const TooltipWrapper: React.FC<React.PropsWithChildren<TooltipWrapperProps | TooltipWrapperControlledProps>> = ({
    children, content, disabled, isOpen, handleOpen,
}) => (
    <TooltipPrimitive.Provider>
        <TooltipPrimitive.Root open={isOpen} onOpenChange={handleOpen}>
            <TooltipPrimitive.Trigger asChild>
                {children}
            </TooltipPrimitive.Trigger>
            {!disabled && (
                <TooltipContent side='bottom'>
                    <TooltipPrimitive.Arrow />
                    {content}
                </TooltipContent>
            )}
        </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
);

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, TooltipWrapper }
