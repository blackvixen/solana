enum Status {
    draft = 'DRAFT',
    published = 'PUBLISHED',
    inReview = 'INREVIEW',
}

interface Posts {
    id: string; // cuid string representation
    title?: string | null;
    slug?: string | null; // Unique
    description?: string | null;
    shortDescription?: string | null;
    image?: string | null;
    status: Status; // Default: DRAFT
    tags?: PostTags[];
    createdAt?: Date | null; // Default: now()
    updatedAt?: Date | null; // Updated at timestamp
}

interface PostTags {
    post: Posts; // Reference to the Posts model
    postId: string;
    tag: Tags; // Reference to the Tags model
    tagId: string;
    createdAt: Date; // Default: now()
    // Primary key is a composite of postId and tagId
}

interface Tags {
    id: string; // cuid string representation
    title: string; // Unique
    slug?: string | null; // Unique
    pots?: PostTags[]; // List of PostTags related to this tag
    createdAt?: Date | null; // Default: now()
    updatedAt?: Date | null; // Updated at timestamp
}
