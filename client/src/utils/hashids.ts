import Hashids from 'hashids';

const salt = import.meta.env.VITE_HASH_SALT || 'default_salt';
const hashids = new Hashids(salt, 8);

export const encodeId = (hexId: string): string => {
    return hashids.encodeHex(hexId);
};

export const decodeId = (hash: string): string => {
    const decoded = hashids.decodeHex(hash);
    return decoded === 'string' ? decoded : String(decoded);
};