export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
}

export interface Link {
    _id: string;
    title: string;
    url: string;
    tags: string[];
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}