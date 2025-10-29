const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Redirect react-native-worklets to react-native-worklets-core
  if (moduleName === 'react-native-worklets') {
    return context.resolveRequest(context, 'react-native-worklets-core', platform);
  }
  
  // Otherwise chain to the default resolver.
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
