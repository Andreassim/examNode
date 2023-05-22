import { writable } from "svelte/store";

export let sessionId = writable();
export let requests = writable();
export let activeRequest = writable();


const request = {
    headers: {
        something: "test",
        something2: "test",
    },
    details:{
        id: "12345",
        id2: "12345"
    },
    content:
        `{
            "test":"test"
            "test":"test"
            "test":"test"
            "test":"test"
            "test":"test"
        }`
}

const request2 = {
    headers: {
        something: "test",
        something2: "test",
    },
    details:{
        id: "51325",
        id2: "154123"
    },
    content:
        `{
            "test":"test"
            "test":"test"
            "test":"test"
            "test":"test"
            "test":"test"
        }`
}


export let testRequests = writable([request, request2]);

export const requestList = writable([]); 