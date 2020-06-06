<script>
    // your script goes here
    import AddPanel from './AddTodoItem.svelte';
    import TodoItem from './TodoItem.svelte';
    let todoList = [];

    let handleAddItem = (event) => {
        const { detail } = event;
        todoList = [...todoList, {...detail, id: todoList.length + 1, isComplete: false}]
    };

    let handleDeletItem = (event) => {
        const id = event.detail;
        todoList.splice(id - 1, 1);
        todoList = todoList;
    }

    let handleItemStatus = (event) => {
        const id = event.detail - 1;
        todoList[id].isComplete = !todoList[id].isComplete;
        todoList = todoList;
    };


    $: {
        console.log(todoList)
    };


</script>

<style>
    /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->

<AddPanel on:handleAddItem={handleAddItem} />

{#each todoList as todoItem}
     <!-- content here -->
     <TodoItem todoInfo={todoItem} on:delItem={handleDeletItem} on:completeItem={handleItemStatus}/>
{/each}