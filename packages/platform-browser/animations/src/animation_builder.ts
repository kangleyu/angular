/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {Animation, AnimationBuilder, AnimationMetadata, AnimationPlayer, NoopAnimationPlayer} from '@angular/animations';
import {Injectable, RendererFactory2, RendererType2} from '@angular/core';

import {AnimationRenderer} from './animation_renderer';

@Injectable()
export class BrowserAnimationBuilder extends AnimationBuilder {
  private _nextAnimationId = 0;
  private _renderer: AnimationRenderer;

  constructor(rootRenderer: RendererFactory2) {
    super();
    const typeData = {
      id: '0',
      encapsulation: null,
      styles: [],
      data: {animation: []}
    } as RendererType2;
    this._renderer = rootRenderer.createRenderer(document.body, typeData) as AnimationRenderer;
  }

  build(animation: AnimationMetadata|AnimationMetadata): Animation {
    const id = this._nextAnimationId.toString();
    this._nextAnimationId++;
    issueAnimationCommand(this._renderer, null, id, 'register', [animation]);
    return new BrowserAnimation(id, this._renderer);
  }
}

@Injectable()
export class NoopAnimationBuilder extends BrowserAnimationBuilder {
  constructor() { super(null); }

  build(animation: AnimationMetadata|AnimationMetadata): Animation { return new NoopAnimation(); }
}

export class BrowserAnimation extends Animation {
  constructor(private _id: string, private _renderer: AnimationRenderer) { super(); }

  create(element: any, locals: {[key: string]: string | number} = {}): AnimationPlayer {
    return new RendererAnimationPlayer(this._id, element, locals, this._renderer);
  }
}

export class NoopAnimation extends BrowserAnimation {
  constructor() { super(null, null); }

  create(element: any, locals: {[key: string]: string | number} = {}): AnimationPlayer {
    return new NoopAnimationPlayer();
  }
}

export class RendererAnimationPlayer implements AnimationPlayer {
  public parentPlayer: AnimationPlayer = null;

  constructor(
      public id: string, public element: any, locals: {[key: string]: string | number},
      private _renderer: AnimationRenderer) {
    this._command('create', locals);
  }

  private _listen(eventName: string, callback: (event: any) => any): () => void {
    return this._renderer.listen(this.element, `@@${this.id}:${eventName}`, callback);
  }

  private _command(command: string, ...args: any[]) {
    return issueAnimationCommand(this._renderer, this.element, this.id, command, args);
  }

  onDone(fn: () => void): void { this._listen('onDone', fn); }

  onStart(fn: () => void): void { this._listen('onStart', fn); }

  onDestroy(fn: () => void): void { this._listen('onDestroy', fn); }

  init(): void { this._command('init'); }

  hasStarted(): boolean { return undefined; }

  play(): void { this._command('play'); }

  pause(): void { this._command('pause'); }

  restart(): void { this._command('restart'); }

  finish(): void { this._command('finish'); }

  destroy(): void { this._command('destroy'); }

  reset(): void { this._command('reset'); }

  setPosition(p: number): void { this._command('setPosition', p); }

  getPosition(): number { return 0; }

  public totalTime = 0;
}

function issueAnimationCommand(
    renderer: AnimationRenderer, element: any, id: string, command: string, args: any[]): any {
  return renderer.setProperty(element, `@@${id}:${command}`, args);
}
