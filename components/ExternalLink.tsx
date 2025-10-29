import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform, Linking, TouchableOpacity, Text } from 'react-native';

type Props = ComponentProps<typeof TouchableOpacity> & { 
  href: string;
};

export function ExternalLink({ href, children, ...rest }: Props) {
  const handlePress = async () => {
    if (Platform.OS !== 'web') {
      // Open the link in an in-app browser.
      await openBrowserAsync(href);
    } else {
      // On web, open in a new tab
      await Linking.openURL(href);
    }
  };

  return (
    <TouchableOpacity {...rest} onPress={handlePress}>
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </TouchableOpacity>
  );
}
