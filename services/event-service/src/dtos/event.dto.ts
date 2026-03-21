export interface GetEventsQuery {
  cursor?: string;
  limit?: string | number;
}

export interface CreateEventBody {
  type: string;
  userId: string;
}
