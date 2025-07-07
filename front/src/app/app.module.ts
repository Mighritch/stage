import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemandeMutationListComponent } from './components/demande-mutation-list/demande-mutation-list.component';
import { DemandeMutationFormComponent } from './components/demande-mutation-form/demande-mutation-form.component';
import { PersonnelListComponent } from './components/personnel-list/personnel-list.component';
import { PersonnelFormComponent } from './components/personnel-form/personnel-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DemandeMutationListComponent,
    DemandeMutationFormComponent,
    PersonnelListComponent,
    PersonnelFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
