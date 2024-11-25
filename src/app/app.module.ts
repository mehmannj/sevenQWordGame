// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { GameService } from './game.service';
import { AppRoutingModule } from './app-routing.module';
import { SelectLevelComponent } from './select-level/select-level.component';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HomeComponent,
    SelectLevelComponent,
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: SelectLevelComponent },
      { path: 'game', component: GameComponent }
    ]),
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
