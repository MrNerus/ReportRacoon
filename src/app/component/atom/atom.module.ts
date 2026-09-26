import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FgToggleComponent } from './fg-toggle/fg-toggle.component';
import { FgCheckboxComponent } from './fg-checkbox/fg-checkbox.component';
import { FgRadioComponent } from './fg-radio/fg-radio.component';
import { FgButtonComponent } from './fg-button/fg-button.component';
import { FgTextInputComponent } from './fg-text-input/fg-text-input.component';
import { FgDropdownComponent } from './fg-dropdown/fg-dropdown.component';
import { FgSliderComponent } from './fg-slider/fg-slider.component';
import { FgSegmentToggleComponent } from './fg-segment-toggle/fg-segment-toggle.component';
import { FgPressToggleComponent } from './fg-press-toggle/fg-press-toggle.component';
import { FgContainerComponent } from './fg-container/fg-container.component';

const ATOM_COMPONENTS = [
  FgToggleComponent,
  FgCheckboxComponent,
  FgRadioComponent,
  FgButtonComponent,
  FgTextInputComponent,
  FgDropdownComponent,
  FgSliderComponent,
  FgSegmentToggleComponent,
  FgPressToggleComponent,
  FgContainerComponent
];

@NgModule({
  imports: [
    CommonModule,
    ...ATOM_COMPONENTS
  ],
  exports: [
    ...ATOM_COMPONENTS
  ]
})
export class AtomModule {}

export {
  FgToggleComponent,
  FgCheckboxComponent,
  FgRadioComponent,
  FgButtonComponent,
  FgTextInputComponent,
  FgDropdownComponent,
  FgSliderComponent,
  FgSegmentToggleComponent,
  FgPressToggleComponent,
  FgContainerComponent
};
