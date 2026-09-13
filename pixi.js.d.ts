declare module 'pixi.js' {
  export interface ObservablePoint {
    set(x?: number, y?: number): this;
    x: number;
    y: number;
  }

  export class Application {
    constructor(options?: any);
    init(options?: any): Promise<any>;
    stage: Container;
    renderer: any;
    view: any;
    canvas: HTMLCanvasElement;
    ticker: Ticker;
    destroy(options?: any, contextOptions?: any): void;
    render(): void;
  }

  export class Container {
    constructor();
    addChild(...children: any[]): any;
    removeChild(...children: any[]): any;
    destroy(options?: any): void;
    position: ObservablePoint;
    scale: ObservablePoint;
    pivot: ObservablePoint;
    rotation: number;
    alpha: number;
    visible: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
    destroyed: boolean;
    interactive: boolean;
    cullable: boolean;
    sortableChildren: boolean;
    interactiveChildren: boolean;
  }

  export class Sprite extends Container {
    constructor(texture?: any);
    static from(texture: any): Sprite;
    texture: any;
  }

  export class Graphics extends Container {
    constructor();
    rect(x: number, y: number, w: number, h: number): this;
    roundRect(x: number, y: number, w: number, h: number, radius: number): this;
    circle(x: number, y: number, radius: number): this;
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number): this;
    fill(color: any): this;
    stroke(color: any): this;
    clear(): this;
  }

  export class Text extends Container {
    constructor(options?: any);
    text: string;
    style: any;
  }

  export class RenderTexture {
    static create(options?: any): RenderTexture;
  }

  export class Assets {
    static load(src: string | string[]): Promise<any>;
    static cache: any;
  }

  export class Texture {
    static from(source: any): Texture;
    static WHITE: Texture;
  }

  export class Ticker {
    add(fn: (ticker: any) => void): this;
    remove(fn: (ticker: any) => void): this;
    start(): void;
    stop(): void;
    update(): void;
    maxFPS: number;
    deltaMS: number;
  }

  export interface ApplicationOptions {
    width?: number;
    height?: number;
    backgroundColor?: number;
    backgroundAlpha?: number;
    antialias?: boolean;
    resolution?: number;
    autoDensity?: boolean;
  }

  const VERSION: string;
  export { VERSION };
}