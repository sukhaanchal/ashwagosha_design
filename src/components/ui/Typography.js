import React from 'react';
import { Text } from 'react-native';
import { TYPOGRAPHY } from '../../design-system/tokens';

export function Typography({ variant = 'body', style, children, ...props }) {
  return (
    <Text style={[TYPOGRAPHY[variant], style]} {...props}>
      {children}
    </Text>
  );
}

export function H1(props) {
  return <Typography variant="h1" {...props} />;
}

export function H2(props) {
  return <Typography variant="h2" {...props} />;
}

export function H3(props) {
  return <Typography variant="h3" {...props} />;
}

export function Body(props) {
  return <Typography variant="body" {...props} />;
}

export function BodySmall(props) {
  return <Typography variant="bodySmall" {...props} />;
}

export function Label(props) {
  return <Typography variant="label" {...props} />;
}

export function Caption(props) {
  return <Typography variant="caption" {...props} />;
}
