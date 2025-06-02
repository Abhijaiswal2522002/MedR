import mongoose from "mongoose"

const pharmacySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    openingHours: {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String },
    },
    inventory: [
      {
        medicine: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Medicine",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 0,
        },
        price: {
          type: Number,
          required: true,
        },
        expiryDate: {
          type: Date,
        },
        lastUpdated: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    deliveryAvailable: {
      type: Boolean,
      default: false,
    },
    deliveryRadius: {
      type: Number, // in kilometers
      default: 5,
    },
  },
  {
    timestamps: true,
  },
)

export const Pharmacy = mongoose.models.Pharmacy || mongoose.model("Pharmacy", pharmacySchema)
