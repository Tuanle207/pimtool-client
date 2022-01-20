import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    HttpClientModule,
    CommonModule,
  ],
})
export class SharedModule { }
