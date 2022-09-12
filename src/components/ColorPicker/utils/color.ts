import type {
  IRGBA,
  IHEXA,
  IHSLA,
  ColorValidateFunction,
  ColorMapFunction,
  ColorConvertFunction,
  ColorConvertToCssFunction,
} from "@/components/ColorPicker/types";

// REFERENCE: https://css-tricks.com/converting-color-spaces-in-javascript/

export const decToHex = (num: number) => {
  const hexed = num.toString(16);
  return hexed.length === 1 ? `${0}${hexed}` : `${hexed}`;
};
export const hexToDec = (hex: string) => {
  return parseInt(`0x${hex}`);
};
export const decAlphaToHex = (alpha: number) => {
  const hexedAlpha = Math.round(alpha * 255).toString(16);
  return hexedAlpha.length === 1 ? `${0}${hexedAlpha}` : `${hexedAlpha}`;
};
export const hexToDecAlpha = (hexedAlpha: string) => {
  const decAlpha = parseInt(`0x${hexedAlpha}`);
  return parseFloat((decAlpha / 255).toFixed(3));
};
export const normalizeDec = (num: number) => {
  return parseFloat((num / 255).toFixed(3));
};

export const isValidRgbaColor: ColorValidateFunction = (color) =>
  color.startsWith("rgb") || color.startsWith("rgba");
export const isValidHexaColor: ColorValidateFunction = (color) =>
  color.startsWith("#");
export const isValidHslaColor: ColorValidateFunction = (color) =>
  color.startsWith("hsl") || color.startsWith("hsla");

export const toRgbaMap: ColorMapFunction<IRGBA> = (color) => {
  const [r, g, b, a = 1] = color
    .slice(color.indexOf("(") + 1, color.indexOf(")"))
    .split(",")
    .map((value) => Number(value.trim()));
  return { r, g, b, a };
};
export const toHexaMap: ColorMapFunction<IHEXA> = (color) => {
  const hexa = color.slice(1);
  const [r, g, b, a = "ff"] = [
    `${hexa[0]}${hexa[1]}`,
    `${hexa[2]}${hexa[3]}`,
    `${hexa[4]}${hexa[5]}`,
    hexa.length === 8 ? `${hexa[6]}${hexa[7]}` : undefined,
  ];
  return { r, g, b, a };
};
export const toHslaMap: ColorMapFunction<IHSLA> = (color) => {
  const [h, s, l, a = 1] = color
    .slice(color.indexOf("(") + 1, color.indexOf(")"))
    .split(",")
    .map((value) => Number(value.trim().replaceAll("%", "")));
  return { h, s, l, a };
};

export const rgbaToHexa: ColorConvertFunction<IRGBA, IHEXA> = (colorMap) => {
  const { r, g, b, a } = colorMap;
  return {
    r: decToHex(r),
    g: decToHex(g),
    b: decToHex(b),
    a: decAlphaToHex(a),
  };
};
export const rgbaToHsla: ColorConvertFunction<IRGBA, IHSLA> = (colorMap) => {
  const { r, g, b, a } = colorMap;
  const normalizedR = normalizeDec(r);
  const normalizedG = normalizeDec(g);
  const normalizedB = normalizeDec(b);
  const maxNormalizedValue = Math.max(normalizedR, normalizedG, normalizedB);
  const minNormalizedValue = Math.min(normalizedR, normalizedG, normalizedB);
  const chroma = maxNormalizedValue - minNormalizedValue;
  let h = 0;
  let s = 0;
  let l = 0;
  if (chroma === 0) {
    h = 0;
  } else if (maxNormalizedValue === normalizedR) {
    h = ((normalizedG - normalizedB) / chroma) % 6;
  } else if (maxNormalizedValue === normalizedG) {
    h = (normalizedB - normalizedR) / chroma + 2;
  } else if (maxNormalizedValue === normalizedB) {
    h = (normalizedR - normalizedG) / chroma + 4;
  }
  h = Math.round(h * 60);
  if (h < 0) {
    h += 360;
  }
  l = (maxNormalizedValue + minNormalizedValue) / 2;
  s = chroma === 0 ? 0 : chroma / (1 - Math.abs(2 * l - 1));
  l *= 100;
  s *= 100;
  return { h, s, l, a };
};
export const HexaToRgba: ColorConvertFunction<IHEXA, IRGBA> = (colorMap) => {
  const { r, g, b, a } = colorMap;
  return {
    r: hexToDec(r),
    g: hexToDec(g),
    b: hexToDec(b),
    a: hexToDecAlpha(a),
  };
};
export const HexaToHsla: ColorConvertFunction<IHEXA, IHSLA> = (colorMap) => {
  const rgbaColorMap = HexaToRgba(colorMap);
  return rgbaToHsla(rgbaColorMap);
};
export const HslaToRgba: ColorConvertFunction<IHSLA, IRGBA> = (colorMap) => {
  const { h, s, l, a } = colorMap;
  const normalizedS = s / 100;
  const normalizedL = l / 100;
  let chroma = (1 - Math.abs(2 * normalizedL - 1)) * normalizedS;
  let x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = normalizedL - chroma / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (0 <= h && h < 60) {
    r = chroma;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = chroma;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = chroma;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = chroma;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = chroma;
  } else if (300 <= h && h < 360) {
    r = chroma;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return { r, g, b, a };
};
export const HslaToHexa: ColorConvertFunction<IHSLA, IHEXA> = (colorMap) => {
  const rgbaColorMap = HslaToRgba(colorMap);
  return rgbaToHexa(rgbaColorMap);
};

export const toCssRgbaString: ColorConvertToCssFunction<IRGBA> = (colorMap) => {
  const { r, g, b, a } = colorMap;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
export const toCssHexaString: ColorConvertToCssFunction<IHEXA> = (colorMap) => {
  const { r, g, b, a } = colorMap;
  return `#${r}${g}${b}${a}`;
};
export const toCssHslaString: ColorConvertToCssFunction<IHSLA> = (colorMap) => {
  const { h, s, l, a } = colorMap;
  return `hsla(${h}, ${s}%, ${l}%, ${a})`;
};
