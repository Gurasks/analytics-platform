import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    type: String,
    userId: String,
    data: Object,
  },
  { timestamps: true },
);

export const EventModel = mongoose.model("Event", eventSchema);
