import Image from 'next/image'
import HomeItems from './components/views/home/HomeItems'
import HomePersonalRecommendations from './components/views/home/HomeFoodRecommendations'
import HomeCategories from './components/views/home/HomeCategories'
import { HomeHero } from './components/views/home/HomeHero'
import HomePopularItems from './components/views/home/HomePopularItems'
import HomeNearbyRes from './components/views/home/HomeNearbyRes'

export default function Home() {
  return (
    <div>
     <HomeHero />
      <HomeCategories />
      <HomePopularItems />
      <HomeNearbyRes />
      <HomePersonalRecommendations />
      {/* <HomeItems />
      <HomePersonalRecommendations /> */}

    </div>
  )
}
