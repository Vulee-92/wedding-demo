// src/types.ts
export interface Guest {
    _id: string;
    name: string;
    guestType: 'bride' | 'groom' | 'general';
    link: string;
    note?: string;
    status: 'pending' | 'sent';
    timestamp: string; // Giữ lại timestamp là optional
}