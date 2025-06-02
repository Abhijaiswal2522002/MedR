import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        medicine: {
          type: String,
          required: true,
        },
        pharmacy: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    deliveryAddress: {
      address: String,
      city: String,
      pincode: String,
      phone: String,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "out-for-delivery", "delivered", "cancelled"],
      default: "pending",
    },
    estimatedDelivery: {
      type: Date,
    },
    actualDelivery: {
      type: Date,
    },
    deliveryPartner: {
      name: String,
      phone: String,
      vehicleNumber: String,
    },
    trackingId: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
)

// Generate tracking ID before saving
orderSchema.pre("save", function (next) {
  if (!this.trackingId) {
    this.trackingId = `MR${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`
  }
  next()
})

export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema)
