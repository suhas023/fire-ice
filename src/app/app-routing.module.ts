import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { HomeComponent } from './home/home.component';
import { CharacterComponent } from './character/character.component';
import { HouseComponent } from './house/house.component';
import { CategoryComponent } from './category/category.component';

const routes:Routes = [
  { path: "", component: HomeComponent},
  { path:"book", component: BookComponent },
  { path: "character", component: CharacterComponent },
  { path: "house", component: HouseComponent },
  { path: "category", component: CategoryComponent },
  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
