import { myadd } from "./module/myfunc";
import $ from "jquery";
import Chart from "chart.js";
const ctx = document.getElementById("stat").getContext("2d");
new Chart(ctx, {});
console.log(myadd(10, 20));
console.log(456);
$(".blah").text("completed");
