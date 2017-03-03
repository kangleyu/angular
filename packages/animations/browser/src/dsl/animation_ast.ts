/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {AnimateTimings, ɵStyleData} from '@angular/animations';

export interface AnimationAstVisitor {
  visitTrigger(ast: AnimationTriggerAst, context: any): any;
  visitState(ast: AnimationStateAst, context: any): any;
  visitTransition(ast: AnimationTransitionAst, context: any): any;
  visitSequence(ast: AnimationSequenceAst, context: any): any;
  visitGroup(ast: AnimationGroupAst, context: any): any;
  visitAnimate(ast: AnimationAnimateAst, context: any): any;
  visitStyle(ast: AnimationStyleAst, context: any): any;
  visitKeyframeSequence(ast: AnimationKeyframesSequenceAst, context: any): any;
  visitReference(ast: AnimationReferenceAst, context: any): any;
  visitAnimateChild(ast: AnimationAnimateChildAst, context: any): any;
  visitQuery(ast: AnimationQueryAst, context: any): any;
  visitStagger(ast: AnimationStaggerAst, context: any): any;
  visitWait(ast: AnimationWaitAst, context: any): any;
  visitTiming(ast: AnimationTimingAst, context: any): any;
}

export abstract class AnimationAst { abstract visit(ast: AnimationAstVisitor, context: any): any; }

export class AnimationTriggerAst extends AnimationAst {
  public queryCount: number = 0;
  public depCount: number = 0;

  constructor(
      public name: string, public states: AnimationStateAst[],
      public transitions: AnimationTransitionAst[]) {
    super();
  }

  visit(visitor: AnimationAstVisitor, context: any): any {
    return visitor.visitTrigger(this, context);
  }
}

export class AnimationStateAst extends AnimationAst {
  constructor(public name: string, public style: AnimationStyleAst) { super(); }

  visit(visitor: AnimationAstVisitor, context: any): any {
    return visitor.visitState(this, context);
  }
}

export class AnimationTransitionAst extends AnimationAst {
  public queryCount: number = 0;
  public depCount: number = 0;

  constructor(
      public matchers: ((fromState: string, toState: string) => boolean)[],
      public animation: AnimationAst,
      public locals: {[varName: string]: string | number | boolean}) {
    super();
  }

  visit(visitor: AnimationAstVisitor, context: any): any {
    return visitor.visitTransition(this, context);
  }
}

export class AnimationSequenceAst extends AnimationAst {
  constructor(public steps: AnimationAst[]) { super(); }

  visit(visitor: AnimationAstVisitor, context: any): any {
    return visitor.visitSequence(this, context);
  }
}

export class AnimationGroupAst extends AnimationAst {
  constructor(public steps: AnimationAst[]) { super(); }

  visit(visitor: AnimationAstVisitor, context: any): any {
    return visitor.visitGroup(this, context);
  }
}

export class AnimationAnimateAst extends AnimationAst {
  constructor(
      public timings: AnimationTimingAst,
      public style: AnimationStyleAst|AnimationKeyframesSequenceAst) {
    super();
  }

  visit(visitor: AnimationAstVisitor, context: any): any {
    return visitor.visitAnimate(this, context);
  }
}

export class AnimationStyleAst extends AnimationAst {
  public isEmptyStep = false;

  constructor(public styles: (ɵStyleData|string)[], public easing: string, public offset: number) {
    super();
  }

  visit(visitor: AnimationAstVisitor, context: any): any {
    return visitor.visitStyle(this, context);
  }
}

export class AnimationKeyframesSequenceAst extends AnimationAst {
  constructor(public styles: AnimationStyleAst[]) { super(); }

  visit(visitor: AnimationAstVisitor, context: any): any {
    return visitor.visitKeyframeSequence(this, context);
  }
}

export class AnimationReferenceAst extends AnimationAst {
  constructor(
      public animation: AnimationAst,
      public locals: {[varName: string]: string | number | boolean}) {
    super();
  }

  visit(visitor: AnimationAstVisitor, context: any): any {
    return visitor.visitReference(this, context);
  }
}

export class AnimationAnimateChildAst extends AnimationAst {
  constructor(
      public timings: AnimateTimings, public animation: AnimationReferenceAst,
      public locals: {[varName: string]: string | number | boolean}) {
    super();
  }

  visit(visitor: AnimationAstVisitor, context: any): any {
    return visitor.visitAnimateChild(this, context);
  }
}

export class AnimationQueryAst extends AnimationAst {
  constructor(
      public selector: string, public multi: boolean, public includeSelf: boolean,
      public animation: AnimationAst) {
    super();
  }

  visit(visitor: AnimationAstVisitor, context: any): any {
    return visitor.visitQuery(this, context);
  }
}

export class AnimationStaggerAst extends AnimationAst {
  constructor(public timings: AnimateTimings, public animation: AnimationAst) { super(); }

  visit(visitor: AnimationAstVisitor, context: any): any {
    return visitor.visitStagger(this, context);
  }
}

export class AnimationWaitAst extends AnimationAst {
  constructor(public delay: number, public animation?: AnimationAst) { super(); }

  visit(visitor: AnimationAstVisitor, context: any): any {
    return visitor.visitWait(this, context);
  }
}

export class AnimationTimingAst extends AnimationAst {
  constructor(public duration: number, public delay: number, public easing: string) { super(); }

  visit(visitor: AnimationAstVisitor, context: any): any {
    return visitor.visitTiming(this, context);
  }
}

export class DynamicAnimationTimingAst extends AnimationTimingAst {
  constructor(public value: string) { super(0, 0, ''); }

  visit(visitor: AnimationAstVisitor, context: any): any {
    return visitor.visitTiming(this, context);
  }
}
