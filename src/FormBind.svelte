<script>
  import MyInput from './MyInput.svelte';

  let formData = {
    name: "",
    age: "",
    checkbox: false
  };

  let gender = [
    {
      label: "男",
      value: true
    },
    {
      label: "女",
      value: false
    }
  ];

  let questions = [
    { id: 1, text: `Where did you go to school?` },
    { id: 2, text: `What is your mother's name?` },
    {
      id: 3,
      text: `What is another personal fact that an attacker could easily find with Google?`
    }
  ];

  let radioGender = true;
  let textArea = "";

  let selected;
  let hobbies = ["baseball", "basketball", "tennis", "soccer"];
  let multiSelect = [];
  let selectHobby = [];

  let myInputVal = ""

  const handleSelect = event => {
    selected = event.target.value;
  };

  const selectInfo = hobbies.reduce((p, c) => {
    return [
      ...p,
      {
        text: c,
        isDone: false
      }
    ];
  }, []);

  let size = 20;
  let maxSize = 50;

  $: fontSize = (maxSize / 100) * size;
  $: console.log(fontSize);

  $: selectedElem = selectInfo.filter(item => item.isDone);

  let thisElement;
  let inputRef;

  $: totalData = {
    ...formData,
    radioGender,
    textArea,
    selected,
    multiSelect,
    selectedElem,
    size,
    selectHobby,
    myInputVal
  };
</script>

<style>
  .inline {
    display: flex;
  }

  .selected > input[type="text"] {
    color: gray;
    opacity: 0.4;
  }
</style>

<form>
  姓名:
  <input type="text" bind:value={formData.name} />
  年龄:
  <input type="text" bind:value={formData.age} />
  <input type="checkbox" bind:checked={formData.checkbox} />
  已婚？
  <input type="radio" bind:value={formData.radioVal} />
  <div>
    <span>性别:</span>
    {#each gender as gen, i}
      <div class="inline">
        <input
          type="radio"
          bind:group={radioGender}
          value={gen.value}
          id={`radio-${i}`} />
        <label for={`radio-${i}`}>{gen.label}</label>
      </div>
    {/each}

    {#each hobbies as hobby, i}
      <input
        type="checkbox"
        bind:group={selectHobby}
        value={hobby}
        id={`checkbox-${i}`} />
      <label for={`checkbox-${i}`}>{hobby}</label>
    {/each}

    <select bind:value={selected} on:click={handleSelect}>
      {#each questions as q, i}
        <option value={q.id}>{q.text}</option>
      {/each}
    </select>
    <div>
      <select bind:value={multiSelect} multiple>
        {#each hobbies as hobby}
          <option value={hobby}>{hobby}</option>
        {/each}
      </select>
    </div>

    <div>
      最喜欢的运动
      {#each selectInfo as info, i}
        <div class:selected={info.isDone}>
          <input type="checkbox" bind:checked={info.isDone} />
          <input type="text" bind:value={info.text} disabled={info.isDone} />
        </div>
      {/each}
    </div>

    <div>
      <textarea cols="30" rows="10" bind:value={textArea} />
    </div>
  </div>
</form>

<div>
  <input type="range" bind:value={size} />
  <div style="font-size:{fontSize}px;color:red;">字体大小</div>
</div>

<div>
  this
  <div class="this" bind:this={thisElement}>123123</div>
</div>

<button
  on:click={() => {
    console.log(totalData);
    console.log(thisElement);
  }}>
  get Data
</button>

<input type="text" bind:this={inputRef}>

<button on:click={() =>{inputRef.focus()}}>input聚焦</button>

<MyInput bind:fVal={myInputVal} label="自定义输入" />

你的自我简介：
{@html textArea}
