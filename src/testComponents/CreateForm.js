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
      {Object.entries(model)
        .filter(([k, v]) => v.form.display)
        .sort((a, b) => a[1].form.position - b[1].form.position)
        .map(([k, v]) => {
          const { defaultValue, form, type, validation } = v;
          return (
            <Item key={k} floatingLabel>
              <Label>{k}</Label>
              <Input onChangeText={onChange} />
            </Item>
          );
        })}
      <Button block onPress={onSubmit} style={{ marginTop: 15 }}>
        <Text>Submit</Text>
      </Button>
    </Form>
  );
};

export default CreateForm;
