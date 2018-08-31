import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { DefaultNavBarComponent } from '../default-nav-bar/default-nav-bar.component';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
  ],
  declarations: [ProgressBarComponent, DefaultNavBarComponent],
  exports: [ProgressBarComponent, DefaultNavBarComponent]
})
export class ComponentsModule { }
