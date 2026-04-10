export const EVENT_GROUP_BY = ["TYPE", "USER", "DAY"] as const;

export type EventGroupBy = (typeof EVENT_GROUP_BY)[number];
