import mongoose from "mongoose";

const EventsByUserSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    count: { type: Number, default: 0 },
  },
  { timestamps: true },
);

EventsByUserSchema.index({ userId: 1 }, { unique: true });
EventsByUserSchema.index({ count: -1 });

export const EventsByUser = mongoose.model("EventsByUser", EventsByUserSchema);
