import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomModule } from './atom/atom.module';
import { MoleculeModule } from './molecule/molecule.module';

@NgModule({
  imports: [
    CommonModule,
    AtomModule,
    MoleculeModule
  ],
  exports: [
    AtomModule,
    MoleculeModule
  ]
})
export class FuturisticGlassModule {}

export * from './atom/atom.module';
export * from './molecule/molecule.module';
