import React from 'react'
import clsx from 'clsx'

export function Card({ className = '', children, ...props }) {
  return <div className={clsx('rounded-3xl border bg-zinc-900/60', className)} {...props}>{children}</div>
}

export function CardHeader({ className = '', children, ...props }) {
  return <div className={clsx('p-6', className)} {...props}>{children}</div>
}

export function CardTitle({ className = '', children, ...props }) {
  return <h3 className={clsx('text-lg font-semibold', className)} {...props}>{children}</h3>
}

export function CardContent({ className = '', children, ...props }) {
  return <div className={clsx('p-6', className)} {...props}>{children}</div>
}
