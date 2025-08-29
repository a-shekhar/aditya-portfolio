import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Certifications({ items = [] }){
  return (
    <Card className="rounded-3xl border border-zinc-800/60 bg-zinc-900/60">
      <CardHeader>
        <CardTitle className="text-xl">Certifications</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((c, i) => (
            <li key={i} className="px-3 py-2 rounded-xl border border-zinc-800/60 bg-zinc-900/40">
              <div className="font-medium">{c.name}</div>
              <div className="text-sm opacity-80">{c.issuer}{c.validity ? ` • ${c.validity}` : ''}</div>
              {c.link && <a href={c.link} target="_blank" rel="noreferrer" className="text-xs underline">View credential</a>}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
