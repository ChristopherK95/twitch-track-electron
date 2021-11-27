declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.FunctionComponent<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.wav" {
  const value: any;
  export default value;
}
