<script>
    import { Sidebar, SidebarGroup, SidebarWrapper } from 'flowbite-svelte';
    import RequestPanel from '../../components/requestpanel/RequestPanel.svelte';
    import { activeRequest, requestList, session } from '../../store/sessionStore/sessionStore.js';
    import SidebarElement from '../../components/sidebarElement/SidebarElement.svelte';
    import ConnectionPanel from '../../components/connectionPanel/ConnectionPanel.svelte';
    import InfoPanel from '../../components/infoPanel/InfoPanel.svelte';

</script>

<div class="h-full">
    <ConnectionPanel />
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