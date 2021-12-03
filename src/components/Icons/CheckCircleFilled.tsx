import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";
import { memo } from "react";

const SvgCheckCircleFilled = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1792 1792"
    style={{
      enableBackground: "new 0 0 1792 1792",
    }}
    xmlSpace="preserve"
    width={24}
    height={24}
    fill="black"
    {...props}
  >
    <Circle cx={896} cy={896} r={782.9} />
    <Path
      d="M1322.7 592.9c-40.6-40.6-106.3-40.6-146.9 0l-455.7 456-170.7-170.3c-40.6-40.6-106.3-40.6-146.9 0-40.6 40.6-40.6 106.3 0 146.9l233.6 232.4c3.1 4.1 6.5 8.1 10.2 11.8 20.5 20.5 47.5 30.6 74.4 30.4 26.8.2 53.7-9.9 74.2-30.4 3.8-3.8 7.3-7.9 10.4-12.1l517.4-517.8c40.6-40.5 40.6-106.3 0-146.9z"
      style={{
        fill: "#fff",
      }}
    />
  </Svg>
);

const Memo = memo(SvgCheckCircleFilled);
export default Memo;
