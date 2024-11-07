import React from 'react'
import { Page } from '../../Components/Generic/Page'
import { UserProfile } from '../../Components/UserProfile'
import { AcademicCalendar } from '../../Components/Calendar'

export const UserPage = () => {
  return (
    
      <Page>
      <UserProfile />
      <AcademicCalendar/>
      </Page>
  )
}
