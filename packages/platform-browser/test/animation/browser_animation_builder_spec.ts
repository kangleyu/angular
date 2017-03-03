/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {AnimationBuilder} from '@angular/animations';
import {ɵAnimationEngine, ɵNoopAnimationEngine} from '@angular/animations/browser';
import {Component, Injectable, RendererFactory2, RendererType2, ViewChild} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule, ɵAnimationRendererFactory} from '@angular/platform-browser/animations';

import {BrowserAnimationBuilder} from '../../animations/src/animation_builder';
import {InjectableAnimationEngine} from '../../animations/src/providers';
import {el} from '../../testing/src/browser_util';

export function main() {
  describe('BrowserAnimationBuilder', () => {
    let element: any;
    beforeEach(() => {
      element = el('<div></div>');

      TestBed.configureTestingModule({
        providers: [{provide: ɵAnimationEngine, useClass: ɵNoopAnimationEngine}],
        imports: [BrowserAnimationsModule]
      });
    });

    it('should inject AnimationBuilder into a component', () => {
      @Component({
        selector: 'ani-cmp',
        template: '...',
      })
      class Cmp {
        constructor(public builder: AnimationBuilder) {}
      }

      TestBed.configureTestingModule({declarations: [Cmp]});

      const engine = TestBed.get(ɵAnimationEngine);
      const fixture = TestBed.createComponent(Cmp);
      const cmp = fixture.componentInstance;

      fixture.detectChanges();
      expect(cmp.builder instanceof BrowserAnimationBuilder).toBeTruthy();
    });
  });
}
