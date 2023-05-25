<script>
    import { useNavigate } from "svelte-navigator";
    import { BASE_URL, user } from "../../store/globals.js";
    import { session } from "../../store/sessionStore/sessionStore.js";
    import { errorToast, succesToast } from "../../util/custom-toasters.js";

    const navigate = useNavigate();
    async function handleLogout(){
        const response = await fetch(`http://${$BASE_URL}/logout`, {
            credentials: "include"
        });
        if(!response.ok){
            return errorToast("something went wrong");
        }
        $user = "";
        $session = {id:"", private: false};
        succesToast("Logged out");
        navigate("/login");
    }
</script>

<button class="bg-primary-500 hover:cursor-pointer hover:bg-primary-600 hover:text-white rounded-md" on:click={() => handleLogout()} on:keydown={() => handleLogout()}>Logout</button>

<style>
    button {
        padding: 0 1rem;
    }
</style>