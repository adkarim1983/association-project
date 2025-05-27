import React from 'react'
import Hero from '../components/Hero'
import Presentation from '../components/Presentation'
import Valeurs from '../components/Valeurs'
import Activities from '../components/Activities'
import Partners from '../components/Partners'
import Contact from './Contact'
import SupportedEnterprisesMap from '../components/SupportedEnterprisesMap'
import ReportsSection from '../components/ReportsSection'
import PlatformObjectives from '../components/PlatformObjectives'
import NajmStatsSection from '../components/NajmStatsSection'
import Galerie from '../components/Galerie'
import PresidentMessage from '../components/PresidentMessage'


function Home() {
  return (

      <>
        <PresidentMessage />
        <Hero />
        <Presentation />
        <Valeurs />
        <Activities />
        <PlatformObjectives />
        <Partners />
        <Galerie />
        <ReportsSection />
        <NajmStatsSection />
    </>
  )
}

export default Home
