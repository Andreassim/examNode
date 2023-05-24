<script>
    import { Button } from "flowbite-svelte";
    import { session } from "../../store/sessionStore/sessionStore.js";
    import { BASE_URL, user } from "../../store/globals.js";
    import { errorToast } from "../../util/custom-toasters.js";


    export let handleReconnect;

    async function onNewSession(privateSession = false){
        const response = await fetch(`http://${$BASE_URL}/api/session/new?privateSession=${privateSession}`, {
            credentials: "include"
        });
        
        const result = await response.json();
        
        $session = result.data;
        handleReconnect();
    }

    async function onConnectToSession(){
        const body = {
               sessionID: $session.id 
            };
        
        const response = await fetch(`http://${$BASE_URL}/api/session/reconnect`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
            body: JSON.stringify(body)
        });
        
        const result = await response.json();

        console.log(result);

        if(!response.ok){
            errorToast(result.message);                        
            return
        }        
        $session = result.data;
        handleReconnect();
    }

</script>

<form class="text-left">
    <div class="bg-white text-black">
        <div class="pt-1 m-auto mx-10 py-2">
            <div class="grid grid-cols-4">
                <div class=" col-span-3">
                    <input class="w-1/2 bg-slate-100 py-2 rounded-md" bind:value={$session.id}>
                    <Button outline color="green" on:click={() => onNewSession()}>NEW</Button>
                    {#if $user}
                    <Button outline color="blue" on:click={() => onNewSession(true)}>NEW PRIVATE</Button>
                    {/if}
                    <Button outline color="green" on:click={() => onConnectToSession()}>CONNECT</Button>
                    <Button outline color="red">DELETE</Button>
                </div>
                {#if $session.private}
                <div class="cols-span-1 m-auto">
                    <span class="bg-gray-500 p-2 text-white rounded-lg">
                        Private Session               
                    </span>
                </div>
                {/if}
            </div>
        </div>
    </div>
</form>