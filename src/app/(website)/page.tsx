import HomeCategories from "./components/views/home/HomeCategories";
import { HomeHero } from "./components/views/home/HomeHero";
import HomeMenu from "./components/views/home/HomeMenu";
import HomeNearbyRes from "./components/views/home/HomeNearbyRes";
import HomeOurOffers from "./components/views/home/HomeOurOffers";
import HomePopularItems from "./components/views/home/HomePopularItems";



export default function Home() {
  return (
    <div>
     <HomeHero />
     {/* <HomeMenu /> */}
      {/* <HomeCategories /> */}
      <HomeMenu />
      {/* <HomePopularItems /> */}
      <HomeNearbyRes />
      {/* <HomeOurOffers /> */}
      {/* <HomePersonalRecommendations /> */}
      {/* <HomeItems />
      <HomePersonalRecommendations /> */}

    </div>
  )
}