import React from 'react'
import * as si from 'simple-icons/icons'
import { Database } from 'lucide-react'

const slugMap = {
  'Java': 'siJava',
  'Spring Boot': 'siSpringboot',
  'Azure': 'siMicrosoftazure',
  'PostgreSQL': 'siPostgresql',
  'MySQL': 'siMysql',
  'MongoDB': 'siMongodb',
  'Oracle': 'siOracle',
}

export default function SkillIcon({ name, title }) {
  if (name === 'Database') {
    return (
      <div className="flex items-center gap-2">
        <Database className="w-5 h-5" />
        <span>{title || name}</span>
      </div>
    )
  }
  const key = slugMap[name]
  const data = key ? si[key] : null
  if (!data) return <span>{title || name}</span>
  return (
    <div className="flex items-center gap-2" title={title || name} aria-label={title || name}>
      <span className="w-5 h-5 inline-block" dangerouslySetInnerHTML={{ __html: data.svg }} style={{ color: `#${data.hex}` }} />
      <span>{title || name}</span>
    </div>
  )
}
