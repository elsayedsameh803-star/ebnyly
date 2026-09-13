declare module 'nanoid' {
  export function nanoid(size?: number): string;
  export function customAlphabet(alphabet: string, size?: number): () => string;
  export function customRandom(
    alphabet: string,
    size: number,
    getRandom: (bytes: number) => Uint8Array
  ): () => string;
  export const urlAlphabet: string;
  export function random(bytes: number): Uint8Array;
}