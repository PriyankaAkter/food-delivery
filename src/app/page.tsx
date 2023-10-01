import Image from 'next/image'
import HomeItems from './components/views/home/HomeItems'
import HomePersonalRecommendations from './components/views/home/HomePersonalRecommendations'
import HomeCategories from './components/views/home/HomeCategories'
import { HomeHero } from './components/views/home/HomeHero'

export default function Home() {
  return (
    <div>
     <HomeHero />
      <HomeItems />
      <HomeCategories />
      <HomePersonalRecommendations />

    </div>
  )
}
