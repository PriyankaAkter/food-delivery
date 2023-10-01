import Image from 'next/image'
import HomeItems from './components/views/home/HomeItems'
import HomePersonalRecommendations from './components/views/home/HomePersonalRecommendations'
import HomeCategories from './components/views/home/HomeCategories'

export default function Home() {
  return (
    <div>

      <HomeItems />
      <HomeCategories />
      <HomePersonalRecommendations />

    </div>
  )
}
