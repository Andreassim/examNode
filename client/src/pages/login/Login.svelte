<script>
    import { Button, Card, Input, Label } from "flowbite-svelte";


    let email;
    let password;
    let cPassword;
    
</script>


<div class="bg-white h-full text-black">
    <div class="pt-5">
        <Card size="lg" class="text-left m-auto">
                <div class="mx-5">
                    <h1 class=" text-primary-600 font-bold">Login</h1>
                    <div class="my-2">
                        <Label for="email" class="mb-2">Email</Label>
                        <Input type="text" id="email" placeholder="arnold@schwarzenegger.movistar" bind:email/>
                    </div>
                    <div class="my-2">
                        <Label for="password" class="mb-2">Password</Label>
                        <Input type="password" id="password" placeholder="•••••••••" bind:password/>
                    </div>
                    <div class="my-2 text-right">
                        <Button color="primary">Login</Button>
                    </div>
                </div>
        </Card>
    </div>
</div>