<script>
	import Header from './Header.svelte';
	import Counter from './Counter.svelte';
	import Declaration from './Declaratgions.svelte';
	import ArrayMethod from './ArrayMethod.svelte';
	import Input from './Input.svelte';
	import Card from './Card.svelte';
	import Condition from './Condition.svelte';
	import EachBlock from './Each.svelte';
	import AwaitBlock from './AwaitBlock.svelte';
	import EventFather from './EventFather.svelte';
	import FormBind from './FormBind.svelte';

	let name = 'world';
	let html = "<p class='htmlp'>这是一个p标签</p>";

	let cardInfo = {
		name: 'Peter',
		age: 18,
		hobbies: ['soccer', 'basketball', 'baseball']
	}

	function changeName(value) {
		name = value;
	}

	function innerEvent(param) {
		console.log(param)
	}
</script>

<!---模块导入--->
<Header />

---------------------

<!---参数绑定--->
<div>hello {name.toUpperCase()}</div>
------------------------

<!--- html字符串引用 --->
<div>
	{@html html}
</div>
----------------------------

<!-- 事件绑定 -->
<Counter />

----------------------------

<!-- 声明函数 -->
<Declaration />

---------------------------

<ArrayMethod />

---------------------------
<!-- Input Component -->
<Input label={'姓名'} value={name} />

--------------------------
<!-- 使用 -->
<Card {...cardInfo} />

-------------------------
<!-- 条件渲染 -->
<Condition />
--------------------------
<!-- 列表渲染 -->
<EachBlock />
--------------------------
<!-- 异步渲染方式 -->
<AwaitBlock />

--------------------------
<!-- 跨组件传参 -->
<EventFather a={name} on:sonEvent={innerEvent} />
-------------------------
<!-- 表单元素绑定 -->
<FormBind />

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