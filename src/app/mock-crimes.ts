import { Crime } from './Crime';

export const CRIMES: Crime[] = [
  {
    id: '1',
    location: {
      name: 'Metrotown',
      latitude: 49.2276,
      longitude: -123.0076,
    },
    name: 'Bobby',
    time_reported: new Date().getTime(),
    status: true,
    phone: '09238123',
    reporter: 'Jax',
    extra: 'Gruh',
  },
  {
    id: '2',
    location: {
      name: 'Surrey',
      latitude: 49.2276,
      longitude: -123.0076,
    },
    name: 'Brad',
    time_reported: new Date().getTime(),
    status: true,
    phone: '012321332',
    reporter: 'Keene',
    extra: 'WTF',
  },
  {
    id: '3',
    location: {
      name: 'Metrotown',
      latitude: 49.1867,
      longitude: -122.849,
    },
    name: 'Valentine',
    time_reported: new Date().getTime(),
    status: false,
    phone: '16364675487657',
    reporter: 'Sid',
    extra: 'WTF',
  },
];
