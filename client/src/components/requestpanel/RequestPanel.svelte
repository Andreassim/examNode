<script>
    import RawBlock from "./RawBlock.svelte";
    import RequestTable from "./RequestTable.svelte";

    export let request;

</script>

<div class="w-full grid grid-cols-2 bg-gray-100 px-4 text-xs">
    <div class="col-span-1 pr-1">
        <RequestTable title="Request details" rows={request.details}></RequestTable>
    </div>
    <div class="col-span-1 pl-1">
        <RequestTable title="Headers" rows={request.headers}></RequestTable>
    </div>
    {#if request.content}
        <div class="col-span-2">
            <RawBlock content={request.content}></RawBlock>
        </div>
    {/if}
</div>