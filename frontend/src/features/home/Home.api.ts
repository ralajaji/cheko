import z from "zod";

export const getMenu = {
    method: 'GET',
    endpoint: '/api/menu',
    responseSchema: z.array(z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
        price: z.number(),
        image: z.string(),
        calorie: z.number(),
        category: z.string(),
        lat: z.number(),
        lng: z.number()
    })),
    queryParamsSchema: z.object({
		search: z.string().optional(),
        category: z.string().optional(),
	}),
}

export type GetMenuResponseType = z.infer<typeof getMenu.responseSchema>[number];