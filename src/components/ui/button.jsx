import React from 'react'
import clsx from 'clsx'

export function Button({ asChild = false, variant = 'default', size = 'md', className = '', children, ...props }) {
  const Comp = asChild ? 'span' : 'button'
  const base = 'inline-flex items-center justify-center rounded-2xl font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:pointer-events-none'
  const variants = {
    default: 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 ring-violet-500',
    outline: 'bg-transparent border border-white/15 text-zinc-200 hover:bg-white/10 ring-violet-500',
    ghost: 'bg-transparent text-zinc-200 hover:bg-white/10 ring-violet-500',
  }
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  }
  return <Comp className={clsx(base, variants[variant], sizes[size], className)} {...props}>{children}</Comp>
}
