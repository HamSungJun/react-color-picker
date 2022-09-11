import { useEffect, useState } from "react";

import ColorBlock from "@/components/ColorPicker/ColorBlock";
import Saturation from "@/components/ColorPicker/Saturation";
import ColorMemory from "@/components/ColorPicker/ColorMemory";
import Slider from "@/components/ColorPicker/Slider";

import "@/components/ColorPicker/index.scss";

import type { IColorPicker } from "@/components/ColorPicker/types";

export default function ColorPicker({
  initialColor,
  onSelectColor,
}: IColorPicker) {
  const [color, setColor] = useState("rgb(12, 34 , 56)");
  const [opacity, setOpacity] = useState(0);

  return (
    <div className="react-color-picker">
      <section className="react-color-picker__left">
        <Saturation />
      </section>
      <section className="react-color-picker__right">
        <div className="react-color-picker__right__top">
          <ColorBlock />
          <ColorMemory />
        </div>
        <div className="react-color-picker__right__bottom">
          <Slider />
          <Slider />
        </div>
      </section>
    </div>
  );
}
