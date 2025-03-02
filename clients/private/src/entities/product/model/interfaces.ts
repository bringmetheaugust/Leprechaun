import { PropertyGroupPreview } from "@entities/propertyGroup/model/interfaces"
import { Image, Price, Trans } from "@shared/models/interfaces"
import { ProductStatus } from "./enums"

export interface Product extends ProductPreview {
    orderCount: number
    options: PropertyGroupPreview[]
    images: Image[]
    description: Trans
}

export interface ProductPreview {
    comment: string
    created_at: string
    image: string | null
    id: string
    is_new: boolean
    is_public: boolean
    price: Price
    rating: number
    status: ProductStatus
    title: Trans
}

export interface ProductListUrlQueryParams {
    page?: number | string
    category?: string
}
