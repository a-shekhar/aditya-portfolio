import React from 'react'
import clsx from 'clsx'

export function Badge({ className = '', children, ...props }) {
  return <span className={clsx('inline-flex items-center rounded-full border px-2.5 py-1 text-xs', className)} {...props}>{children}</span>
}
