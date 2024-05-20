import { Supplier } from "./supplier"

export class Product {
    id!: string
    name!: string
    sku!: string
    description!: string
    price!: number
    quantity!: number
    suppliers!: Supplier[]
}
