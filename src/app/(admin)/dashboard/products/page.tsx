import { SideBar } from '../components/shared/SideBar'
import ProductDataTable from './components/products-data-table'

const Page = () => {
  return (
    <div className='flex' >
        <SideBar />
        <div className='container1'>

        <ProductDataTable  />
        </div>
    </div>
  )
}

export default Page