<script>
  // your script goes here
  export let name = "user name";
  export let age = 0;
  export let hobbies = [];
</script>

<style>
  /* your styles go here */
  .card {
    border: 1px solid #333;
    border-radius: 8px;
    padding: 20px;
    display: inline-block;
  }
</style>

<div>

  <div class="card">
    <div class="item">
      <span>姓名:</span>
      <span>{name}</span>
    </div>
    <div class="item">
      <span>年龄:</span>
      <span>{age}</span>
    </div>
    <div class="item">
      <span>爱好</span>
      <span>{hobbies.join(',')}</span>
    </div>
  </div>
</div>
