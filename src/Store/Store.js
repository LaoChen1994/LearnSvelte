import { writable, derived } from 'svelte/store'

const initalEvent = [{
    id: 1,
    name: "空白事件1",
    desc: "这是一个测试事件"
}];

const initHobbies = ["抽烟","喝酒","烫头"]

export const eventList = writable(initalEvent)
export const hobbies = writable(initHobbies)

export const unSolvedEvents = derived(eventList, e => e.length)

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

