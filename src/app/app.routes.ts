import { Routes } from '@angular/router';
import { ListProductsComponent } from './features/product/presentation/list-products/list-products.component';
import { FormProductComponent } from './features/product/presentation/form-product/form-product.component';
import { AddProductComponent } from './features/product/presentation/form-product/add-product/add-product.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'list-products',
        pathMatch: 'full'
    },
    {
        path: 'list-products',
        component: ListProductsComponent,
    },
    {
        path: 'form-product',
        component: FormProductComponent,
        children: [
            {
                path: 'add',
                component: AddProductComponent,
            },
            {
                path: '**',
                redirectTo: 'add'
            }
        ],
    },
    {
        path: '**',
        redirectTo: 'list-products'
    }
];
