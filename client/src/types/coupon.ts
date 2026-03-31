export default interface ICoupon {
    _id: string;
    code: string;
    title: string;
    description: string;
    value: number;
    expiresAt: string;
}