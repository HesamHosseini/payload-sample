import config from "@/payload.config";
import { getPayload } from "payload";

let cached = (global as any).payload;

if (!cached) {
    cached = (global as any).payload = { client: null, promise: null };
}

export const initPayloadClient = async () => {
    if (cached.client) return cached.client;

    if (!cached.promise) {
        cached.promise = getPayload({
            config,
        });
    }

    try {
        cached.client = await cached.promise;
    } catch (err) {
        cached.promise = null;
        throw err;
    }

    return cached.client;
};
