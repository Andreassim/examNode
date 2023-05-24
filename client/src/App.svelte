<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
    import {Router, Link, Route} from "svelte-navigator";
    import Home from "./pages/home/Home.svelte";
    import Profile from "./pages/profile/Profile.svelte";
    import Footer from './components/shared/Footer.svelte';
    import { SvelteToast } from "@zerodevx/svelte-toast"

    import { user } from './store/globals.js';
    import Login from './pages/login/Login.svelte';
    import Signup from './pages/signup/Signup.svelte';

    console.log($user);

</script>

<main class="min-h-screen h-screen pt-0 my-0 mx-auto text-center flex flex-col items-stretch bg-white text-black">
    <SvelteToast options={{reversed:true, intro:{y:192}}}/>
    <Router>
        <Navbar class="w-screen border-b-2 border-blue-900 bg-blue-900">
            <NavBrand href="/">
                <img src="/icon.svg" alt="" class=" mr-3 h-6 sm:h-14">
                <span class="self-center whitespace-nowrap text-xl text-primary-500 font-bold">
                    Webhooker
                </span>
            </NavBrand>
            <NavUl>
                <NavLi>
                    <Link to="/" class="text-primary-500 font-semibold">Home</Link>
                </NavLi>
                {#if $user}
                <NavLi>
                    <Link to="/profile" class="text-primary-500 font-semibold">Profile</Link>
                </NavLi>
                <NavLi>
                    <Link to="/logout" class="text-primary-500 font-semibold">Logout</Link>
                </NavLi>
                {:else}
                <NavLi>
                    <Link to="/login" class="text-primary-500 font-semibold">Login</Link>
                </NavLi>
                <NavLi>
                    <Link to="/signup" class="text-primary-500 font-semibold">Signup</Link>
                </NavLi>
                {/if}
            </NavUl>
        </Navbar>
      
        <div class="mb-auto w-screen h-full">
            <Route path="/">
                <Home />
            </Route>
            <Route path="/profile">
                <Profile />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/signup">
                <Signup />
            </Route>
        </div>
    </Router>
    <Footer/>
</main>

<style>
  :root {
    --toastContainerTop: auto;
    --toastContainerRight: auto;
    --toastContainerBottom: 8rem;
    --toastContainerLeft: calc(90vw - 8rem);
  }
</style>
