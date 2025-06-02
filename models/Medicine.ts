import mongoose from "mongoose"

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    activeCompound: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dosage: {
      type: String,
    },
    manufacturer: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    sideEffects: [String],
    contraindications: [String],
    image: {
      type: String,
    },
    alternatives: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
      },
    ],
  },
  {
    timestamps: true,
  },
)

export const Medicine = mongoose.models.Medicine || mongoose.model("Medicine", medicineSchema)
