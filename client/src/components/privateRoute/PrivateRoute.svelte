<script>
    import { Route } from "svelte-navigator";
    import PrivateRouteGuard from "./PrivateRouteGuard.svelte";
  
    export let path;
    export let condition;
    export let redirectLocation;
</script>
  
<Route {path} let:params let:location let:navigate>
    <PrivateRouteGuard {condition} {redirectLocation}>
        <slot {params} {location} {navigate} />
    </PrivateRouteGuard>
</Route>