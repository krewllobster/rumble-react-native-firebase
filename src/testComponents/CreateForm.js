import React, { Component } from 'react';
import {
  Container,
  Label,
  Content,
  Text,
  Form,
  Item,
  Input,
  Button
} from 'native-base';

const elements = {
  string: ({ name }) => (
    <Item>
      <Input placeholder={name} />>
    </Item>
  ),
  number: ({ name }) => (
    <Item>
      <Input placeholder={name} />>
    </Item>
  )
};

const CreateForm = ({ model, onChange, onSubmit }) => {
  return (
    <Form>
      {Object.keys(model).map(k => {
        const { defaultValue, form, type, validation } = model[k];
        return (
          form && (
            <Item key={k} floatingLabel>
              <Label>{k}</Label>
              <Input onChangeText={onChange} />
            </Item>
          )
        );
      })}
      <Button block onPress={onSubmit}>
        <Text>Submit</Text>
      </Button>
    </Form>
  );
};

export default CreateForm;
