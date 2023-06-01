<script>
    import RawBlock from "./RawBlock.svelte";
    import RequestTable from "./RequestTable.svelte";

    export let request;

</script>

<div class="w-full grid md:grid-cols-2 text-xs overflow-auto rounded-md mr-4">
    <div class="col-span-1 pr-1">
        <RequestTable title="Request details" rows={request.details}></RequestTable>
    </div>
    <div class="col-span-1 pl-1">
        <RequestTable title="Headers" rows={request.headers}></RequestTable>
    </div>
    <div class="col-span-1 pl-1">
        <RequestTable title="Query" rows={request.query}></RequestTable>
    </div>
    <div class="col-span-1 pl-1">
        <RequestTable title="Params" rows={request.params}></RequestTable>
    </div>
    {#if Object.keys(request.body).length > 0}
        <div class="col-span-2">
            <RawBlock content={request.body}></RawBlock>
        </div>
    {/if}
</div>