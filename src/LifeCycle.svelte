<!-- LifeCycle.svelte -->
<script>
  import { onMount, onDestroy, beforeUpdate, afterUpdate } from "svelte";
  
  export let count;
  let students = [];
  let loading = false;
  let lastCount;

  onMount(async () => {
    console.log('Mounted')
    loading = true;
    const res = await fetch("http://localhost:3000/students");
    const data = await res.json()

    loading = true;
    students = data.data;

    return () => console.log("unMounted")
  });

  onDestroy(() => console.log("is Destory"));
  

  beforeUpdate(() => {
      console.log(`before update = ${count}, lastCount=${lastCount}`);
  })

  afterUpdate(() => (lastCount = count ,console.log(`after update = ${count}`)));


</script>

<style>
  .students {
    padding: 20px;
    border: 1px solid #333;
    border-radius: 8px;
  }
</style>

<div class="students">

  {count}

  {#if !loading}
    <!-- content here -->
    正在加载学生信息
  {:else}
    <!-- else content here -->
    {#if !students.length}
      <!-- content here -->
      没有学生信息了TAT
    {:else}
      <!-- else content here -->
      <table>
        <thead>
          <th>姓名</th>
          <th>年龄</th>
        </thead>
      </table>

      <tbody>

        {#each students as stu}
          <!-- content here -->
          <tr>
            <td>{stu.name}</td>
            <td>{stu.age}</td>
          </tr>
        {/each}

      </tbody>
    {/if}
  {/if}

</div>
