<script>
    import EventSon from './EventSon.svelte';
    export let a;

    
</script>

<!-- 利用这种方法 让子组件的事件向父组件冒泡 -->
<EventSon a={a} on:sonEvent />
