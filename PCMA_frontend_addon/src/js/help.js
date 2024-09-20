/*
 * @Author: Jia Min Wu
 * @Date: 2024-6-20 13:22:44
 * @LastEditors: Jia Min Wu
 * @LastEditTime: 2024-07-19 23:49:15
 * @Description:
 * @Email: 2022221245@email.szu.edu.cn
 * @Company: SZU
 * @Version: 1.0
 */
require("../scss/help.scss");
document.getElementById("main").querySelector("h1#loadingpage").remove();

let homepage_content = document.querySelector("[data_store]#help_page");
document.getElementById("main").innerHTML = homepage_content.innerHTML;
homepage_content.innerHTML = "";