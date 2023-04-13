'use client'
import { FC, HTMLAttributes, forwardRef, useState, useEffect, ButtonHTMLAttributes } from 'react'
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';


const buttonVariants = cva(
    'flex items-center gap-2 px-1 py-1 border border-transparent rounded-md transition-colors duration-200', {
        variants: {
            size: {
                default: 'px-0 py-0 text-sm',
                sm: 'px-1 py-1 text-sm',
                md: 'px-3 py-3',
                lg: 'px-4 py-4 text-lg',
            },
            variant: {
                default: 'text-slate-900 bg-slate-50 dark:text-slate-50 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-700',
                ghost: 'text-slate-900 bg-transparent dark:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-700',
                outline: 'text-slate-900 hover:bg-slate-800 dark:text-slate-50 hover:text-slate-100 dark:hover:bg-slate-50 dark:hover:text-slate-900 border-slate-900 dark:border-slate-50',
            }
        },
        defaultVariants: {
            size: 'default',
            variant: 'default'
        }
    }
) 

interface ButtonProps extends HTMLAttributes<HTMLButtonElement>,
VariantProps<typeof buttonVariants> { type?: "button" | "submit" | "reset" | undefined}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    children, size, className, variant, type, ...props
}, ref) => {
    const [hasMounted, setHasMounted] = useState(false);
  
    useEffect(() => {
      setHasMounted(true);
    }, []);
  
    if (!hasMounted) {
      return null;
    }
    
    return <button ref={ref} type={type} {...props} className={cn(buttonVariants({className, size, variant}))}>
        {children}
    </button>
});

Button.displayName = 'Button'

export default Button