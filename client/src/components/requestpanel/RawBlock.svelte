<script>
    export let content;
</script>

<div class="p-5 text-gray-800 text-left">
    <p class="text-xl font-semibold text-primary-500">
        Raw content
    </p>
    <div class="bg-slate-300 rounded-lg">
        <pre class="pl-12">
            {`\n`}{content}
        </pre>
    </div>
</div>