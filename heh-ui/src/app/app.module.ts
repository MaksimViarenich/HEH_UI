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
import { InputSearchComponent } from './components/search/input-search/input-search.component';
import { MultiSelectComponent } from './components/search/multi-select/multi-select.component';
import { PageSearchComponent } from './components/search/page-search/page-search.component';
import { SelectComponent } from './components/search/select/select.component';
import { LanguageSelectionComponent } from './components/language-selection/language-selection.component';
import { DiscountCardComponent } from './components/discount-card/discount-card.component';
import { FavoriteCardComponent } from './components/favorite-card/favorite-card.component';
import { CategoryComponent } from './components/category/category.component';
import { TagComponent } from './components/tag/tag.component';
import { BtnFavoriteComponent } from './components/btn-favorite/btn-favorite.component';
import { BtnSearchComponent } from './components/search/btn-search/btn-search.component';
import { NavModeratorAdminComponent } from './components/nav-moderator-admin/nav-moderator-admin.component';
import { EditNoteModalComponent } from './pages/favorites/edit-note-modal/edit-note-modal.component';
import { DiscountDetailsModalComponent } from './pages/discounts/discount-details-modal/discount-details-modal.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    InputSearchComponent,
    MultiSelectComponent,
    PageSearchComponent,
    SelectComponent,
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
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
