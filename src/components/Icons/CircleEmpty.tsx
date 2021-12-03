import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { memo } from "react";

const SvgCircleEmpty = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 29.107 29.107"
    style={{
      enableBackground: "new 0 0 29.107 29.107",
    }}
    xmlSpace="preserve"
    width={24}
    height={24}
    fill="black"
    {...props}
  >
    <Path d="M14.558 2.079c6.877 0 12.471 5.597 12.471 12.473 0 6.877-5.594 12.476-12.471 12.476-6.879 0-12.478-5.599-12.478-12.476 0-6.876 5.599-12.473 12.478-12.473m0-2.079C6.563 0 0 6.562 0 14.552c0 7.995 6.563 14.555 14.558 14.555s14.549-6.56 14.549-14.555C29.106 6.562 22.552 0 14.558 0z" />
  </Svg>
);

const Memo = memo(SvgCircleEmpty);
export default Memo;
