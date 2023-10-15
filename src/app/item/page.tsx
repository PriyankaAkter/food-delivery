import React from 'react'
import ItemHero from '../shop/[item]/components/ItemHero'
import RelatedItems from '../shop/[item]/components/RelatedItems'

const Page = () => {
  return (
    <div>
        <ItemHero />
        <RelatedItems />
    </div>
  )
}

export default Page