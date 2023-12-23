import { Crime } from './Crime';

export const CRIMES: Crime[] = [
  {
    key: '1254125154',
    data: {
      name: 'Sukuna',
      extra: 'none',
      image:
        'https://i.pinimg.com/originals/ca/f8/5d/caf85d12606cf1d9e9990aa750ef3103.jpg',
      phone: '1232328473',
      status: true,
      location: {
        name: 'Metrotown',
        latitude: 49.2276,
        longitude: -123.0076,
      },
      reporter: 'Yuji',
      time_reported: 1702706586824,
    },
  },
  {
    key: '16356373634',
    data: {
      name: 'Mahito',
      extra: 'none',
      image:
        'https://i.pinimg.com/originals/ca/f8/5d/caf85d12606cf1d9e9990aa750ef3103.jpg',
      phone: '1232328473',
      status: true,
      location: {
        name: 'Metrotown',
        latitude: 49.2276,
        longitude: -123.0076,
      },
      reporter: 'Yuji',
      time_reported: 1702706586824,
    },
  },
  {
    key: '676586848',
    data: {
      name: 'Geto',
      extra: 'none',
      image:
        'https://i.pinimg.com/originals/ca/f8/5d/caf85d12606cf1d9e9990aa750ef3103.jpg',
      phone: '1232328473',
      status: true,
      location: {
        name: 'Surrey',
        latitude: 49.1867,
        longitude: -122.849,
      },
      reporter: 'Gojo',
      time_reported: new Date().getTime(),
    },
  },
];
