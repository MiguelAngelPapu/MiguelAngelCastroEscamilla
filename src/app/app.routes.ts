import { Routes } from '@angular/router';
import { ListProductsComponent } from './interfaces/pages/list-products/list-products.component';
import { FormProductComponent } from './interfaces/pages/form-product/form-product.component';
import { AddProductComponent } from './interfaces/pages/form-product/add-product/add-product.component';

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
                path: 'add-product',
                component: AddProductComponent,
                outlet: 'add-primary',
            },
            {
                path: '',
                redirectTo: '/form-product/(add-primary:add-product)',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'list-products'
    }
];
