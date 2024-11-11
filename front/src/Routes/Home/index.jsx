import React from 'react'
import { Page } from '../../Components/Generic/Page'
import Dashboard from '../../Components/Dashboard'
import { AcademicCalendar } from '../../Components/Calendar'

export default function Home(){
  return (
    <Page>
      <Dashboard />
      <AcademicCalendar />
    </Page>
  )
}
