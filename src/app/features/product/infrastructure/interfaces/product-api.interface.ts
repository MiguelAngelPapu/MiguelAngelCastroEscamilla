export interface ProductApiResponse {
    data: ProductApiResult[];
}

export interface ProductApiResult {
    id:            string;
    name:          string;
    description:   string;
    logo:          string;
    date_release:  Date;
    date_revision: Date;
}

export interface ProductDeleteByIdRespose {
    message: string;
}
