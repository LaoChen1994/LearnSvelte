# Svelte学习笔记

### 1. 项目开始

通过npx拉取项目模板然后开始svelte之旅吧~

~~~bash
npx degit sveltejs/template my-svelte-project
cd my-svelte-project
npm install
npm run dev
~~~

### 2. 什么是Svelte

以下两段话我觉得很重要，反应了svelte的思想，引用一段官方的话

> Svelte is a tool for building fast web applications.
>
> It is similar to JavaScript frameworks such as React and Vue, which share a goal of making it easy to build slick interactive user interfaces.
>
> 类似于React和Vue的JavaScript框架，用于快速的构建灵活的用户交互。
>
> But there's a crucial difference: Svelte converts your app into ideal JavaScript at *build time*, rather than interpreting your application code at *run time*. This means you don't pay the performance cost of the framework's abstractions, and you don't incur a penalty when your app first loads.
>
> Svelte和其他框架最大的不同点：**将app在build时就将其 转换为想要的JavaScript代码，而不是在运行时**，意味着你们不需要去关注框架在抽象意义上的性能，以至于在首次加载时不需要去关注性能问题。
>
> You can build your entire app with Svelte, or you can add it incrementally to an existing codebase. You can also ship components as standalone packages that work anywhere, without the overhead of a dependency on a conventional framework.

如何编写一个svelte组件：

> In Svelte, an application is composed from one or more *components*. A component is a reusable self-contained block of code that encapsulates HTML, CSS and JavaScript that belong together, written into a `.svelte` file. The 'hello world' example in the code editor is a simple component.
>
> 在Svelte组件中，每一个组件是由一个HTML，CSS和JavaScript块包裹而成的独立模块，并写入.svelte文件中

### 3. 第一个Svelte组件

+ 代码

~~~javascript
// main.js
import App from './App.svelte';

const app = new App({
	target: document.body,
});

export default app;
~~~

~~~svelte
// App.svelte
<script>
	let name = 'world';
</script>

<div>hello {name.toUpperCase()}</div>

<style>
	div {
		color: blue;
		font-size: 18px;
		line-height: 20px;
		font-weight: 500;
	}
</style>
~~~

+ 实现效果

![image-20200508004902928](./img/image-20200508004902928.png)

上面这个例子表明几点：

1. App组件通过import导入到页面中，通过target传递需要对应挂载到的节点上
2. 在.svelte中每个子组件中在script,style标签中分别编写js和css代码
3. 在模板html中可以通过单大括号{}来动态绑定数据，且在{}中可以执行js逻辑



### 4.  组件导入

和vue和react一样，在script标签中通过import来引入想要引入的.svelte组件

这里就简单看一个例子就好

~~~svelte
// Header.svelte
<script>
    let text = "This is Header";
</script>

<h1>{text}</h1>


<style>
    h1 {
        font-family: 'Courier New', Courier, monospace;
        color: red;
    }
</style>
~~~

利用import进行引入

~~~svelte
// App.svelte
<script>
	import Header from './Header.svelte';
	let name = 'world';
</script>

<Header />
<div>hello {name.toUpperCase()}</div>

<style>
	div {
		color: blue;
		font-size: 18px;
		line-height: 20px;
		font-weight: 500;
	}
</style>
~~~

+ 实现效果

![image-20200509002315264](./img/image-20200509002315264.png)

### 5. 插入html字符串

在react中，如果我们想动态的插入html字符串我们需要使用dangerouslySetInnerHTML={__html: "xxxxxxx"}来实现，在svelte中我们只需要通过**@html**这个语法糖来进行插入即可

这里需要注意的是：

**·通过@html插入的class不会被svelte哈希**，因此如果我们需要对插入的元素在style中进行样式的修改需要添加**:global**

~~~svelte
// App.svelte
<script>
	let name = 'world';
	let html = "<p class='htmlp'>这是一个p标签</p>"
</script>

<div>hello {name.toUpperCase()}</div>
<div>
	{@html html}
</div>

<style>
	div {
		color: blue;
		font-size: 18px;
		line-height: 20px;
		font-weight: 500;
	}
	div :global(.htmlp) {
		color: green;
	}
</style>
~~~



+ 效果和渲染元素的dom结构

![image-20200509003245272](./img/image-20200509003245272.png)

**关键点：**从上面的dom结构中可见由于在style中添加的css选择器都会被自动哈希化，因此，如果想对插入的html字符串的样式进行修改需要通过:global去哈希

### 6.  事件绑定

和vue有点类似通过在标签上添加on:eventName来绑定对应的回调函数事件，然后绑定在script标签定义的回调函数即可

~~~svelte
<script>
	// 事件响应
	let count = 0;

	function handleClick() {
		count++
    }
</script>

<!--事件响应---> 
<div>{count}</div>
<button on:click={handleClick}>点击我+1</button>
~~~

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020050900571531.gif#pic_center)

### 7. 声明(计算属性)

在官方文档中把$定义的变量叫做，声明(declaration)，但是我觉得用来说他是计算属性更好一些，类似vue，或者是class中的get方法，react中useMemo定义的变量，其原因是**我们通过$定义一个根据依赖值的变化而变化的动态参数**

1. 一个简单的两倍值的例子

~~~svelte
<script>
    let count = 0;

    $: doubleCount = count * 2

    function addCount() {
        count++
    }
</script>

<div>{count} * 2 = {doubleCount}</div>
<button on:click={addCount}>+1</button>
~~~

+ 实验效果

![](./img/declaration.gif)

这里的$ 在我的理解中完全可以作为count改变时的一个回调函数，可以类比于react中的useEffect + useMemo，为了验证猜想，我们来测试一下

2. 一个回调函数的例子

~~~svelte
<script>
    let count = 0;

    $: doubleCount = count * 2

    function addCount() {
        count++
    }

    let callbackForCount;
    
	// 为count添加回调 
    $: {
        console.log(`${count} is changed`)
    }

	// 为count添加callback
    $: {
        callbackForCount = () => {
            return `现在的count是${count}`
        }
    }

</script>

<div>{count} * 2 = {doubleCount}</div>
<button on:click={addCount}>+1</button>

<div>{ callbackForCount() }</div>

~~~

+ 实验效果

![](./img/declaration2.gif)

+ 文档是这么说的

> We're not limited to declaring reactive *values* — we can also run arbitrary *statements* reactively.
>
> 声明任何响应值的行为都是被允许的，我们可以运行任意响应的状态表达式

比如我们可以声明一个if

~~~svelte
$: if (count >= 10) {
	alert(`count is dangerously high!`);
	count = 9;
}
~~~

这些都是被允许的

### 8. 复杂类型的更新问题

> Because Svelte's reactivity is triggered by assignments, using array methods like `push` and `splice` won't automatically cause updates. For example, clicking the button doesn't do anything.
>
> Svelte 是通过赋值来发起数据响应的，因此对于array中的push和splice等方法来改变数组并不会被监听到，因此不会引起页面的重新渲染。

因此，如果当我们通过对引用类型采取非 = 号的方式进行改值，其并不会使页面重新渲染，例如下面一个例子

~~~svelte
<script>
  let friends = ["tom", "jack"];
  let score = {
    math: 100,
    chinese: 80
  };
  let people = {
    name: "jemmery",
    friends,
    score
  };
  let newFriend = "";

  $: numOfFriends = people.friends.length;

  function addFriends() {
    // 解决方法
    // people.friends = [...people.friends, newFriend]
    
    // 通过下面的两种方法并不会生效
    people.friends.push(newFriend);
    // friends.push(newFriend)
    console.log(people.friends)
    newFriend = "";
  }

  function handleInput(e) {
    newFriend = e.target.value;
  }

  const changeScore = () => {
      // 这种方法并不会导致输出的score变化，但是people.score确实发生了变化
      score.math = 30
      console.log(people.score)
      // 通过下面的方法可以使页面进行强制渲染
      // 解决方法
      // people.score = people.score
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
~~~

+ 效果

![](./img/updateProblem.gif)

我们通过这种方式进行修改参数发现并不会发生变化，其原因是只有**等号赋值 才会导致页面的刷新**

现在我们通过代码中标记为解决方法的代码来解决这个问题

+ 问题解决

![](./img/updateProblemSolve.gif)

+ 总结
  + 在svelte中，利用非=号的方式对引用类型进行修改会导致页面更新监听的失效，例如数组的splice和push方法
  + 解决办法通过*强行等号赋值*,实现页面的强制刷新
  + 第二种方法是通过...表达式对值进行赋值，也能解决这个问题

### 9. 定义组件参数

之前定义了无props的组件，如果想定义一个有props的组件，需要怎么操作呢？

**接受props的定义**：我们需要在组件内部通过**export let 的方式**来定义组件从外部接受的props

**默认值的设置**：直接对定义的props赋值，就会作为组件的默认值

**使用扩展运算符**：如果有多个props，可以通过声明一个props对象然后利用扩展运算符...来简写

+ 来看例子

~~~svelte
<!-- Input.svelte -->
<script>
    export let value;
    // 默认值
    export let label = "Label";
</script>

<style>
</style>


<div>
    <span>{label}</span>
    <input type="text" value={value} />
</div>
~~~

+ 引用方法

~~~svelte
<!-- Input Component -->
<Input label={'姓名'} value={name} />
~~~

+ 扩展运算符的例子

~~~svelte
<!---Card.svelte--->
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
~~~

导入方法：

~~~svelte
<script>
let cardInfo = {
    name: 'Peter',
    age: 18,
    hobbies: ['soccer', 'basketball', 'baseball']
}
</script>

<Card {...cardInfo} />
~~~

+ 实验效果

![image-20200512233723828](./img/image-20200512233723828.png)

### 10. 条件渲染

使用**{#if} {:else}{/if}**的方式实现条件渲染：

1. **{#if}{/if}**声明一个条件块

2. 其中的多个条件通过**{:else if}或者{:else}**进行生命和分割

看一个例子：

~~~svelte
<script>
    let score = -1

    function changeScore() {
        score = Math.random() * 100
    }

</script>
<div>
    <button on:click={changeScore}>下一次考试</button>  
    {#if score < 60}
        都不及格了还打游戏，回去学习
    {:else if  score >= 60 && score <= 80}
        <!-- else if content here -->
        还有提高空间，可以玩个5分钟
    {:else}
        <!-- else content here -->
        不用学了，可以打游戏去了
    {/if}
</div>

~~~

+ 效果

![](./img/updateProblemSolve.gif)

### 11.  列表循环渲染

使用**{#each items as item}{/each}**来实现列表循环渲染，这里的item可以通过解构赋值，拿到item里面的值，例如**{#each items as {name, age}} {/each}**

+ 一个简单的例子

~~~svelte
<script>
    let people = [
        {name: "Mike", age: 18, math: 90},
        {name: "Jack", age: 20, math: 100},
        {name: "Cathy", age: 19, math: 85}
    ];
</script>

<table>
<thead>
    <th>姓名</th>
    <th>年龄</th>
    <th>分数</th>
</thead>
<tbody>
{#each people as p}
     <!-- content here -->
     <tr>
        <td>{p.name}</td>
        <td>{p.age}</td>
        <td>{p.math}</td>
      </tr>
{/each}
</tbody>
</table>
~~~

+ 效果

  ![image-20200516114949394](./img/image-20200516114949394.png)

+ 需要注意的问题

由于svelte并非利用虚拟dom来判断元素的更新。在each block这种语法中，通过加载和删除最后一个元素来根据列表进行渲染。这样的问题就是，**如果我们对非最后一个元素节点进行增加删除操作，会导致原来节点中的常量并不会被改变，而导致显示异常的问题**。

+ 例子

1. 定义一个渲染单元EachBlockSon

~~~svelte
// EachBlockSon.svelte
<script>
    export let a;
    const {name, age} = a;
 
</script>

<div>姓名{name}: 年龄{age}</div>

~~~

2. 在父组件中进行列表渲染

我们的目标是**点击按钮后第一个同学的信息会被删除**

~~~svelte
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
<button on:click={deleteItem}>删除第一个元素</button>
{#each people as p}
    <!-- content here -->
    <EachSonBlock a={p} />
{/each}
~~~

+ 效果

![](./img/listrenderProblem.gif)

发现问题了吗，**每次都是从尾部删除的！！！！**,这样完全违背了我们的想法，为了解决这个问题，官方推荐将便利元素和渲染的元素进行绑定通过 **p(p.id类似的方法)**来实现渲染元素和数据的**强绑定**

+ 例子

~~~svelte
// 表示每次的列表循环渲染数据和p进行绑定
{#each people as p (p)}
    <!-- content here -->
    <EachSonBlock a={p} />
{/each}
~~~

我们只需要在as的元素后面通过()来绑定一个每个item中的一个元素即可

![](./img/listrenderfix.gif)

### 12. 异步渲染模块

我们通常会遇到这么一个问题：我们希望在**异步获取请求之后，再相应渲染页面**，svelte中提供了await-block来实现这个过程。当然也可以和vue和react一样，在调用接口后手动设置对应state的值，然后进行条件渲染。只不过svelte提供了这么一个方式，更为方便。

+ 代码例子

~~~svelte
<script>
    function getRandomNumber() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(Math.random()), 3000)
        })
    }
</script>

<div>
    {#await getRandomNumber()}
        <!-- promise is pending -->
        wait data,loading........
    {:then value}
        <!-- promise was fulfilled -->
        The random number is {value}
    {:catch error}
        <!-- promise was rejected -->
        there are some error
    {/await}
</div>
~~~

+ 实现效果

这里的实现效果就是，一开始显示loading的状态，3秒后会显示 生成的随机数



### 13. 表单元素的双向绑定

#### 1. input受控绑定

使用**bind**关键字进行绑定，svelte通过bind关键字来完成类似v-model的双向绑定

+ text

~~~svelte
<input type="text" bind:value={formData.name} />
~~~

+ checkbox

~~~svelte
<input type="checkbox" bind:checked={formData.checkboxVal} />
~~~

+ number

~~~svelte
<input type="number" bind:checked={formData.number} />
~~~

+ range

~~~svelte
<input type="range" bind:checked={formData.rangeVal} />
~~~

+ select

~~~svelte
<script>
  let questions = [
    { id: 1, text: 'question 1' },
    { id: 2, text: 'question 2' },
    {
      id: 3,
      text: 'question 3'
    }
  ];
  let selected = 1;
</svelte>

<select bind:value={selected} on:click={handleSelect}>
  {#each questions as q, i}
    <option value={q.id}>{q.text}</option>
  {/each}
</select>
~~~

+ textArea

~~~svelte
<textarea cols="30" rows="10" bind:value={textArea} />
~~~

#### 2. 使用group进行绑定

对于checkbox和radio组的选择和绑定，采用**bind:group**关键字进行组绑定

~~~svelte
<script>
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
      let hobbies = ["baseball", "basketball", "tennis", "soccer"];

      let radioGender;
      let selectHobby = [];
</script>

{#each gender as gen, i}
    <div class="inline">
    <input
        type="radio"
        bind:group={radioGender}
        value={gen.value}
        id={`radio-${i}`} 
    />
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
~~~

#### 3. 获得DOM元素

使用**bind:this**来绑定得到对应DOM元素对象，类似于react中的ref

经典例子： input外部控制聚焦

~~~svelte
<input type="text" bind:this={inputRef}>
<button on:click={() =>{inputRef.focus()}}>input聚焦</button>
~~~

#### 4. 自定义元素通过bind实现双向绑定

自定义一个带label的输入框，先

~~~svelte
<!---MyInput.svelte--->
<script>
    export let fVal, label;
</script>

<div>
    <span>{label}</span>
    <input type="text" bind:value={fVal}>
</div>
~~~

父组件，通过**bind:fVal**来实现父组件的变量和内部input的双向绑定

~~~svelte
<MyInput bind:fVal={myInputVal} label="自定义输入" />
~~~



### 14. 生命周期函数

svelte存在的声明周期包括

+ onMount
+ onDestory
+ beforeUpdate
+ afterUpdate
+ tick（暂时没有找到相关的例子）

#### 1. onMount

翻译自官网文档：onMount函数在组件都挂在在DOM上之后会触发，在组件初始化的过程中进行调用。如果onMount返回了一个函数， 则这个函数会在组件卸载的时候触发。类似react中的USeEffect，我是这么理解的。

**但是在实际测试过程中，当我的onMount返回一个函数，好像在组件卸载的时候并不会被执行**

一般对于一些列表组件，我们希望在列表初始化的时候，拉取数据，我们可以在onMount中写这个东西

~~~svelte
  import { onMount } from "svelte";
  
  onMount(async () => {
    console.log('Mounted')
    loading = true;
    const res = await fetch("http://localhost:3000/students");
    const data = await res.json()

    loading = true;
    students = data.data;

    return () => console.log("unMounted")
  });
~~~

#### 2. onDestory

翻译自官方文档: 在组件卸载时调用的回调。

应用场景，当我们页面加载的时候，我们可能开启一些定时任务，比如使用setInterval,如果当页面卸载时，不关闭该setInterval会产生内存泄漏的问题。因此，onDestory就是给了这么一个回调。

~~~svelte
import { onDestroy } from "svelte";

onDestroy(() => clearInterval(timer1));
~~~



#### 3.  beforeUpdate和afterUpdate

翻译自官方文档：beforeUpdate执行该回调函数在组件**状态改变**但组件更新之前，但第一次被调用的时候在onMounted之前;afterUpdate在组件被更新之后调用。

我的理解就是：此时**props和state**在beforeUpdate和afterUpdate其实都已经被更新，但是还没有渲染到dom上。因此，我们去拿对应的state，**应该都是更新过后的state了**。

因此我们来解决一个问题：**如果需要对prevState和curState**进行对比的操作。

~~~svelte
<script>
  import { beforeUpdate, afterUpdate } from "svelte";
  
  export let count;
  let lastCount;

  beforeUpdate(() => {
      console.log(`before update = ${count}, lastCount=${lastCount}`);
  })

  afterUpdate(() => (lastCount = count ,console.log(`after update = ${count}`)));
  
</script>
~~~

上述代码中，count是一个prop，其受外部控制，来模拟数据更新的场景。

我们可以通过一个已有变量lastCount，在afterUpdate的时候将其值进行更新，这样beforeUpdate中就可以获取原来的state，从而做出相应的操作了。



#### 4. tick

tick的作用类似于vue中的nextTick,都是等到下一次更新的时候进行后续的一些操作。不过区别是，svelte中的tick是一个**Promise**封装的异步函数。我们可以通过**await tick()**,使后续的代码“停下”，等到下一次页面更新的时候，再调用后续的操作。这里暂时没想到好的例子。如果有好的场景需要用到这个的话，可以评论一下，我去实现一下。来看一个官方的例子。

~~~svelte
<script>
	import { tick } from 'svelte';

	let text = `Select some text and hit the tab key to toggle uppercase`;

	async function handleKeydown(event) {
		if (event.key !== 'Tab') return;

		event.preventDefault();

		const { selectionStart, selectionEnd, value } = this;
		const selection = value.slice(selectionStart, selectionEnd);

		const replacement = /[a-z]/.test(selection)
			? selection.toUpperCase()
			: selection.toLowerCase();

		text = (
			value.slice(0, selectionStart) +
			replacement +
			value.slice(selectionEnd)
		);

		await tick();
		this.selectionStart = selectionStart;
		this.selectionEnd = selectionEnd;
	}
</script>

<style>
	textarea {
		width: 100%;
		height: 200px;
	}
</style>

<textarea value={text} on:keydown={handleKeydown}></textarea>

~~~

这个例子是因为，需要在tab操作之后还是让选中的单词处于被选中的状态。因此**在tick更新之后，将textArea的Selection设为对应单词的start和end，让其还是被选中的状态**



#### 5. 生命周期的整体代码

~~~svelte
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

~~~

~~~svelte
<!-- App.svelte -->
<script>
  import LifeCycle from "./LifeCycle.svelte";

  let isShow = false;
  let count = 0;

  let handleShow = () => (isShow = !isShow);
  
  function addCount() {
	  count++;
  }
</script>
<div>
  {#if isShow}
    <!-- content here -->
    <LifeCycle count={count} />
  {:else}
    <!-- else content here -->
    组件被卸载
  {/if}

  <button on:click={handleShow}>
	{#if isShow}
		 <!-- content here -->
		 卸载组件
	{:else}
		 <!-- else content here -->
		 添加组件
	{/if}
  </button>

  <button on:click={addCount}>+1</button>
</div>
~~~

+ 效果

![](./img/lifecycle.gif)

### 15. Store

Store主要功能是类似vuex、redux和mobx等工具，用于跨组件之间的状态共享。

#### 1. Store注册与更新

Store写法只需要写在一个js文件中，然后通过svelte/store中提供的**writable方法来向公共仓库中注册一个值**作为一个仓库元素，之后在组件内可以通过subscribe来监听仓库元素的变化（理解上来说本质上是一个发布订阅的模式），通过**set**和**update**来发布仓库内某一个值的变化。

+ Set：直接将仓库内的某个数指定为某个值
+ Update：接收一个仓库当前值的参数的回调函数，将执行结果作为要更新仓库参数的值



**来看一个例子**

~~~svelte
// Store.js
import { writable } from 'svelte/store'

const initalEvent = [{
    id: 1,
    name: "空白事件1",
    desc: "这是一个测试事件"
}];

const initHobbies = ["抽烟","喝酒","烫头"]

// 在仓库中写入两个需要被监听的值
export const eventList = writable(initalEvent)
export const hobbies = writable(initHobbies)

// Store.svelte
<script>
    // your script goes here
    import { eventList, hobbies } from './Store/Store.js';
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
    }
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


<MyInput label="事件名称" bind:fVal={newEvent} />
<MyInput label="事件细节" bind:fVal={newDesc} />
<button on:click={handleBtnClick}>添加新事件</button>
<button on:click={handleClear}>清空事件</button>

<div>
    <span>我们的爱好是 {$hobbies.join(",")}</span>
</div>
~~~

**几个要注意的点：**

1. 通过evemtList.subscribe来保持组件内部的参数和仓库中的参数保持一致
2. 利用update和set对仓库内的eventList变量进行更新

**存在的问题：**

如果当有多个共有变量需要被引入，我们莫非要写很多xxx.subscribe(value => xxx = value)很麻烦，因此**svelte使用了$+param**来**自动订阅**引入变量内部的参数值，如上面例子中的hobbies,我们通过**$hobbies，set，update来直接更新仓库内的参数值**



**实验结果**

![](./img/Store1.gif)



#### 2. Store的继承

使用derived方法，来继承一个仓库，并对这个仓库的值可以做出相应的操作，可以类比于vuex中的computed

~~~svelte
// Store.js
// 这里省略上面的代码

// 第一个参数是需要继承的对象
// 后面是一个回调函数，参数为继承仓库的内部的值
// 返回值为该变量对应仓库内存储的值
export const unSolvedEvents = derived(eventList, e => e.length)

~~~



#### 3. Store的双向绑定和封装

我们可以将一个Counter Store的功能进行封装

具体封装的例子如下

~~~svelte
// Store.js
function createCounter(initCount = 0) {
    const { subscribe, set, update } = writable(initCount)

    return {
        subscribe,
        increase: (num = 1) => update(c => c + num),
        decrease: (num = 1) => update(c => c - num),
        clear: () => set(0),
        set
    }
}

export const count = createCounter()
export const doubleCount = derived(count, c => c * 2)
~~~

~~~svelte
// Store.svelte
<div>
    {$count} * 2 = {$doubleCount}
    <input type="text" bind:value={$count}>
    <button on:click={() => count.increase(1)}>+1</button>
    <button on:click={() => count.decrease(1)}>-1</button>

</div>
~~~

**这里有几个点需要注意**

+ 如果要对**仓库的值**使用**双向绑定**，需要再导出的时候导出**set**方法，然后如果要使用$count来**自动订阅count**变量，我们需要在导出的时候导出subscribe！！
+ 双向绑定方法还是一样通过$count可以直接修改和得到count仓库内的值

**实验效果**

![](./img/Store2.gif)

