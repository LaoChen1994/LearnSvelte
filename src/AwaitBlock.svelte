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
