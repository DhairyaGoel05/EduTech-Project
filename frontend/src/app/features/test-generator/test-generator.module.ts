import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestGeneratorPageRoutingModule } from './test-generator-routing.module';

import { TestGeneratorPage } from './test-generator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestGeneratorPageRoutingModule
  ],
  declarations: [TestGeneratorPage]
})
export class TestGeneratorPageModule {}