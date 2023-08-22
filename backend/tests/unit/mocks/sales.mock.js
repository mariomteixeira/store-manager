const salesAll = [
    {
      saleId: 1,
      date: '2023-08-18T04:50:19.000Z',
      productId: 1,
      quantity: 5,
    },
    {
      saleId: 1,
      date: '2023-08-18T04:50:19.000Z',
      productId: 2,
      quantity: 10,
    },
    {
      saleId: 2,
      date: '2023-08-18T04:50:19.000Z',
      productId: 3,
      quantity: 15,
    },
  ];

const salesByProductId = [
    {
      date: '2023-08-18T04:50:19.000Z',
      productId: 1,
      quantity: 5,
    },
  ];

const salesFound = {
    status: 'SUCCESSFUL',
    data: salesAll,
  };

module.exports = {
    salesAll,
    salesByProductId,
    salesFound,
  };