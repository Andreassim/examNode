<script>
    import { Sidebar, SidebarGroup, SidebarWrapper } from 'flowbite-svelte';
    import RequestPanel from '../../components/requestpanel/RequestPanel.svelte';
    import { testRequests, activeRequest, sessionId } from '../../store/SessionStore/sessionStore';
    import io from "socket.io-client";
    import { onMount } from 'svelte';
    import { BASE_URL } from '../../store/globals';

    let requests = $testRequests;
    $activeRequest = requests[0];

    const socket = io($BASE_URL, {
        withCredentials: true
    });

    socket.on("newRequest", (data) => {
        console.log(data);
    });

    onMount(async () => {
        if(!$sessionId){
            const response = await fetch(`http://${$BASE_URL}/test`, { // connects - change this
                credentials: "include"
            });
            
            const result = await response.json();
            
            $sessionId = result.data;
        }
    });

    
</script>

<div class="h-full">
    <h1>Connected to {$sessionId}</h1>
    <div class="flex flex-row h-full">
        <Sidebar class="h-full">
            <SidebarWrapper class="rounded-none bg-white h-full">
                <div class="text-blue-600">
                    Requests
                </div>
                <SidebarGroup>
                    {#each requests as request, i}
                        <div class="text-black">
                            {`${i}: ${request.details.id.slice(0,5)}`}
                        </div>       
                    {/each}
                </SidebarGroup>
            </SidebarWrapper>
        </Sidebar>
        {#if requests.length != 0}
            <RequestPanel request={$activeRequest}></RequestPanel>
        {/if}
    </div>
</div>