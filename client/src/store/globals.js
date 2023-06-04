import { readable, writable } from "svelte/store";

export const PROTOCOL = readable("http://");
export const BASE_URL = readable("localhost:8080");
export const user = writable();
