// Response getAll
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

// Response deleteById
export interface ProductDeleteByIdRespose {
    message: string;
}

// Response add
export interface ProductSaveRespose {
    message: string;
    data:    ProductApiMessage;
}

export interface ProductApiMessage {
    id:            string;
    name:          string;
    description:   string;
    logo:          string;
    date_release:  string;
    date_revision: string;
}

// Response update
export interface ProductUpdateByIdRespose {
    message: string;
    data:    ProductApiMessage;
}

export interface ProductApiMessage {
    name:          string;
    description:   string;
    logo:          string;
    date_release:  string;
    date_revision: string;
}
