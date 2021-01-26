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
import {ModeratorLayoutComponent} from './components/layouts/moderator-layout/moderator-layout.component';
import {AdminLayoutComponent} from './components/layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {path: '', redirectTo: '/discounts', pathMatch: 'full'},
      {path: 'discounts', component: DiscountsComponent},
      {path: 'favorites', component: FavoritesComponent},
      {path: 'profile', component: UserProfileComponent},
    ]
  },
  {
    path: '',
    component: ModeratorLayoutComponent,
    children: [
      {path: '', redirectTo: '/discounts', pathMatch: 'full'},
      {path: 'discounts', component: DiscountsComponent},
      {path: 'favorites', component: FavoritesComponent},
      {path: 'profile', component: UserProfileComponent},
      {path: 'moderator/vendors', component: VendorsComponent},
      {path: 'moderator/categories_tags', component: CategoriesTagsComponent},
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {path: '', redirectTo: '/discounts', pathMatch: 'full'},
      {path: 'discounts', component: DiscountsComponent},
      {path: 'favorites', component: FavoritesComponent},
      {path: 'profile', component: UserProfileComponent},
      {path: 'admin/users', component: UsersComponent},
      {path: 'admin/statistics', component: StatisticsComponent},
      {path: 'admin/history', component: EventHistoryComponent},
      {path: 'moderator/vendors', component: VendorsComponent},
      {path: 'moderator/categories_tags', component: CategoriesTagsComponent},
    ]
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
