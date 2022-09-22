import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { SideMenuComponent } from './common/components/side-menu/side-menu.component';
import { CarouselComponent } from './common/components/carousel/carousel.component';
import { CarouselItemComponent } from './common/components/carousel/components/carousel-item/carousel-item.component';
import { ParallaxSectionComponent } from './common/components/parallax-section/parallax-section.component';
import { PresentationCardComponent } from './common/components/presentation-card/presentation-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    CarouselComponent,
    CarouselItemComponent,
    ParallaxSectionComponent,
    PresentationCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}