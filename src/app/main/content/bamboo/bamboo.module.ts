import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BambooRoutingModule } from './bamboo-routing.module';
import { ProductComponent } from './product/product.component';

@NgModule({
  imports: [
    CommonModule,
    BambooRoutingModule
  ],
  declarations: [ProductComponent]
})
export class BambooModule { }
