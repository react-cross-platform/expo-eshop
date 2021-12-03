// Options https://react-svgr.com/docs/options/
module.exports = {
  icon: true,
  native: { expo: true },
  typescript: true,
  memo: true,
  outDir: "src/components/Icons",
  svgProps: { fill: "black", width: 20, height: 20 },
  dimensions: false,
//   ignoreExisting: true, // Don't overwrite already generated *.tsx files
};
