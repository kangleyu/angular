/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {ɵStyleData} from '@angular/animations';

import {copyStyles} from '../util';

import {AnimationSequenceAst, AnimationTransitionAst, AnimationTriggerAst} from './animation_ast';
import {AnimationTransitionFactory} from './animation_transition_factory';

/**
 * @experimental Animation support is experimental.
 */
export function buildTrigger(name: string, ast: AnimationTriggerAst): AnimationTrigger {
  return new AnimationTrigger(name, ast);
}

/**
* @experimental Animation support is experimental.
*/
export class AnimationTrigger {
  public transitionFactories: AnimationTransitionFactory[] = [];
  public fallbackTransition: AnimationTransitionFactory;
  public states: {[stateName: string]: ɵStyleData} = {};

  constructor(public name: string, public ast: AnimationTriggerAst) {
    ast.states.forEach(ast => {
      const obj = this.states[ast.name] = {};
      ast.style.styles.forEach(styleTuple => {
        if (typeof styleTuple == 'object') {
          copyStyles(styleTuple as ɵStyleData, false, obj)
        }
      });
    });

    ast.transitions.forEach(ast => {
      this.transitionFactories.push(new AnimationTransitionFactory(name, ast, this.states));
    });

    this.fallbackTransition = createFallbackTransition(name, this.states);
  }

  get containsQueries() { return this.ast.queryCount > 0; }

  matchTransition(currentState: any, nextState: any): AnimationTransitionFactory {
    return this.transitionFactories.find(f => f.match(currentState, nextState));
  }
}

function createFallbackTransition(
    triggerName: string, states: {[stateName: string]: ɵStyleData}): AnimationTransitionFactory {
  const matchers = [(fromState: any, toState: any) => true];
  const animation = new AnimationSequenceAst([]);
  const transition = new AnimationTransitionAst(matchers, animation, {});
  return new AnimationTransitionFactory(triggerName, transition, states);
}
