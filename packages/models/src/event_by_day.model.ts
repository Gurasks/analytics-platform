import mongoose from "mongoose";

const EventsByDaySchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    count: { type: Number, default: 0 },
  },
  { timestamps: true },
);

EventsByDaySchema.index({ date: 1 }, { unique: true });
EventsByDaySchema.index({ count: -1 });

export const EventsByDay = mongoose.model("EventsByDay", EventsByDaySchema);
