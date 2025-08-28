import React, { forwardRef } from 'react'
import clsx from 'clsx'

export const Input = forwardRef(function Input({ className = '', ...props }, ref) {
  return <input ref={ref} className={clsx('h-10 w-full rounded-xl border bg-transparent px-3 text-sm outline-none border-white/15 text-zinc-200 placeholder:text-zinc-500 focus:ring-2 focus:ring-violet-500', className)} {...props} />
})
