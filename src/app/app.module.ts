import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';

import { SharedModule } from 'src/shared/shared.module';
import { AppComponent } from './app.component';
import { FeaturesModule } from './features/features.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule.forRoot([], {
      paramsInheritanceStrategy: 'always',
      preloadingStrategy: PreloadAllModules,
      useHash: true,
    }),
    FeaturesModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
