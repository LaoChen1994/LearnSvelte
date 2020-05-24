<script>
    export let a;
    import { createEventDispatcher } from 'svelte';
    const dispath = createEventDispatcher();

    function emitEvent() {
        dispath(
            "sonEvent",
            {
                message: "innerInfo"
            }

        )
    }

</script>


<div>
    Param = {a};

    <button on:click={emitEvent}>触发自定义事件</button>
</div>