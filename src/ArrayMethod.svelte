<script>
  let friends = ["tom", "jack"];
  let score = {
    math: 100,
    chinese: 80
  };
  let people = {
    name: "jerry",
    friends,
    score
  };
  let newFriend = "";

  $: numOfFriends = people.friends.length;

  function addFriends() {
    people.friends = [...people.friends, newFriend]
    // people.friends.push(newFriend);
    // friends.push(newFriend)
    console.log(people.friends)
    newFriend = "";
  }

  function handleInput(e) {
    newFriend = e.target.value;
  }

  const changeScore = () => {
      score.math = 30
      console.log(people.score)
      people.score = people.score
  }
</script>

<style>

</style>

<div>
  {people.name} has {numOfFriends} friend{numOfFriends > 1 ? 's' : ''}: {people.friends.join(',')}
  <div>数学：{people.score.math}</div>
  <div>语文：{people.score.chinese}</div>
  <br />
  <input type="text" value={newFriend} on:input={handleInput} />
  <button on:click={addFriends}>增加朋友</button>
  <button on:click={changeScore}>改变分数</button>
</div>
