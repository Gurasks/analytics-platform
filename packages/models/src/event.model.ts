import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    eventId: { type: String, required: true, unique: true },
    type: String,
    userId: String,
    data: Object,
  },
  { timestamps: true },
);
EventSchema.index({ type: 1, _id: -1 });
EventSchema.index({ userId: 1, _id: -1 });
EventSchema.index({ type: 1, userId: 1, _id: -1 });

export const EventModel = mongoose.model("Event", EventSchema);
