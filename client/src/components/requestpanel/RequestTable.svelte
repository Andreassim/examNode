<script>
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';

  export let title;
  export let rows;
</script>

<div class="w-full h-full">
    <Table>
        <caption class="p-5 text-lg font-semibold text-left text-primary-900">{title}</caption>
        <TableBody>
            {#each Object.entries(rows) as [key, value]}
                <TableBodyRow>
                    <TableBodyCell>{key}</TableBodyCell>
                    <TableBodyCell class="">{value}</TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
</div>
