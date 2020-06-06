<script>
    // your script goes here
    import MyInput from '../MyInput.svelte';
    import { createEventDispatcher } from 'svelte';

    let eventName = "";
    let eventDetail = "";
    let dispatch = createEventDispatcher();

    const handleEventAdd = () => {
        dispatch('handleAddItem', { eventName, eventDetail });
    };
</script>

<style>
    /* your styles go here */
</style>


<div class="todo-panel">
    <MyInput label="事件概述" bind:fVal={eventName} />
    <MyInput label="事件详情" bind:fVal={eventDetail} />
    <button on:click={handleEventAdd}>添加事件</button>
</div>