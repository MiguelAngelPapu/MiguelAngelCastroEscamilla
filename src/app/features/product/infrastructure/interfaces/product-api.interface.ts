// Response getAll
export interface GetProductsResponse {
    data: ProductsResponseResult[];
}
export interface ProductsResponseResult {
    id:            string;
    name:          string;
    description:   string;
    logo:          string;
    date_release:  Date;
    date_revision: Date;
}


// Response deleteById
export interface ProductDeleteByIdRespose {
    message: string;
}

// Response add
export interface CreateProductsResponse {
    message: string;
    data:    ProductResponseDto;
}
export interface ProductResponseDto {
    id:            string;
    name:          string;
    description:   string;
    logo:          string;
    date_release:  string;
    date_revision: string;
}

// Response update
export interface UpdateRespose {
    message: string;
    data:    ProductUpdateResponseDto;
}

export interface ProductUpdateResponseDto {
    name:          string;
    description:   string;
    logo:          string;
    date_release:  string;
    date_revision: string;
}
