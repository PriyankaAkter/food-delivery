import { products } from './../(admin)/dashboard/products/components/data';
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
  orders?: OrderType[]
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



  // model User {
  //   id            String    @id @default(cuid())
  //   email         String?   @unique
  //   password      String
  //   createdAt     DateTime  @default(now())
  //   updatedAt     DateTime  @updatedAt
  //   emailVerified DateTime?
  //   image         String?
  //   name          String?
  //   role          UserRole  @default(USER)
  //   orders Order[]
  //   accounts      Account[]
  //   sessions      Session[]
  // }
  export type CustomerType = {
    id?: string
    name?: string
    email?: string
    image?: string
    role?: string
    address?: string
    phone?: string,
    orders?: OrderType[]
    createdAt?: string
    updatedAt?: string
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
    quantity?: number
    orders?: OrderType[]
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


  // model Order {
  //   id           Int         @id @default(autoincrement())
  //   orderNumber  String?      @unique @default(uuid())
  //   createdAt    DateTime    @default(now())
  //   updatedAt    DateTime    @updatedAt
  //   userName String?
  //   userEmail String?
  //   items        Json?
  //   status     Status?   @default(UnPaid)
  //   price Decimal?
  //   payment_id   String?      @unique
  // }


  export type OrderType = {
    id?: number
    orderNumber?: string
    userName?: string 
    userEmail?: string
    price?: number | string
    status?: string
    user?:CustomerType,
    userId?: string
    items?: ProductType[]
    payment_id?: string
    delivery?: string
    notes?: string
    billingname?:  string
   billingemail?: string
   billingphone?: string
   billingaddress?: string
    products?: ProductType[]
    restaurant?: RestaurantColumnType
    restaurantId?: string
    createdAt?:string
  }