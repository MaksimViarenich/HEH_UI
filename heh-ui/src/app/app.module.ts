import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './modules/app-material/app-material.module';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ModeratorComponent } from './pages/moderator/moderator.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { EventHistoryComponent } from './pages/admin/event-history/event-history.component';
import { StatisticsComponent } from './pages/admin/statistics/statistics.component';
import { VendorsComponent } from './pages/moderator/vendors/vendors.component';
import { CategoriesTagsComponent } from './pages/moderator/categories-tags/categories-tags.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeLayoutComponent } from './components/layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './components/layouts/login-layout/login-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchUIComponent } from './components/field-search/search-ui/search-ui.component';
import { MultySelectComponent } from './components/field-search/multy-select/multy-select.component';
import { FieldsSearchComponent } from './components/field-search/fields-search/fields-search.component';
import { MonoSelectComponent } from './components/field-search/mono-select/mono-select.component';
import { LanguageSelectionComponent } from './components/language-selection/language-selection.component';
import { DiscountCardComponent } from './components/discount-card/discount-card.component';
import { FavoriteCardComponent } from './components/favorite-card/favorite-card.component';
import { CategoryComponent } from './components/category/category.component';
import { TagComponent } from './components/tag/tag.component';
import { BtnFavoriteComponent } from './components/btn-favorite/btn-favorite.component';
import { BtnSearchComponent } from './components/field-search/btn-search/btn-search.component';
import { NavModeratorAdminComponent } from './components/nav-moderator-admin/nav-moderator-admin.component';
import { EditNoteModalComponent } from './pages/favorites/edit-note-modal/edit-note-modal.component';
import { DiscountDetailsModalComponent } from './pages/discounts/discount-details-modal/discount-details-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DiscountsComponent,
    FavoritesComponent,
    UserProfileComponent,
    ModeratorComponent,
    AdminComponent,
    UsersComponent,
    EventHistoryComponent,
    StatisticsComponent,
    VendorsComponent,
    CategoriesTagsComponent,
    LoginComponent,
    NotFoundComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    HeaderComponent,
    SearchUIComponent,
    MultySelectComponent,
    FieldsSearchComponent,
    MonoSelectComponent,
    DiscountCardComponent,
    FavoriteCardComponent,
    LanguageSelectionComponent,
    CategoryComponent,
    TagComponent,
    BtnFavoriteComponent,
    BtnSearchComponent,
    NavModeratorAdminComponent,
    DiscountDetailsModalComponent,
    EditNoteModalComponent,
    DiscountDetailsModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
