export type EventResponse = {
  data: {
    id: string;
    type?: string;
    userId?: string;
    createdAt: string;
  }[];
  pagination: {
    nextCursor: string | null;
    hasMore: boolean;
  };
};
