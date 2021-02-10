import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {DiscountsComponent} from './pages/discounts/discounts.component';
import {FavoritesComponent} from './pages/favorites/favorites.component';
import {UserProfileComponent} from './pages/user-profile/user-profile.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {UsersComponent} from './pages/admin/users/users.component';
import {StatisticsComponent} from './pages/admin/statistics/statistics.component';
import {EventHistoryComponent} from './pages/admin/event-history/event-history.component';
import {VendorsComponent} from './pages/moderator/vendors/vendors.component';
import {CategoriesTagsComponent} from './pages/moderator/categories-tags/categories-tags.component';
import {HomeLayoutComponent} from './components/layouts/home-layout/home-layout.component';
import {LoginLayoutComponent} from './components/layouts/login-layout/login-layout.component';
import {AdminComponent} from './pages/admin/admin.component';
import {ModeratorComponent} from './pages/moderator/moderator.component';
import {AuthGuard} from './auth/auth.guard';
import {RoleGuard} from './role-guard/role.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: '/discounts', pathMatch: 'full'},
      {path: 'discounts', component: DiscountsComponent},
      {path: 'favorites', component: FavoritesComponent},
      {path: 'profile', component: UserProfileComponent},
      {
        path: 'moderator',
        canActivate: [AuthGuard, RoleGuard],
        data: {
          role: 'moderator',
        },
        component: ModeratorComponent,
        children: [
          {path: '', redirectTo: '/moderator/vendors', pathMatch: 'full'},
          {path: 'vendors', component: VendorsComponent},
          {path: 'categories_tags', component: CategoriesTagsComponent}
        ],
         },
      {
        path: 'admin',
        canActivate: [AuthGuard, RoleGuard],
        data: {
          role: 'administrator',
        },
        component: AdminComponent,
        children: [
          {path: '', redirectTo: '/admin/users', pathMatch: 'full'},
          {path: 'users', component: UsersComponent},
          {path: 'statistics', component: StatisticsComponent},
          {path: 'history', component: EventHistoryComponent},
        ],
      }
    ],
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {path: 'login', component: LoginComponent},
    ]
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
