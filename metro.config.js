const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = mergeConfig(getDefaultConfig(__dirname), {
  resolver: {
    assetExts: ["db", "mp3", "ttf", "png", "jpg", "jpeg", "svg"], // tu peux adapter selon ton projet
  },
});

module.exports = withNativeWind(config, { input: "./global.css" });
