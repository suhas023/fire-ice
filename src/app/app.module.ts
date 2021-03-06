import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { CardListComponent } from './card-list/card-list.component';
import { NavComponent } from './nav/nav.component';
import { CardComponent } from './card/card.component';
import { BookComponent } from './book/book.component';
import { HomeComponent } from './home/home.component';
import { CharacterComponent } from './character/character.component';
import { HouseComponent } from './house/house.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    CardListComponent,
    NavComponent,
    CardComponent,
    BookComponent,
    HomeComponent,
    CharacterComponent,
    HouseComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
