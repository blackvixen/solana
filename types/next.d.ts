// Defines a custom interface that extends NextApiRequest

import { NextApiRequest } from 'next';

declare module 'next' {
    interface NextApiRequest {
        country: string | null;
        longitude: number | undefined;
        latitude: number | undefined;
    }
}
