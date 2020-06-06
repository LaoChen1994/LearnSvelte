<script>
    // your script goes here
    import { eventList, hobbies, unSolvedEvents, count, doubleCount } from './Store/Store.js';
    import MyInput from './MyInput.svelte'

    let list = [];
    let newEvent = "";
    let newDesc = "";


    eventList.subscribe(value => {
        list = value;
    });

    const handleBtnClick = () => {
        eventList.update(value => {
            return [...value, {
                id: value.length + 1,
                name: newEvent,
                desc: newDesc
            }]
        })
        newEvent = newDesc =  "";
    };


    const handleClear = () =>{
        eventList.set([])
    };
</script>

<table>
    <thead>
        <th>事件编号</th>
        <th>事件名称</th>
        <th>事件详情</th>
    </thead>
    <tbody>
    {#each list as item}
         <!-- content here -->
         <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.desc}</td>
         </tr>
    {/each}
    </tbody>
</table>

<div>
    目前待完成事件数目为{$unSolvedEvents}
</div>


<MyInput label="事件名称" bind:fVal={newEvent} />
<MyInput label="事件细节" bind:fVal={newDesc} />
<button on:click={handleBtnClick}>添加新事件</button>
<button on:click={handleClear}>清空事件</button>


<div>
    <span>我们的爱好是 {$hobbies.join(",")}</span>
</div>

<div>
    {$count} * 2 = {$doubleCount}
    <input type="text" bind:value={$count}>
    <button on:click={() => count.increase(1)}>+1</button>
    <button on:click={() => count.decrease(1)}>-1</button>

</div>