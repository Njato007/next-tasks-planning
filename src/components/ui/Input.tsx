'use client'
import { FC, HTMLAttributes, forwardRef, useState, useEffect, InputHTMLAttributes, HTMLInputTypeAttribute } from 'react'
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';


const inputVariants = cva(
    `dark:text-slate-100 text-slate-800 bg-slate-50 dark:bg-slate-900 
    focus:bg-slate-100 dark:focus:bg-slate-800 outline-none focus:outline-blue-500
    focus:bg-slate-50 border border-blue-500 dark:border-blue-500  focus:border-transparent dark:focus:border-transparent
    dark:focus:outline-blue-500 dark:focus:bg-slate-900 rounded-sm disabled:outline-none disabled:border-transparent dark:disabled:border-transparent
    disabled:bg-white-50/90 disabled:dark:bg-slate-800`, {
        variants: {
            size: {
                default: 'px-0 py-0',
                sm: 'px-2 py-1 text-xs',
                md: 'px-2 py-2 text-sm',
                lg: 'px-2 py-3',
            },
            variant: {
                default: ``,
                transparent: 'bg-transparent disabled:bg-transparent disabled:dark:bg-transparent',
            }
        },
        defaultVariants: {
            size: 'default',
            variant: 'default',
        }
    }
) 

interface InputProps extends HTMLAttributes<HTMLInputElement>,
VariantProps<typeof inputVariants> { disabled?: boolean, type?: HTMLInputTypeAttribute, value?: string }

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ children, size, className, variant, type, value, disabled, ...props }, ref) => {
    const [hasMounted, setHasMounted] = useState(false);
    
    useEffect(() => {
      setHasMounted(true);
    }, []);
  
    if (!hasMounted) {
      return null;
    }
    
    return <input ref={ref} value={value} {...props} type={type} className={cn(inputVariants({className, size, variant}))} disabled={disabled} />
});

Input.displayName = 'Input'

export default Input