/** @experimental */
export declare class MockAnimationDriver implements AnimationDriver {
    animate(element: any, keyframes: {
        [key: string]: string | number;
    }[], duration: number, delay: number, easing: string, previousPlayers?: any[]): MockAnimationPlayer;
    computeStyle(element: any, prop: string, defaultValue?: string): string;
    static log: AnimationPlayer[];
}

/** @experimental */
export declare class MockAnimationPlayer extends NoopAnimationPlayer {
    currentSnapshot: ɵStyleData;
    delay: number;
    duration: number;
    easing: string;
    element: any;
    keyframes: {
        [key: string]: string | number;
    }[];
    previousPlayers: any[];
    previousStyles: {
        [key: string]: string | number;
    };
    constructor(element: any, keyframes: {
        [key: string]: string | number;
    }[], duration: number, delay: number, easing: string, previousPlayers: any[]);
    beforeDestroy(): void;
    destroy(): void;
    finish(): void;
}
