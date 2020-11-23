import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearcherComponent } from './pro-voices/searcher/searcher.component';
import { OrderComponent } from './pro-voices/order/order.component';
import { ProVoicesComponent } from './pro-voices/pro-voices.component';
import { CategoriesComponent } from './pro-voices/categories/categories.component';
import { VoiceComponent } from './pro-voices/voice/voice.component';

@NgModule({
  declarations: [
    AppComponent,
    SearcherComponent,
    OrderComponent,
    ProVoicesComponent,
    CategoriesComponent,
    VoiceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
