export interface IColorPicker {
  initialColor?: string;
  onSelectColor?: ({ rgba, hexa, hsla }: IParsedColor) => void;
}

export interface IParsedColor {
  rgba: IRGBA;
  hexa: IHEXA;
  hsla: IHSLA;
}

export interface IRGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface IHEXA {
  r: string;
  g: string;
  b: string;
  a: string;
}

export interface IHSLA {
  h: number;
  s: number;
  l: number;
  a: number;
}

export type ColorMap = IRGBA | IHEXA | IHSLA;
export type ColorValidateFunction = (color: string) => boolean;
export type ColorMapFunction<T> = (color: string) => T;
export type ColorConvertFunction<ColorMapIn extends ColorMap, ColorMapOut> = (
  colorMap: ColorMapIn
) => ColorMapOut;
export type ColorConvertToCssFunction<T extends ColorMap> = (
  colorMap: T
) => string;
