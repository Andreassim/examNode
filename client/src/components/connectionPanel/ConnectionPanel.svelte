<script>
    import { Button } from "flowbite-svelte";
    import { activeRequest, requestList, session } from "../../store/sessionStore/sessionStore.js";
    import { BASE_URL, PROTOCOL, user } from "../../store/globals.js";
    import { errorToast, succesToast } from "../../util/custom-toasters.js";
    import { onDestroy, onMount } from "svelte";
    import { useNavigate, useParams } from "svelte-navigator";
    import { io } from "socket.io-client";
    
    const navigate = useNavigate();
    let refreshConnectionOnNewSession = false;

    const socket = io($BASE_URL, {
        withCredentials: true,
        autoConnect: false
    });

    const params = useParams()
    onMount(() =>{
        if($params.sessionId){
            if($params.sessionId !== $session.id){
                $session.id = $params.sessionId;
            }
            handleConnectToSession();
            refreshConnectionOnNewSession = true;
        }
    });

    onDestroy(() => {
        if(socket.connected){
            socket.disconnect();
        }
    });

    async function handleNewSession(privateSession = false){
        const response = await fetch(`${$PROTOCOL+$BASE_URL}/api/sessions/new?privateSession=${privateSession}`, {
            credentials: "include"
        });
        
        const result = await response.json();
        
        $session = result.data;
        navigate(`/$/${$session.id}`);
        if(refreshConnectionOnNewSession){
            handleConnectToSession();
        }
    }

    async function handleConnectToSession(){
        const body = {
               sessionID: $session.id 
            };
        
        const response = await fetch(`${$PROTOCOL+$BASE_URL}/api/sessions/reconnect`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
            body: JSON.stringify(body)
        });
        
        const result = await response.json();

        if(!response.ok){
            return  errorToast(result.message);                        
        }        
        $session = result.data;
        handleReconnect();
    }

    async function handleReconnect() {
        if(socket.connected){
            socket.disconnect();
        }
        $requestList = [];
        $activeRequest = null;
        socket.connect();
        succesToast("Connected to " + $session.id);
    }
    
    async function handleDeleteSession(){
        if(!$session.id){
            return errorToast("No session found!");
        }
        const response = await fetch(`${$PROTOCOL+$BASE_URL}/api/sessions/` + $session.id, {
            method: "DELETE",
            credentials: "include",
        });
        
        const json = await response.json();
        
        if(!response.ok){
            return errorToast(json.message);
        }

        succesToast(json.message);
        $session = {id: "", private: false};
        $requestList =[];
        $activeRequest = null;
        refreshConnectionOnNewSession = false;
        navigate("/");
    }
    
    socket.on("newRequest", (data) => {
        succesToast("New request!");
        $requestList = [...$requestList, data.data];
    });
    
    socket.on("prevNotications", (data) => {
        const array = data.data
        $requestList = array;
    });
    
</script>

<form class="text-left border-b-2 border-slate-200">
    <div class="bg-white text-black">
        <div class="pt-1 m-auto mx-10 py-2">
            <div class="grid grid-cols-4">
                <div class=" col-span-3">
                    <input class="w-1/2 bg-slate-100 py-2 rounded-md" bind:value={$session.id}>
                    <Button outline color="green" on:click={() => handleNewSession()}>NEW</Button>
                    {#if $user}
                    <Button outline color="blue" on:click={() => handleNewSession(true)}>NEW PRIVATE</Button>
                    {/if}
                    <Button outline color="green" on:click={() => handleConnectToSession()}>CONNECT</Button>
                    <Button outline color="red" on:click={() => handleDeleteSession()}>DELETE</Button>
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