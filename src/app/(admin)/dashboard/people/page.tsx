import PeopleDataTable from "./data-table"

import { people } from "../components/shared/data"
import BasicTable from "../components/shared/BasicTable"
import { products } from "../products/components/data"
import { columns } from "../products/components/columns"

type Props = {}

const People = (props: any) => {
  return (
    <BasicTable data={products} columns={columns} />
  )
}

export default People