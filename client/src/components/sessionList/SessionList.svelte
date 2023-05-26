<script>
    import { Button } from "flowbite-svelte";
    import { session } from "../../store/sessionStore/sessionStore";
    import { useNavigate } from "svelte-navigator";

    export let sessions;

    const navigate = useNavigate();

    function handleNagigateToSession(sessionId){
        $session.id = sessionId;
        navigate(`/$/${$session.id}`);
    }

</script>

<div class="m-2 border rounded-lg text-left">
    <ul>
        {#each Object.values(sessions) as session, i}
        <li class="w-full p-2 border-b-2 {i % 2 == 0 ? "bg-gray-100" : ""}">
            <div class="flex items-stretch">
                <p class="flex-grow mt-2">
                    {session.id}
                </p>
                {#if session.is_private}
                    <div class="m-2 px-2 border-2 bg-gray-500 text-white rounded-lg">Private</div>
                {/if}
                <Button color="green" outline on:click={() => handleNagigateToSession(session.id)}>Connect</Button>
            </div>
        </li>
        {/each}
    </ul>
</div>