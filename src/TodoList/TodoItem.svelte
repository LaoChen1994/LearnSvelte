<script>
    // your script goes here
    export let todoInfo;
    import { createEventDispatcher } from 'svelte';
    const dispath = createEventDispatcher();

    const handleItemDelete = () => {
        dispath("delItem", todoInfo.id)
    };

    const handleItemComplete = () => {
        dispath("completeItem", todoInfo.id);
    };

</script>

<style>
    /* your styles go here */
    .todo-box {
        display: flex;
        align-items: center;
        font-size: 14px;
        line-height: 16px;
    }

    .over {
        color: gray;
    }

    .new {
        color: blue;
    }

    .todo-box > div {
        padding: 20px
    }

</style>


<div class="todo-box {todoInfo.isComplete ? 'over' : 'new'}">
    <div>{todoInfo.id}</div>
    <div>{todoInfo.eventName}</div>
    <div>{todoInfo.eventDetail}</div>
    <div class="todo-controll">
        <button on:click={handleItemDelete}>删除</button>
        <button on:click={handleItemComplete}>{todoInfo.isComplete ? "转入代办" : "完成"}</button>
    </div>
</div>