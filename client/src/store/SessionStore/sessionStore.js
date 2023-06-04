import { writable } from "svelte/store";

export const session = writable({id:"", private: false});
export const activeRequest = writable();
export const requestList = writable([]);
export const userSessions = writable({});
