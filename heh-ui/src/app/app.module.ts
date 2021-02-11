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
import { InputSearchComponent } from './components/page-search/input-search/input-search.component';
import { PageSearchComponent } from './components/page-search/page-search.component';
import { LanguageSelectionComponent } from './components/header/language-selection/language-selection.component';
import { DiscountCardComponent } from './components/discount-card/discount-card.component';
import { EditDiscountCardComponent } from './pages/moderator/vendors/add-vendor-modal/edit-discount-card/edit-discount-card.component';
import { FavoriteCardComponent } from './components/favorite-card/favorite-card.component';
import { CategoryComponent } from './components/category/category.component';
import { TagComponent } from './components/tag/tag.component';
import { BtnFavoriteComponent } from './components/btn-favorite/btn-favorite.component';
import { NavModeratorAdminComponent } from './components/nav-moderator-admin/nav-moderator-admin.component';
import { EditNoteModalComponent } from './pages/favorites/edit-note-modal/edit-note-modal.component';
import { DiscountDetailsModalComponent } from './pages/discounts/discount-details-modal/discount-details-modal.component';
import { ListInputComponent } from './pages/moderator/categories-tags/list-input/list-input.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { AddDiscountModalComponent } from './pages/moderator/vendors/add-discount-modal/add-discount-modal.component';
import { AddVendorModalComponent } from './pages/moderator/vendors/add-vendor-modal/add-vendor-modal.component';
import { ActionEventComponent } from './pages/admin/event-history/action-event/action-event.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { ModelListInputComponent } from './pages/moderator/vendors/add-vendor-modal/model-list-input/model-list-input.component';
import { VendorCardComponent } from './pages/moderator/vendors/vendor-card/vendor-card.component';
import { AgmCoreModule } from '@agm/core';
import { AddVendorCardComponent } from './pages/moderator/vendors/add-vendor-card/add-vendor-card.component';
import { SelectBackgroundComponent } from './components/header/select-background/select-background.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './role-guard/role.guard';
import { SpinnerHttpInterceptor } from './services/spinner-service/spinner-interceptor';

export function HttpLoaderFactory(http: HttpClient): any {
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
    PageSearchComponent,
    DiscountCardComponent,
    FavoriteCardComponent,
    EditDiscountCardComponent,
    LanguageSelectionComponent,
    CategoryComponent,
    TagComponent,
    BtnFavoriteComponent,
    NavModeratorAdminComponent,
    DiscountDetailsModalComponent,
    EditNoteModalComponent,
    DiscountDetailsModalComponent,
    ListInputComponent,
    UserCardComponent,
    AddDiscountModalComponent,
    AddVendorModalComponent,
    ActionEventComponent,
    ModelListInputComponent,
    VendorCardComponent,
    AddVendorCardComponent,
    SelectBackgroundComponent,
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
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC7OkW7Uy3uUaYUVE3Aoh5j-P6fLATgmhA'
    })
  ],
  providers: [AuthGuard, RoleGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: SpinnerHttpInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})

export class AppModule {}
