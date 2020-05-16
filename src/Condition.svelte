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
