export default {
    name: '.',
    children: [
      {
        name: 'keyring',
        children: [
          { name: 'ecdh' },
          { name: 'A2' },
          { name: 'A3' },
          {
            name: 'for loop',
            children: [
              {
                name: 'C1',
              },
              {
                name: 'D',
                children: [
                  {
                    name: 'D1',
                  },
                  {
                    name: 'D2',
                  },
                  {
                    name: 'D3',
                  },
                ],
              },
            ],
          },
        ],
      },
      { name: 'Z' },
      {
        name: 'B',
        children: [{ name: 'Base64', children: [{name: 'secret'}] }, { name: 'B2' }, { name: 'B3' }],
      },
    ],
  }