import React from 'react'
import App from './App'
import ThemeToggle from '@/components/ThemeToggle'
import TopSkills from '@/modules/TopSkills/TopSkills'
import Publications from '@/modules/Publications/Publications'
import Certifications from '@/modules/Certifications/Certifications'

const TOP_SKILLS = ['Java','Spring Boot','Database','Azure']

const PUBLICATIONS = [
  {
    title: 'Techniques to Preserve the Location of Sink in Wireless Sensor Networks (WSN)',
    outlet: 'IJARIIE',
    link: 'http://ijariie.com/AdminUploadPdf/TECHNIQUES_TO_PRESERVE_THE_LOCATION_OF_SINK_IN_WIRELESS_SENSOR_NETWORKS__ijariie7726.pdf'
  },
  { title: 'Public Key Cryptography in WSN (RSA-based)', outlet: 'Paper Presentation (NIE, 2017)', link: '' }
]

const CERTIFICATIONS = [
  { issuer: 'Microsoft', name: 'Azure Fundamentals' },
  { issuer: 'Microsoft', name: 'Azure AI Fundamentals' },
  { issuer: 'Microsoft', name: 'Azure Data Fundamentals' },
  { issuer: 'Microsoft', name: 'Security, Compliance & Identity Fundamentals' },
  { issuer: 'Microsoft', name: 'Azure Data Engineer Associate', validity: 'Dec 2022 – Dec 2025' },
  { issuer: 'Snowflake', name: 'SnowPro Core Certification', validity: 'Aug 2022 – Aug 2026' },
  { issuer: 'Databricks', name: 'Academy Accreditation: Lakehouse Fundamentals', validity: 'Dec 2022 – Dec 2023' },
  { issuer: 'Databricks', name: 'Databricks Certified Data Engineer Associate', validity: 'Dec 2024 – Dec 2026' },
  { issuer: 'HackerRank', name: 'Java (Intermediate)' },
  { issuer: 'HackerRank', name: 'SQL (Intermediate)' },
  { issuer: 'HackerRank', name: 'Java (Basic)' },
  { issuer: 'HackerRank', name: 'SQL (Basic)' },
  { issuer: 'HackerRank', name: 'C++ (Basic)' },
  { issuer: 'HackerRank', name: 'Problem Solving (Basic)' },
]

export default function Root(){
  return (
    <>
      <ThemeToggle />
      <App />
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <section id="skills"><TopSkills items={TOP_SKILLS} /></section>
        <section id="publications"><Publications items={PUBLICATIONS} /></section>
        <section id="certs"><Certifications items={CERTIFICATIONS} /></section>
      </div>
    </>
  )
}
