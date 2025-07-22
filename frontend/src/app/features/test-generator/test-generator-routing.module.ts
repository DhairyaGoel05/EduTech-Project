import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestGeneratorPage } from './test-generator.page';

const routes: Routes = [
  {
    path: '',
    component: TestGeneratorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestGeneratorPageRoutingModule {}