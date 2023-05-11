<script>
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
    import RequestPanel from '../../components/requestpanel/RequestPanel.svelte';

    const request = {
        headers: {
            something: "test",
            something2: "test",
        },
        details:{
            id: "12345",
            id2: "12345"
        },
        content:
            `{
                "test":"test"
                "test":"test"
                "test":"test"
                "test":"test"
                "test":"test"
            }`
    }

    const request2 = {
        headers: {
            something: "test",
            something2: "test",
        },
        details:{
            id: "51325",
            id2: "154123"
        },
        content:
            `{
                "test":"test"
                "test":"test"
                "test":"test"
                "test":"test"
                "test":"test"
            }`
    }

    let active = 0;

    let requests = [request, request2];
    
</script>

<div class="h-full">
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
            <RequestPanel request={requests[active]}></RequestPanel>
        {/if}
    </div>
</div>