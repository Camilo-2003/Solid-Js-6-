import { createSignal, createEffect, createMemo } from "solid";

const [count, setCount] = createSignal(0);
const doubleCount = () => count() * 2;
const isDivisibleByThree = createMemo(() => count() % 3 === 0);

createEffect(() => {
    console.log("Count", count());
    document.querySelector("#count").textContent = count();
});

createEffect(() => {
    console.log("Double", doubleCount());
    document.querySelector("#double").textContent = doubleCount();
});

createEffect(() => {
    console.log("isDivisibleByThree", isDivisibleByThree());
    document.querySelector("#divisibleByThree").textContent = isDivisibleByThree();
});

document.querySelector("button").addEventListener("click", () => setCount((c) => c + 1));












