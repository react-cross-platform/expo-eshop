import * as React from "react";
import Svg, { SvgProps, Circle } from "react-native-svg";
import { memo } from "react";

const SvgCircleFilled = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 120 120"
    xmlSpace="preserve"
    fill="black"
    {...props}
  >
    <Circle cx={60} cy={60.834} r={54.167} />
  </Svg>
);

const Memo = memo(SvgCircleFilled);
export default Memo;
