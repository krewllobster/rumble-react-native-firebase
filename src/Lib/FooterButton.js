import React, { Component } from 'react';
import { Footer, FooterTab, Button, Text } from 'native-base';
import { KeyboardAvoidingView } from 'react-native';

const FooterButton = ({
  disabled,
  onPress,
  enabledColor = '#37F',
  disabledColor = '#777',
  text = 'Next',
  avoidKeyboard = false
}) => {
  if (avoidKeyboard) {
    return (
      <Button
        disabled={disabled}
        onPress={() => onPress()}
        full
        style={{
          backgroundColor: disabled ? disabledColor : enabledColor
        }}
      >
        <Text style={{ color: '#FFF' }}>{text}</Text>
      </Button>
    );
  } else {
    return (
      <Footer>
        <FooterTab>
          <Button
            disabled={disabled}
            onPress={() => onPress()}
            full
            style={{
              backgroundColor: disabled ? disabledColor : enabledColor
            }}
          >
            <Text style={{ color: '#FFF' }}>{text}</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
};

export default FooterButton;
