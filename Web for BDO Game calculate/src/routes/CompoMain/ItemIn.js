import React, { useState } from 'react';
import { Box, Container, Flex, Select, SimpleGrid, Text } from '@mantine/core';

const ItemIn = () => {
  const [items, setItems] = useState(Array(7).fill({ name: '', detail1: '', detail2: '', detail3: '', detail4: '' }));

  const handleInputChange = (e, index, field) => {
    const { value } = e.target;
    setItems(items.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  return (
    <Container p={'xl'} sx={{ flexGrow: '1' }} bg="dark.8" size={'80%'} mt={'xl'}>
      <Flex justify="center" wrap="wrap" gap={'80px'}>
        <table className="custom-table">
          <thead>
            <tr>
              <th className="table-header">Name</th>
              <th className="table-header">Area</th>
              <th className="table-header">QTY</th>
              <th className="table-header">Price</th>
              <th className="table-header">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <input type="text" value={item.name} onChange={(e) => handleInputChange(e, index, 'name')} />
                </td>
                <td>
                  <input type="text" value={item.detail1} onChange={(e) => handleInputChange(e, index, 'detail1')} />
                </td>
                <td>
                  <input type="text" value={item.detail2} onChange={(e) => handleInputChange(e, index, 'detail2')} />
                </td>
                <td>
                  <input type="text" value={item.detail3} onChange={(e) => handleInputChange(e, index, 'detail3')} />
                </td>
                <td>
                  <input type="text" value={item.detail4} onChange={(e) => handleInputChange(e, index, 'detail4')} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Flex>
      <style jsx>{`
        .custom-table {
          border-collapse: collapse;
          width: 100%;
          margin-top: 24px;
          margin-bottom: 24px;
        }

        .custom-table td,
        .custom-table th {
          padding: 8px;
          text-align: center;
        }

        .table-header {
          background-color: #333;
          color: white;
          text-align: center;
        }

        .custom-table input {
          border: none;
          background-color: #646464;
          padding: 8px;
          width: 100%;
        }
      `}</style>
    </Container>
  );
};

export default ItemIn;
