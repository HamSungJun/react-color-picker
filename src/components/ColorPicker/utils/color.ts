import type {
  IRGBA,
  IHEXA,
  IHSLA,
  ColorValidateFunction,
  ColorMapFunction,
  ColorConvertFunction,
} from "@/components/ColorPicker/types";

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

// TODO
// export const rgbaToHexa: ColorConvertFunction<IRGBA, IHEXA> = (colorMap) => {};
// export const rgbaToHsla: ColorConvertFunction<IRGBA, IHSLA> = (colorMap) => {};
// export const HexaToRgba: ColorConvertFunction<IHEXA, IRGBA> = (colorMap) => {};
// export const HexaToHsla: ColorConvertFunction<IHEXA, IHSLA> = (colorMap) => {};
// export const HslaToRgba: ColorConvertFunction<IHSLA, IRGBA> = (colorMap) => {};
// export const HslaToHexa: ColorConvertFunction<IHSLA, IHEXA> = (colorMap) => {};
