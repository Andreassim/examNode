<script>
    export let request;

    //click change activeRequest

</script>

<div class="text-black py-2 w-full text-left hover:cursor-pointer hover:bg-blue-200 rounded-lg">
    <span class= "{request.method} rounded-lg text-white p-1 font-bold ml-1">
        {request.method}  
    </span>
    {`${request.id.slice(0,5)}`}
</div>


<style>

.GET {
    background-color: green;
}

.POST {
    background-color: blue;
}

.UPDATE {
    background-color: purple;
}

.DELETE {
    background-color: red;
}

</style>