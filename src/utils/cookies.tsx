import { cookies } from 'next/headers';

export const setCookie = (name: string, value: any, maxAge: number) => {
    cookies().set({
        name,
        value: JSON.stringify(value),
        maxAge, // maxAge in seconds
        path: '/',
    });
};

export const getCookie = (name: string) => {
    const cookie = cookies().get(name);
    return cookie ? JSON.parse(cookie.value) : null;
};