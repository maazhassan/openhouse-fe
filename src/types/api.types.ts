import  { z } from "zod";

export const CommunitySchema = z.object({
  id: z.string(),
  name: z.string(),
  imgUrl: z.string(),
  group: z.string(),
});

export const HouseSchema = z.object({
  id: z.string(),
  communityId: z.string(),
  price: z.number(),
  area: z.number(),
  type: z.string(),
});

export type Community = z.infer<typeof CommunitySchema>;
export type House = z.infer<typeof HouseSchema>;