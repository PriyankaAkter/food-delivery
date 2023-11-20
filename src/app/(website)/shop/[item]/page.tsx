'use client'
import React from 'react'
import ItemHero from './components/ItemHero'
import RelatedItems from './components/RelatedItems'
import { useParams } from 'next/navigation'
import { items } from '@/app/(website)/components/views/data'

const Page = () => {

  const params = useParams()
  console.log({params});

  const item = items.find((item)=> item.food_slug==params.item)
  console.log({item});

  const relatedItems = items.filter((item1)=> item1.category==item?.category)
  console.log({relatedItems});
  return (
    <div>
        <ItemHero item={item} />
        <RelatedItems relatedItems={relatedItems} />
    </div>
  )
}

export default Page