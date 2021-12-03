## How to install

Before everything, [prepare your enviroment](https://docs.expo.dev/get-started/installation/) to be ready for Expo.

### web

`yarn dev` - run on local machine

### ios/android

Run on web and scan a QR code, appeared in console.

## Using SVG icons

SVG icons in [icons](icons) directory automatically converted to React components using [SVGR](https://react-svgr.com/docs/options/) tool
and configured in [svgr.config.js](svgr.config.js) file:

1. Put your icon (i.e. `my-svg-icon.svg`) in `icons` directory (you can download SVG icons [here](https://www.svgrepo.com/vectors/check/monocolor/))
1. Run `yarn processSvgIcons` to generate `src/components/Icons/MySvgIcon.tsx` file with `MySvgIcon` component
1. Import and use like `<MySvgIcon />` or customize it's color and size `<MySvgIcon fill="red" width={100} height={100} />`


## Use correct Node version

Run `nvm use` to apply proper Node version from [.nvmrc](.nvmrc) file.