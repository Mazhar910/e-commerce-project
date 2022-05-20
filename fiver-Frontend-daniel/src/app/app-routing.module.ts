import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserGuard } from './_guards/user.guard';
import { ManageCategoryComponent } from './category/manage-category/manage-category.component';
import { ProductComponentComponent } from './product/product-component/product-component.component';
import { OrderComponentComponent } from './order/order-component/order-component.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductUpdateComponent } from './product/product-update/product-update.component';
import { ProductLinesComponent } from './product/product-lines/product-lines.component';

export const Approutes: Routes = [
    {
        path: '',
        component: BlankComponent,
        children: [
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            {
                path: 'authentication',
                loadChildren:
                    () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
            },
            {
                path: 'home',
                component: HomeComponent,
            },
        ]
    },

    {
        path: '',
        component: FullComponent,
        children: [
            {
                path: 'product-lines',
                component: ProductLinesComponent,

            },
            {
                path: 'manage-category',
                component: ManageCategoryComponent,
            },
            {
                path: 'manage-order',
                component: OrderComponentComponent,

            },

            {
                path: 'products',
                component: ProductComponentComponent,
            },
            {
                path: 'cart',
                component: CartComponent,

            },
            {
                path: 'product/create',
                component: ProductComponentComponent
            },
            {
                path: 'product/list',
                component: ProductListComponent
            },
            {
                path: 'product/update',
                component: ProductUpdateComponent
            },

        ]
    },
    /*{
        path: '**',
        redirectTo: '/authentication/404'
    }*/
];
