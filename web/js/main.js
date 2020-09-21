import { myadd, mysub } from "./module/myfunc";
import $ from "jquery";
import "bootstrap";
import "@fortawesome/fontawesome-free/js/all";
import "../scss/style.scss";

const number = myadd(1, 4999);
console.log(number);
console.log(myadd(1, 2));
console.log(mysub(1, 2));
$(".mytext").animate({ opacity: 0.25 }, number, function () {
  $(this).text("completed");
});
