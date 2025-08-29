import React, { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle(){
  const [dark, setDark] = useState(true)
  useEffect(() => {
    const ls = localStorage.getItem('theme')
    const initial = ls ? ls === 'dark' : true
    document.documentElement.classList.toggle('dark', initial)
    setDark(initial)
  }, [])
  const toggle = () => {
    const next = !dark
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    setDark(next)
  }
  return (
    <button onClick={toggle} className="rounded-xl px-3 py-2 border border-white/10 bg-white/5 text-xs text-zinc-300 hover:text-white">
      {dark ? <Sun className="h-4 w-4 inline mr-1" /> : <Moon className="h-4 w-4 inline mr-1" />}
      {dark ? 'Light' : 'Dark'}
    </button>
  )
}
