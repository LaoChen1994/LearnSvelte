<script>
  import EachSonBlock from "./EachSonBlock.svelte";

  let people = [
    { name: "Mike", age: 18, math: 90, i: 0 },
    { name: "Jack", age: 20, math: 100, i: 1 },
    { name: "Cathy", age: 19, math: 85, i: 2 },
    { name: "Serial", age: 20, math: 83, i: 3 }
  ];
  function deleteItem() {
    people = people.slice(1);
  }
</script>

<table>
  <thead>
    <th>姓名</th>
    <th>年龄</th>
    <th>分数</th>
  </thead>
  <tbody>
    {#each people as p, i}
      <tr>
        <td>{p.name}</td>
        <td>{p.age}</td>
        <td>{p.math}</td>
      </tr>
    {/each}

    <button on:click={deleteItem}>删除第一个元素</button>

    {#each people as p (p)}
      <!-- content here -->
      <EachSonBlock a={p} />
    {/each}
  </tbody>
</table>
