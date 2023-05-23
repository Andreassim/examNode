<script>
    import { Button, Input, Label } from "flowbite-svelte";


    let email;
    let password;
    let cPassword;
    
</script>


<div class="bg-white h-full text-black">
    <div class="container m-auto pt-5">
        <div class="max-w-md m-auto border-2 border-slate-400 rounded-md text-left">
            <div class="mx-5">
                <h1 class=" text-primary-600 font-bold">Signup</h1>
                <div class="my-2">
                    <Label for="email" class="mb-2">Email</Label>
                    <Input type="text" id="email" placeholder="arnold@schwarzenegger.movistar" bind:email/>
                </div>
                <div class="my-2">
                    <Label for="password" class="mb-2">Password</Label>
                    <Input type="password" id="password" placeholder="•••••••••" bind:password/>
                </div>
                <div class="my-2">
                    <Label for="password" class="mb-2">Confirm password</Label>
                    <Input type="password" id="password" placeholder="•••••••••" bind:cPassword/>
                </div>
                <div class="my-2 text-right">
                    <Button color="primary">Sign Up</Button>
                </div>
            </div>
        </div>
    </div>
</div>