import { Item } from "@/types/Type";
import { Schema, model, models } from "mongoose";

const dataSchema = new Schema<Item>([
  {
    Name: { type: String },
    Age: { type: Number },
  },
]);

const DataModel = models.Data || model<Item>("Data", dataSchema);

export default DataModel;
