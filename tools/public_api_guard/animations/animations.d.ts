/** @experimental */
export declare function animate(timings: string | number, styles?: AnimationStyleMetadata | AnimationKeyframesSequenceMetadata | null): AnimationAnimateMetadata;

/** @experimental */
export declare function animateChild(): AnimationAnimateChildMetadata;

/** @experimental */
export declare type AnimateTimings = {
    duration: number;
    delay: number;
    easing: string;
};

/** @experimental */
export declare function animation(steps: AnimationMetadata | AnimationMetadata[], locals?: {
    [varName: string]: string | number | boolean;
}): AnimationReferenceMetadata;

/** @experimental */
export declare abstract class Animation {
    abstract create(element: any, locals: {
        [key: string]: string | number;
    }): AnimationPlayer;
}

/** @experimental */
export interface AnimationAnimateChildMetadata extends AnimationMetadata {
    args: any[];
}

/** @experimental */
export interface AnimationAnimateMetadata extends AnimationMetadata {
    styles: AnimationStyleMetadata | AnimationKeyframesSequenceMetadata | null;
    timings: string | number | AnimateTimings;
}

/** @experimental */
export declare abstract class AnimationBuilder {
    abstract build(animation: AnimationMetadata | AnimationMetadata): Animation;
}

/** @experimental */
export interface AnimationEvent {
    element: any;
    fromState: string;
    phaseName: string;
    toState: string;
    totalTime: number;
    triggerName: string;
}

/** @experimental */
export interface AnimationGroupMetadata extends AnimationMetadata {
    steps: AnimationMetadata[];
}

/** @experimental */
export interface AnimationKeyframesSequenceMetadata extends AnimationMetadata {
    steps: AnimationStyleMetadata[];
}

/** @experimental */
export interface AnimationMetadata {
    type: AnimationMetadataType;
}

/** @experimental */
export declare const enum AnimationMetadataType {
    Trigger = 0,
    State = 1,
    Transition = 2,
    Sequence = 3,
    Group = 4,
    Animate = 5,
    KeyframeSequence = 6,
    Style = 7,
    Definition = 8,
    AnimateChild = 9,
    Query = 10,
    Stagger = 11,
    Wait = 12,
}

/** @experimental */
export declare abstract class AnimationPlayer {
    parentPlayer: AnimationPlayer;
    readonly totalTime: number;
    abstract destroy(): void;
    abstract finish(): void;
    abstract getPosition(): number;
    abstract hasStarted(): boolean;
    abstract init(): void;
    abstract onDestroy(fn: () => void): void;
    abstract onDone(fn: () => void): void;
    abstract onStart(fn: () => void): void;
    abstract pause(): void;
    abstract play(): void;
    abstract reset(): void;
    abstract restart(): void;
    abstract setPosition(p: any): void;
}

/** @experimental */
export interface AnimationQueryMetadata extends AnimationMetadata {
    animation: AnimationMetadata | AnimationMetadata[];
    multi: boolean;
    selector: string;
}

/** @experimental */
export interface AnimationReferenceMetadata extends AnimationMetadata {
    animation: AnimationMetadata | AnimationMetadata[];
    locals?: {
        [varName: string]: string | number | boolean;
    };
}

/** @experimental */
export interface AnimationSequenceMetadata extends AnimationMetadata {
    steps: AnimationMetadata[];
}

/** @experimental */
export interface AnimationStaggerMetadata extends AnimationMetadata {
    args: any[];
}

/** @experimental */
export interface AnimationStateMetadata extends AnimationMetadata {
    name: string;
    styles: AnimationStyleMetadata;
}

/** @experimental */
export interface AnimationStyleMetadata extends AnimationMetadata {
    offset?: number;
    styles: '*' | {
        [key: string]: string | number;
    } | Array<{
        [key: string]: string | number;
    } | '*'>;
}

/** @experimental */
export interface AnimationTransitionMetadata extends AnimationMetadata {
    animation: AnimationMetadata | AnimationMetadata[];
    expr: string | ((fromState: string, toState: string) => boolean);
    locals?: {
        [varName: string]: string | number | boolean;
    };
}

/** @experimental */
export interface AnimationTriggerMetadata extends AnimationMetadata {
    definitions: AnimationMetadata[];
    name: string;
}

/** @experimental */
export interface AnimationWaitMetadata extends AnimationMetadata {
    animation: AnimationMetadata | AnimationMetadata[];
    delay: number | string;
}

/** @experimental */
export declare const AUTO_STYLE = "*";

/** @experimental */
export declare function group(steps: AnimationMetadata[]): AnimationGroupMetadata;

/** @experimental */
export declare function keyframes(steps: AnimationStyleMetadata[]): AnimationKeyframesSequenceMetadata;

/** @experimental */
export declare class NoopAnimationPlayer implements AnimationPlayer {
    parentPlayer: AnimationPlayer;
    totalTime: number;
    constructor();
    destroy(): void;
    finish(): void;
    getPosition(): number;
    hasStarted(): boolean;
    init(): void;
    onDestroy(fn: () => void): void;
    onDone(fn: () => void): void;
    onStart(fn: () => void): void;
    pause(): void;
    play(): void;
    reset(): void;
    restart(): void;
    setPosition(p: number): void;
}

/** @experimental */
export declare function query(selector: string, animation: AnimationMetadata | AnimationMetadata[]): AnimationQueryMetadata;

/** @experimental */
export declare function queryAll(selector: string, animation: AnimationMetadata | AnimationMetadata[]): AnimationQueryMetadata;

/** @experimental */
export declare function sequence(steps: AnimationMetadata[]): AnimationSequenceMetadata;

/** @experimental */
export declare function stagger(animation: AnimationMetadata | AnimationMetadata[]): AnimationStaggerMetadata;

/** @experimental */
export declare function state(name: string, styles: AnimationStyleMetadata): AnimationStateMetadata;

/** @experimental */
export declare function style(tokens: '*' | {
    [key: string]: string | number;
} | Array<'*' | {
    [key: string]: string | number;
}>): AnimationStyleMetadata;

/** @experimental */
export declare function transition(stateChangeExpr: string | ((fromState: string, toState: string) => boolean), steps: AnimationMetadata | AnimationMetadata[], locals?: {
    [varName: string]: string | number | boolean;
}): AnimationTransitionMetadata;

/** @experimental */
export declare function trigger(name: string, definitions: AnimationMetadata[]): AnimationTriggerMetadata;

/** @experimental */
export declare function wait(delay: number | string, animation?: AnimationMetadata | AnimationMetadata[]): AnimationWaitMetadata;
