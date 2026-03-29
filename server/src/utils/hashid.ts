import Hashids from 'hashids';

const hashids = new Hashids(process.env.HASH_SALT || 'default_salt', 8);

export const encodeId = (hexId: string): string => {
    return hashids.encodeHex(hexId);
};

export const decodeId = (hash: any): string => {
    const decoded = hashids.decodeHex(hash);
    const result = Array.isArray(decoded) ? decoded[0] : decoded;
    return result as string;
};