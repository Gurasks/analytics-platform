import { EventModel } from "@analytics/models";
import { EventStatsInput } from "@analytics/shared-types";

export async function getEventStats(input: EventStatsInput) {
  const match: any = {};

  if (input.from || input.to) {
    match.createdAt = {};
    if (input.from) match.createdAt.$gte = new Date(input.from);
    if (input.to) match.createdAt.$lte = new Date(input.to);
  }

  let groupId;

  switch (input.groupBy) {
    case "TYPE":
      groupId = "$type";
      break;
    case "USER":
      groupId = "$userId";
      break;
    case "DAY":
      groupId = {
        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
      };
      break;
  }

  return EventModel.aggregate([
    { $match: match },
    {
      $group: {
        _id: groupId,
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        key: "$_id",
        count: 1,
        _id: 0,
      },
    },
    { $sort: { count: -1 } },
  ]);
}
