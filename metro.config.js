const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const baseConfig = getDefaultConfig(__dirname);

const customConfig = {
  // Tu peux ajouter ici d’autres options si besoin
};

// On fusionne les deux configs (base + custom)
const finalConfig = mergeConfig(baseConfig, customConfig);

// On exporte la configuration finale avec NativeWind
module.exports = withNativeWind(finalConfig, {
  input: './global.css', // ou '.global.css' si ton fichier est bien à la racine
});
