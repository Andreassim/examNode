<script>
    import { Button } from "flowbite-svelte";
    import { sessionId } from "../../store/SessionStore/sessionStore";
    import { BASE_URL } from "../../store/globals";


    export let handleReconnect;

    async function onNewSession(){
        const response = await fetch(`http://${$BASE_URL}/api/session/new`, {
            credentials: "include"
        });
        
        const result = await response.json();
        
        $sessionId = result.data;
        handleReconnect();
    }

    async function onConnectToSession(){
        const body = {
               sessionID: $sessionId 
            };
        
        const response = await fetch(`http://${$BASE_URL}/api/session/reconnect`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
            body: JSON.stringify(body)
        });
        
        const result = await response.json();

        if(!result.data){
                        
        }        
        $sessionId = result.data;
        handleReconnect();
    }


</script>

<form class="text-left">
    <div class="bg-white text-black">
        <div class="pt-1 m-auto mx-10 py-2">
            <input class="w-1/2 bg-slate-100 py-2 rounded-md" bind:value={$sessionId}>
            <Button outline color="green" on:click={() => onNewSession()}>NEW</Button>
            <Button outline color="green" on:click={() => onConnectToSession()}>CONNECT</Button>
            <Button outline color="red">DELETE</Button>
        </div>
    </div>
</form>