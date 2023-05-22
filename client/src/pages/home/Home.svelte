<script>
    import { Sidebar, SidebarGroup, SidebarWrapper } from 'flowbite-svelte';
    import RequestPanel from '../../components/requestpanel/RequestPanel.svelte';
    import { testRequests, activeRequest, sessionId, requestList } from '../../store/SessionStore/sessionStore';
    import io from "socket.io-client";
    import { onMount } from 'svelte';
    import { BASE_URL } from '../../store/globals';
    import SidebarElement from '../../components/SidebarElement.svelte';

    let requests = $requestList;
    const socket = io($BASE_URL, {
        withCredentials: true
    });

    socket.on("newRequest", (data) => {
        $requestList = [...$requestList, data.data];
    });

    onMount(async () => {
        if(!$sessionId){
            const response = await fetch(`http://${$BASE_URL}/api/session/new`, { // connects - change this
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
                    {#each $requestList as request, i}
                        <SidebarElement request={request}></SidebarElement>
                    {/each}
                </SidebarGroup>
            </SidebarWrapper>
        </Sidebar>
        {#if $activeRequest}
            <RequestPanel request={$activeRequest}></RequestPanel>
            {:else}
            <h1>Ready for requests</h1>
        {/if}
    </div>
</div>