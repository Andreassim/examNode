<script>
    import { Card } from "flowbite-svelte";
    import SessionList from "../../components/sessionList/SessionList.svelte";
    import { onMount } from "svelte";
    import { BASE_URL } from "../../store/globals";
    import { userSessions } from "../../store/sessionStore/sessionStore";
    import { errorToast } from "../../util/custom-toasters";

    onMount(async () => {
        const response = await fetch(`http://${$BASE_URL}/api/sessions`, {
            credentials: "include"
        });

        const sessions = await response.json();
        if(!response.ok){
            errorToast(sessions.message);
        }

        $userSessions = sessions.data;

        console.log($userSessions);
    });

</script>

<div class="grid grid-cols-2 h-full bg-white">
    <div class="col-span-1 border-r-2">
        <SessionList sessions = {$userSessions}/>
    </div>
    <div class="col-span-1 mx-auto mt-5">
        <Card size="lg">
            <h1 class="text-primary-500">Welcome!</h1>
            <p>To the left can you see all sessions associated with your user</p>
        </Card>
    </div>
</div>