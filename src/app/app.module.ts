import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import module SQLite
import { SQLite } from '@ionic-native/sqlite';

// Appli et Pages 
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CategoriePage } from '../pages/categorie/categorie';
import { ArticlePage } from '../pages/article/article';
import { FormArticlePage } from '../pages/formArticle/formArticle';

@NgModule({
  declarations: [
    MyApp, 
    HomePage,
    CategoriePage,  // Ajouté page
    ArticlePage,    // Ajouté page
    FormArticlePage // Ajouté page
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CategoriePage,  // Ajouté page
    ArticlePage,    // Ajouté page
    FormArticlePage // Ajouté page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,         // Ajouté SQLight
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
