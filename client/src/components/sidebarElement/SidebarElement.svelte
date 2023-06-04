<script>
    import { activeRequest } from "../../store/sessionStore/sessionStore.js";
    import { BASE_URL, PROTOCOL } from "../../store/globals.js";

    export let request;
    const stylingOptions = ["GET", "POST", "PUT", "PATCH", "DELETE"];

    async function handleActiveRequest(){
        const response = await fetch(`${$PROTOCOL+$BASE_URL}/api/requests/${request.id}`, {
            credentials: "include"
        });
        const json = await response.json();
        const result = JSON.parse(json.data);

        $activeRequest = result
    }

</script>

<div class="text-black py-2 w-full text-left hover:cursor-pointer hover:bg-blue-200 rounded-lg" on:click={() => handleActiveRequest()} on:keydown={() => handleActiveRequest()}>
    <span class= "{stylingOptions.find(method => method == request.method) ? request.method : "bg-gray-700"} rounded-lg text-white p-1 font-bold ml-1">
        {request.method}  
    </span>
    {`${request.id.slice(0,5)}`}
</div>


<style>

.GET {
    background-color: green;
}

.POST {
    background-color: blue;
}

.PUT {
    background-color: purple;
}

.PATCH {
    background-color: yellow;
    color:black;
}

.DELETE {
    background-color: red;
}

</style>
