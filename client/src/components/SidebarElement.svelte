<script>
    import { activeRequest } from "../store/sessionStore/sessionStore.js";
    import { BASE_URL } from "../store/globals";

    export let request;

    //click change activeRequest

    async function handleActiveRequest(){

        const response = await fetch("http://" + $BASE_URL + "/api/request/" + request.id, {
            credentials: "include"
        });
        const json = await response.json();
        const result = JSON.parse(json.data.data);

        $activeRequest = result
    }

</script>

<div class="text-black py-2 w-full text-left hover:cursor-pointer hover:bg-blue-200 rounded-lg" on:click={() => handleActiveRequest()} on:keydown={() => handleActiveRequest()}>
    <span class= "{request.method} rounded-lg text-white p-1 font-bold ml-1">
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
}

.DELETE {
    background-color: red;
}

</style>