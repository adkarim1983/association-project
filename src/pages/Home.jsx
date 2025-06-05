import Hero from '../components/Hero'
import Presentation from '../components/Presentation'
import Valeurs from '../components/Valeurs'
import Activities from '../components/Activities'
import Partners from '../components/Partners'
import ReportsSection from '../components/ReportsSection'
import NajmStatsSection from '../components/NajmStatsSection'

import PresidentMessage from '../components/PresidentMessage'


function Home() {
  return (

      <>
        <PresidentMessage />
        <Hero />
        <Presentation />
        {/* <Valeurs /> */}
        <Activities />
        {/* <PlatformObjectives /> */}
        {/* <Galerie /> */}
        <ReportsSection />
        <NajmStatsSection />
        <Partners />
    </>
  )
}

export default Home
