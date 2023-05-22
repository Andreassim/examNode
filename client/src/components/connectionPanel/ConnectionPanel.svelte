<script>
    import { Button, Label, ToolbarButton, Input, ButtonGroup, InputAddon } from "flowbite-svelte";
    import { sessionId } from "../../store/SessionStore/sessionStore";
    import { BASE_URL } from "../../store/globals";


    export let handleReconnect;

    async function onNewSession(){
        const response = await fetch(`http://${$BASE_URL}/api/session/new`, { // connects - change this
            credentials: "include"
        });
        
        const result = await response.json();
        
        $sessionId = result.data;
        handleReconnect();
    }

</script>

<form class="text-left">
    <div class="bg-white text-black">
        <div class="pt-1 m-auto mx-10 py-2">
            <input class="w-1/2 bg-slate-100 py-2 rounded-md" bind:value={$sessionId}>
            <Button outline color="green" on:click={() => onNewSession()}>NEW</Button>
            <Button outline color="green">CONNECT</Button>
            <Button outline color="red">DELETE</Button>
        </div>
    </div>
</form>