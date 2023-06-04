<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    import { user } from "../../store/globals.js";

    const navigate = useNavigate();
    const location = useLocation();

    export let condition;
    export let redirectLocation;

    $: if (!condition) {
        navigate(redirectLocation, {
            state: { from: $location.pathname },
            replace: true,
        });
    }
</script>

{#if condition}
    <slot />
{/if}
