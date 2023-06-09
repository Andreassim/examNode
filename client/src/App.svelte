<script>
    import { Navbar, NavBrand, NavLi, NavUl, Footer, FooterCopyright} from 'flowbite-svelte';
    import {Router, Link, Route} from "svelte-navigator";
    import Home from "./pages/home/Home.svelte";
    import Profile from "./pages/profile/Profile.svelte";
    import { SvelteToast } from "@zerodevx/svelte-toast"
    import { BASE_URL, user, PROTOCOL } from './store/globals.js';
    import Login from './pages/login/Login.svelte';
    import Signup from './pages/signup/Signup.svelte';
    import PrivateRoute from './components/privateRoute/PrivateRoute.svelte';
    import LogoutButton from './components/logoutButton/LogoutButton.svelte';
    import { session } from './store/sessionStore/sessionStore';
    import { onMount } from 'svelte';
    import NotFound from './pages/notFound/NotFound.svelte';

    onMount( async () => {
        const response = await fetch(`${$PROTOCOL+$BASE_URL}/api/verify`, {
            credentials:"include"
        });
        const loggedInUser = await response.json();
        if(loggedInUser.data){
            $user = loggedInUser.data;
        }
    });
    
</script>

<main class="min-h-screen h-screen pt-0 my-0 mx-auto text-center flex flex-col items-stretch bg-white bg-opacity-0 text-black">
    <SvelteToast options={{reversed:true, intro:{y:100}}}/>
    <Router>
        <Navbar color="none" class="w-screen border-b-2 border-blue-900 bg-blue-900">
            <NavBrand href="/">
                <img src="/icon.svg" alt="" class=" mr-3 h-6 sm:h-14">
                <span class="self-center whitespace-nowrap text-xl text-primary-500 font-bold">
                    Webhooker
                </span>
            </NavBrand>
            <NavUl>
                {#if !$session.id}
                    <NavLi>
                         <Link to="/" class="text-primary-500 font-semibold flex items-center">Home</Link>
                     </NavLi>
                {:else}
                    <NavLi>
                        <Link to="/$/{$session.id}" class="text-primary-500 font-semibold flex items-center">Home</Link>
                    </NavLi>
                {/if}
                {#if $user}
                <NavLi>
                    <Link to="profile" class="text-primary-500 font-semibold">Profile</Link>
                </NavLi>
                <NavLi>
                    <LogoutButton/>
                </NavLi>
                {:else}
                <NavLi>
                    <Link to="login" class="text-primary-500 font-semibold">Login</Link>
                </NavLi>
                <NavLi>
                    <Link to="signup" class="text-primary-500 font-semibold">Signup</Link>
                </NavLi>
                {/if}
            </NavUl>
        </Navbar>
      
        <div class="w-screen h-[calc(100%-146px)] overflow-auto bg-white">
            <Route path="$/:sessionID" let:params>
                <Home/>
            </Route>
            <PrivateRoute path="profile" condition={$user} redirectLocation="/login">
                <Profile />
            </PrivateRoute>
            <PrivateRoute path="login" condition={!$user} redirectLocation="/profile">
                <Login />
            </PrivateRoute>
            <PrivateRoute path="signup" condition={!$user} redirectLocation="/profile">
                <Signup />
            </PrivateRoute>
            <Route path={`/`}>
                <Home/>
            </Route>
            <Route component={NotFound}/>
        </div>
    </Router>
    <Footer footerType="custom" customClass="p-4 bg-blue-900 sm:flex sm:items-center sm:justify-between p-6">
        <FooterCopyright class="text-white" href="/" by="Webhooker" year={2023}/>
    </Footer>
</main>

<style>
  :root {
    --toastContainerTop: auto;
    --toastContainerRight: auto;
    --toastContainerBottom: 8rem;
    --toastContainerLeft: calc(90vw - 8rem);
  }
</style>
