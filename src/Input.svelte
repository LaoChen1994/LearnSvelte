<!-- Input.svelte -->
<script>
    export let value;
    export let label;
</script>

<style>
</style>


<div>
    <span>{label}</span>
    <input type="text" value={value} />
</div>