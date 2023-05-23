<script>
    import { Card } from "flowbite-svelte";
import { sessionId } from "../../store/SessionStore/sessionStore";
    import { BASE_URL } from "../../store/globals";

</script>

<div class="text-left my-5 m-auto">
    <Card size="xl" class="mb-2">
        <div>
            <h1 class="text-primary-500 font-bold">Webhooker</h1>
            <p>The general idea is to make a webapp that allows us to inspect incoming requests</p>
            <p>It works by providing a user with an endpoint they can send requests to it will be available at</p>
        </div>
        <div>
            {#if $sessionId}
            <p>Send requests to:</p>
            <div class="bg-gray-200 rounded-md text-black">
                <p class="mr-2">http://{$BASE_URL}/{$sessionId}</p>
            </div>
            {:else}
            <div class="bg-gray-200 rounded-md"> 
                <p>Press "NEW" to get a url to send requests to</p>
            </div>
            {/if}
        </div>
        <div class="my-2">
            <p>When requests have been recieved they will be displayed in the request list to the left.</p>
        </div>
    </Card>
    <Card size="xl" class="mb-2">
        <div>
            <h2 class="text-2xl font-bold text-primary-500">Reconnect</h2>
            <p>By default the session is public, meaning if anybody has the session token they can connect.</p>
            <p>The idea is that you can share it with a friend for them to inspect the request aswell.</p>
            <p>To reconnect type in the session id and press "CONNECT"</p>
            <p>This will connect to the session and fetch all the send requests</p>
        </div>
    </Card>
    <Card size="xl" class="mb-2">
        <div>
            <h2 class="text-2xl font-bold text-primary-500">Private sessions</h2>
            <p>To make the session private you can login and create a session that is only available to your user.</p>
        </div>
    </Card>
        
</div>
