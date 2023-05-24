<script>
    import { Sidebar, SidebarGroup, SidebarWrapper } from 'flowbite-svelte';
    import RequestPanel from '../../components/requestpanel/RequestPanel.svelte';
    import { activeRequest, requestList, session } from '../../store/sessionStore/sessionStore.js';
    import io from "socket.io-client";
    import { BASE_URL } from '../../store/globals.js';
    import SidebarElement from '../../components/sidebarElement/SidebarElement.svelte';
    import ConnectionPanel from '../../components/connectionPanel/ConnectionPanel.svelte';
    import InfoPanel from '../../components/infoPanel/InfoPanel.svelte';
    import { succesToast } from '../../util/custom-toasters.js';

    const socket = io($BASE_URL, {
        withCredentials: true
    });

    socket.on("newRequest", (data) => {
        succesToast("New request!");
        $requestList = [...$requestList, data.data];
    });

    socket.on("prevNotications", (data) => {
        const array = data.data
        $requestList = array;
    });

    async function handleReconnect() {
        socket.disconnect();
        $requestList = [];
        $activeRequest = null
        socket.connect();
        succesToast("Connected to " + $session.id)
    }
   
</script>

<div class="h-full">
    <ConnectionPanel handleReconnect={() => handleReconnect()}></ConnectionPanel>
    <div class="flex flex-row h-full">
        <Sidebar class="h-full border-r-2 border-slate-200">
            <SidebarWrapper class="rounded-none bg-white h-full">
                <div class="text-primary-600 font-bold">
                    Requests
                </div>
                <SidebarGroup>
                    {#each $requestList as request}
                        <SidebarElement request={request}></SidebarElement>
                    {/each}
                </SidebarGroup>
            </SidebarWrapper>
        </Sidebar>
        {#if $activeRequest}
            <RequestPanel request={$activeRequest}></RequestPanel>
            {:else}
            <InfoPanel/>
        {/if}
    </div>
</div>