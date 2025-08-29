import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Publications({ items = [] }){
  return (
    <Card className="rounded-3xl border border-zinc-800/60 bg-zinc-900/60">
      <CardHeader>
        <CardTitle className="text-xl">Publications</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((p, i) => (
            <li key={i}>
              <div className="font-medium">{p.title}</div>
              <div className="text-sm opacity-80">{p.outlet}</div>
              {p.link && <a className="text-sm underline" href={p.link} target="_blank" rel="noreferrer">View</a>}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
