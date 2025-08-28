import React, { createContext, useContext, useState, cloneElement } from 'react'

const Ctx = createContext(null)

export function TooltipProvider({ children }) {
  return <>{children}</>
}

export function Tooltip({ children }) {
  const [open, setOpen] = useState(false)
  return <Ctx.Provider value={{ open, setOpen }}>{children}</Ctx.Provider>
}

export function TooltipTrigger({ children, asChild = false }) {
  const { setOpen } = useContext(Ctx)
  const props = {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false),
  }
  return asChild ? cloneElement(children, props) : <span {...props}>{children}</span>
}

export function TooltipContent({ children }) {
  const { open } = useContext(Ctx)
  if (!open) return null
  return (
    <div className="absolute mt-2 rounded-md border border-white/10 bg-zinc-800/95 px-2 py-1 text-xs text-zinc-100 shadow-lg">
      {children}
    </div>
  )
}
