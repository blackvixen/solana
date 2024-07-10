interface Account {
    id: string; // Mongoose ObjectId string representation
    userId: string; // Mongoose ObjectId string representation (foreign key)
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    createdAt: Date; // Mapped from "created"
    updatedAt: Date; // Mapped from "modified"
    user: User; // Reference to the User model (onDelete: Cascade)
}

interface Profile {
    id: string; // Mongoose ObjectId string representation
    userId: string; // Mongoose ObjectId string representation (foreign key)
    bio: string;
    createdAt: Date; // Mapped from "created"
    updatedAt: Date; // Mapped from "modified"
    user: User;
}

interface UserAddresses {
    id: string; // Mongoose ObjectId string representation
    userId: string; // Mongoose ObjectId string representation (foreign key)
    streetAndNumber?: string | null;
    city?: string | null;
    country?: string | null;
    state?: string | null;
    longitude?: string | null;
    latitude?: string | null;
    createdAt: Date; // Mapped from "created"
    updatedAt: Date; // Mapped from "modified"
    user: User;
}

interface User {
    id: string; // Mongoose ObjectId string representation
    name?: string | null;
    email?: string | null; // Unique
    emailVerified?: Date | null; // Mapped from "email_verfiied"
    phoneNumber?: string | null; // Unique
    image?: string | null;
    password?: string | null;
    accounts: Account[];
    profile?: Profile | null;
    addresses: UserAddresses[];
    role: UserRole; // Reference to the UserRole model
    createdAt: Date; // Mapped from "created"
    updatedAt: Date; // Mapped from "modified"
}

enum UserRole {
    ADMIN = "ADMIN",
    DIETICIAN = "DIETICIAN",
    RIDER = "RIDER",
    VENDOR = "VENDOR",
    CUSTOMER = "CUSTOMER",
    STAFF = "STAFF",
}

interface UserAccount {
    user: User | null;
}