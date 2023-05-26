<script>
    import { Card } from "flowbite-svelte";
    import SessionList from "../../components/sessionList/SessionList.svelte";

    const sessions = {
        0: { id: 1234},
        1: { id: 2234},
        2: { id: 3234},
        3: { id: 4234, private: true},
        4: { id: 5234},
    };

</script>

<div class="grid grid-cols-2 h-full bg-white">
    <div class="col-span-1 border-r-2">
        <SessionList sessions = {sessions}/>
    </div>
    <div class="col-span-1 mx-auto mt-5">
        <Card size="lg">
            <h1 class="text-primary-500">Welcome!</h1>
            <p>To the left can you see all sessions associated with your user</p>
        </Card>
    </div>
</div>