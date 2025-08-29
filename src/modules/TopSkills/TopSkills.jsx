import React from 'react'
import SkillIcon from '@/components/SkillIcon'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TopSkills({ items = [] }){
  const expanded = items.flatMap(s => s === 'Database' ? ['Database','PostgreSQL'] : [s])
  return (
    <Card className="rounded-3xl border border-zinc-800/60 bg-zinc-900/60">
      <CardHeader>
        <CardTitle className="text-xl">Top Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {expanded.map((name) => (
            <li key={name} className="px-3 py-2 rounded-xl border border-zinc-800/60 bg-zinc-900/40">
              <SkillIcon name={name} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
