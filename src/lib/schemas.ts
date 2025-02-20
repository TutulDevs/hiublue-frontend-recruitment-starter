import { z } from "zod";
import { OfferTypes } from "./globalTypes";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email address"),
  password: z.string({ required_error: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const createOfferSchema = z.object({
  plan_type: z.enum(
    [OfferTypes.PAY_AS_YOU_GO, OfferTypes.MONTHLY, OfferTypes.YEARLY],
    {
      required_error: "Plan type is required",
      invalid_type_error: "Please select a plan type",
    },
  ),
  additions: z
    .array(z.enum(["refundable", "on_demand", "negotiable"]))
    .min(0)
    .default([]),
  user_id: z.number({
    required_error: "User is required",
  }),
  expired: z.union([
    z.date({
      required_error: "Expiration date is required",
    }),
    z.string({
      required_error: "Expiration date is required",
    }),
  ]),
  price: z
    .number({
      required_error: "Price is required",
    })
    .positive("Price must be positive"),
});

export type CreateOfferSchemaType = z.infer<typeof createOfferSchema>;
