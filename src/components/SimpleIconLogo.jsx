import React from 'react'
import * as si from 'simple-icons/icons'

const slugMap = {
  'Java': 'siJava',
  'Spring Boot': 'siSpringboot',
  'Microsoft Azure': 'siMicrosoftazure',
  'Azure': 'siMicrosoftazure',
  'PostgreSQL': 'siPostgresql',
  'MySQL': 'siMysql',
  'MongoDB': 'siMongodb',
  'Oracle': 'siOracle'
}

export default function SimpleIconLogo({ name, className = 'h-5 w-5' }){
  const key = slugMap[name]
  const data = key ? si[key] : null
  if(!data) return <span className={className} aria-hidden />

  // Inject fill="currentColor" so CSS color applies
  const svg = data.svg.replace('<svg ', '<svg fill="currentColor" ')
  return (
    <span
      className={className}
      style={{ color: `#${data.hex}` }}
      dangerouslySetInnerHTML={{ __html: svg }}
      aria-label={name}
      title={name}
    />
  )
}
