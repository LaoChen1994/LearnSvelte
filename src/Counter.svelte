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