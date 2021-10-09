
import { writable } from "svelte/store";

let storedTheme = 0;
storedTheme = 0;
/*if (localStorage) {
    storedTheme = parseInt(localStorage.getItem("theme") ?? '0');
}*/
export const theme = writable(storedTheme);
/*theme.subscribe(value => {
    localStorage.setItem("theme", value.toString());
});*/
