import mongoose from "mongoose";

const EventsByTypeSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    count: { type: Number, default: 0 },
  },
  { timestamps: true },
);

EventsByTypeSchema.index({ type: 1 }, { unique: true });
EventsByTypeSchema.index({ count: -1 });

export const EventsByType = mongoose.model("EventsByType", EventsByTypeSchema);
