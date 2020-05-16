<script>
    let count = 0;

    $: doubleCount = count * 2

    function addCount() {
        count++
    }

    let callbackForCount;

    $: {
        console.log(`${count} is changed`)
    }

    $: {
        callbackForCount = () => {
            return `现在的count是${count}`
        }
    }

</script>

<div>{count} * 2 = {doubleCount}</div>
<button on:click={addCount}>+1</button>

<div>{ callbackForCount() }</div>

