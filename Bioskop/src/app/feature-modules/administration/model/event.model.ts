export interface Event {
    id: number;
    name: string;
    type: string;
    date: string;
    time: string;
    location: string;
    description: string;
    movie: string;
    specialPrice?: number;
    discount?: number;
    discountCondition?: string;
    active: boolean;
}
