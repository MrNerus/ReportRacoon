import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomModule } from '../atom/atom.module';

import { FgmToggleComponent } from './fgm-toggle/fgm-toggle.component';
import { FgmFieldComponent } from './fgm-field/fgm-field.component';
import { FgmCheckboxComponent } from './fgm-checkbox/fgm-checkbox.component';

const MOLECULE_COMPONENTS = [
  FgmToggleComponent,
  FgmFieldComponent,
  FgmCheckboxComponent
];

@NgModule({
  imports: [
    CommonModule,
    AtomModule,
    ...MOLECULE_COMPONENTS
  ],
  exports: [
    ...MOLECULE_COMPONENTS
  ]
})
export class MoleculeModule {}

export {
  FgmToggleComponent,
  FgmFieldComponent,
  FgmCheckboxComponent
};
