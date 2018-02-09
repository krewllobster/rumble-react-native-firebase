import React from 'react';
import { Container, Grid, Row, Col } from 'native-base';
import { Dimensions } from 'react-native';

const toMatrix = ({ items, columns }) => {
  let matrix = [];
  let k = -1;
  items.forEach((item, index) => {
    if (index % columns == 0) {
      k += 1;
      matrix[k] = [];
    }
    matrix[k].push(item);
  });
  return matrix;
};

const ItemGrid = ({ items, columns, renderItem, padding }) => {
  const matrixItems = toMatrix({ items, columns });
  return (
    <Container style={{ alignItems: 'center', marginTop: padding }}>
      <Grid>
        {matrixItems.map((row, index) => {
          return (
            <Row
              key={index}
              style={{
                height:
                  (Dimensions.get('window').width - padding * columns) /
                  columns,
                paddingTop: padding / 2,
                paddingBottom: padding / 2
              }}
            >
              {row.map((item, i) => {
                return (
                  <Col
                    style={{
                      width:
                        (Dimensions.get('window').width - padding * columns) /
                        columns,
                      paddingLeft: padding / 2,
                      paddingRight: padding / 2
                    }}
                    key={i}
                  >
                    {renderItem(item)}
                  </Col>
                );
              })}
            </Row>
          );
        })}
      </Grid>
    </Container>
  );
};

export default ItemGrid;
