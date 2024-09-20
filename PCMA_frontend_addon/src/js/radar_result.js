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
// Init the DOM.
require("../scss/radarplot.scss");
require("../scss/radar_result.scss");

import * as radar from "./radarplot";

document.getElementById("main").querySelector("h1#loadingpage").remove();
let chart_dom = document.createElement("div");
chart_dom.setAttribute("id", "T10_RADAR");
chart_dom.setAttribute("class", "radar-chart-container");
document.getElementById("main").appendChild(chart_dom);

chart_dom = document.createElement("div");
chart_dom.setAttribute("id", "T11_RADAR");
chart_dom.setAttribute("class", "radar-chart-container");
document.getElementById("main").appendChild(chart_dom);

chart_dom = document.createElement("div");
chart_dom.setAttribute("id", "T20_RADAR");
chart_dom.setAttribute("class", "radar-chart-container");
document.getElementById("main").appendChild(chart_dom);

chart_dom = document.createElement("div");
chart_dom.setAttribute("id", "T21_RADAR");
chart_dom.setAttribute("class", "radar-chart-container");
document.getElementById("main").appendChild(chart_dom);

chart_dom = document.createElement("div");
chart_dom.setAttribute("id", "T30_RADAR");
chart_dom.setAttribute("class", "radar-chart-container");
document.getElementById("main").appendChild(chart_dom);

chart_dom = document.createElement("div");
chart_dom.setAttribute("id", "T31_RADAR");
chart_dom.setAttribute("class", "radar-chart-container");
document.getElementById("main").appendChild(chart_dom);

chart_dom = document.createElement("div");
chart_dom.setAttribute("id", "T40_RADAR");
chart_dom.setAttribute("class", "radar-chart-container");
document.getElementById("main").appendChild(chart_dom);

chart_dom = document.createElement("div");
chart_dom.setAttribute("id", "T41_RADAR");
chart_dom.setAttribute("class", "radar-chart-container");
document.getElementById("main").appendChild(chart_dom);

chart_dom = document.createElement("div");
chart_dom.setAttribute("id", "T60_RADAR");
chart_dom.setAttribute("class", "radar-chart-container");
document.getElementById("main").appendChild(chart_dom);

chart_dom = document.createElement("div");
chart_dom.setAttribute("id", "T61_RADAR");
chart_dom.setAttribute("class", "radar-chart-container");
document.getElementById("main").appendChild(chart_dom);

let box_width = undefined;
let base_width = 500;
let base_svg_width = 360;
function buildPlot() {
  if (document.getElementById("main").clientWidth < base_width) {
    box_width = document.getElementById("main").clientWidth;
  } else if (document.getElementById("main").clientWidth > base_width) {
    box_width = Math.floor(
      document.getElementById("main").clientWidth /
      Math.floor(document.getElementById("main").clientWidth / base_width)
    );
  }

  // T1
  let r = radar.showRadaronHtml(
    radar.prepare_data(radar.read_csv_from_url("assets/data/T1_CV_o.json")),
    "T1SEppX_CV",
    "#T10_RADAR",
    box_width,
    base_svg_width
  );

  r = radar.showRadaronHtml(
    radar.prepare_data(radar.read_csv_from_url("assets/data/T1_TT_o.json")),
    "T1SEppX_TT",
    "#T11_RADAR",
    box_width,
    base_svg_width
  );

  // T2
  r = radar.showRadaronHtml(
    radar.prepare_data(radar.read_csv_from_url("assets/data/T2_CV_o.json")),
    "T2SEppX_CV",
    "#T20_RADAR",
    box_width,
    base_svg_width
  );

  r = radar.showRadaronHtml(
    radar.prepare_data(radar.read_csv_from_url("assets/data/T2_TT_o.json")),
    "T2SEppX_TT",
    "#T21_RADAR",
    box_width,
    base_svg_width
  );

  // T3
  r = radar.showRadaronHtml(
    radar.prepare_data(radar.read_csv_from_url("assets/data/T3_CV_o.json")),
    "T3SEppX_CV",
    "#T30_RADAR",
    box_width,
    base_svg_width
  );

  r = radar.showRadaronHtml(
    radar.prepare_data(radar.read_csv_from_url("assets/data/T3_TT_o.json")),
    "T3SEppX_TT",
    "#T31_RADAR",
    box_width,
    base_svg_width
  );

  // T4

  r = radar.showRadaronHtml(
    radar.prepare_data(radar.read_csv_from_url("assets/data/T4_CV_o.json")),
    "T4SEppX_CV",
    "#T40_RADAR",
    box_width,
    base_svg_width
  );

  r = radar.showRadaronHtml(
    radar.prepare_data(radar.read_csv_from_url("assets/data/T4_TT_o.json")),
    "T4SEppX_TT",
    "#T41_RADAR",
    box_width,
    base_svg_width
  );

  // T6
  r = radar.showRadaronHtml(
    radar.prepare_data(radar.read_csv_from_url("assets/data/T6_CV_o.json")),
    "T6SEppX_CV",
    "#T60_RADAR",
    box_width,
    base_svg_width
  );

  r = radar.showRadaronHtml(
    radar.prepare_data(radar.read_csv_from_url("assets/data/T6_TT_o.json")),
    "T6SEppX_TT",
    "#T61_RADAR",
    box_width,
    base_svg_width
  );
}
buildPlot();
window.addEventListener("resize", (e) => buildPlot());
