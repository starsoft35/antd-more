export declare interface Rgb {
  r: number | string;
  g: number | string;
  b: number | string;
  a?: number | string;
}

export declare interface Hsv {
  h: number;
  s: number;
  v: number;
  a?: number;
}

export declare interface Hsl {
  h: number;
  s: number;
  l: number;
  a?: number;
}

// rgb颜色转为string
export function rgbToStr(color: Rgb): string {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a || 1})`;
}

export declare interface ColorObj {
  hex: string;
  rgb: Rgb;
  hsl?: Hsl;
  hsv?: Hsv;
  oldHue?: number;
  source?: string;
}

export declare type ColorMode = 'hex' | 'rgb';

// 转换颜色
export function transformColor(color: ColorObj, colorMode?: ColorMode): string {
  if (colorMode === 'rgb') {
    return rgbToStr(color.rgb);
  }

  return color.hex;
}
