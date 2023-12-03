export type RestaurantColumnType = {
  id?: string
  name?: string
  slug?: string
  email?: string
  address?: string
  password?: string
  image?:string
  phone?: string
  foods?: ProductType[]
  deliveryTime?: string
  openingHour?: string
  closingHour?: String
}
  export type CategoryType = {
    id?: string
    cat_id?: string
    name?: string
    slug?: string
    foods?: ProductType[]
  }



  // model Food {
  //   id String @id @default(uuid()) 
  //   name String
  //   image String?
  //   slug String
  //   price Decimal
  //   stock String
  //   description String?
  //   order Order[]
  //   // author User @relation("WrittenPosts",fields: [authorId], references: [id])
  //   // authorId String @unique
  //   // categories Category[]
  //   // favoriteBy User? @relation("FavoritePosts",fields: [favoriteById], references: [id])
  //   // favoriteById String @unique
  //   category Category @relation(fields: [categoryId], references: [id])
  //   categoryId String
  //   restaurant Restaurant @relation(fields: [RestaurantId], references: [id])
  //   RestaurantId String
  //   createdAt    DateTime @default(now())
  //   updatedAt  DateTime  @updatedAt
  // }
  export type ProductType = {
    id?: string
    name?: string
    image?: string 
    slug?: string
    price?: number
    stock?: string
    category?: CategoryType
    categoryId?: string
    description?: string
    RestaurantId?:string
    restaurant?: RestaurantColumnType
  }


  export type ProductType1 = {
    id: string
    name: string
    image?: string | null
    slug: string
    // price: number
    // stock?: string
    category?: CategoryType
    categoryId?: string
    // description?: string
    RestaurantId?:string
    restaurant?: RestaurantColumnType
  }