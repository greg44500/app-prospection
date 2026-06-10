import { z } from "zod";

export const geoPointSchema = z.object({
    type: z.literal("Point"),

    coordinates: z
        .tuple([
            z.number(), // longitude
            z.number(), // latitude
        ]),
});