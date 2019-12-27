import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridCardComponent } from './grid-card/grid-card.component';

@NgModule({
  declarations: [
    GridCardComponent
  ],
  imports: [CommonModule],
  providers: [],
  exports: [GridCardComponent]

})
export class SharedModule { }
