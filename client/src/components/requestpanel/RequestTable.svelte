<script>
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';

  export let title;
  export let rows;
</script>

<div class="w-full h-full">
    <Table divClass="table-fixed break-all" hoverable>
        <caption class="p-5 text-lg font-semibold text-left text-primary-900">{title}</caption>
        <TableBody>
            {#each Object.entries(rows) as [key, value], i}
                <TableBodyRow>
                    <TableBodyCell>{key}</TableBodyCell>
                    <TableBodyCell tdClass="">{value}</TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
</div>
