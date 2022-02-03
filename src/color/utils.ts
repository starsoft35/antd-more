import type { RGBColor, ColorResult } from 'react-color';

// rgb颜色转为string
export function rgbToStr(color: RGBColor): string {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a || 1})`;
}

export declare type ColorMode = 'hex' | 'rgb';

// 转换颜色
export function transformColor(color: ColorResult, colorMode?: ColorMode): string {
  if (colorMode === 'rgb') {
    return rgbToStr(color.rgb);
  }

  return color.hex;
}
