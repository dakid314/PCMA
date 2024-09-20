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

import d3 from "d3";

require("../assets/css/radar-chart.css");

import * as radarchartd3 from "../assets/js/radar-chart";

let shuffled_color = [
  "#23171b",
  "#271a28",
  "#2b1c33",
  "#2f1e3f",
  "#32204a",
  "#362354",
  "#39255f",
  "#3b2768",
  "#3e2a72",
  "#402c7b",
  "#422f83",
  "#44318b",
  "#453493",
  "#46369b",
  "#4839a2",
  "#493ca8",
  "#493eaf",
  "#4a41b5",
  "#4a44bb",
  "#4b46c0",
  "#4b49c5",
  "#4b4cca",
  "#4b4ecf",
  "#4b51d3",
  "#4a54d7",
  "#4a56db",
  "#4959de",
  "#495ce2",
  "#485fe5",
  "#4761e7",
  "#4664ea",
  "#4567ec",
  "#446aee",
  "#446df0",
  "#426ff2",
  "#4172f3",
  "#4075f5",
  "#3f78f6",
  "#3e7af7",
  "#3d7df7",
  "#3c80f8",
  "#3a83f9",
  "#3985f9",
  "#3888f9",
  "#378bf9",
  "#368df9",
  "#3590f8",
  "#3393f8",
  "#3295f7",
  "#3198f7",
  "#309bf6",
  "#2f9df5",
  "#2ea0f4",
  "#2da2f3",
  "#2ca5f1",
  "#2ba7f0",
  "#2aaaef",
  "#2aaced",
  "#29afec",
  "#28b1ea",
  "#28b4e8",
  "#27b6e6",
  "#27b8e5",
  "#26bbe3",
  "#26bde1",
  "#26bfdf",
  "#25c1dc",
  "#25c3da",
  "#25c6d8",
  "#25c8d6",
  "#25cad3",
  "#25ccd1",
  "#25cecf",
  "#26d0cc",
  "#26d2ca",
  "#26d4c8",
  "#27d6c5",
  "#27d8c3",
  "#28d9c0",
  "#29dbbe",
  "#29ddbb",
  "#2adfb8",
  "#2be0b6",
  "#2ce2b3",
  "#2de3b1",
  "#2ee5ae",
  "#30e6ac",
  "#31e8a9",
  "#32e9a6",
  "#34eba4",
  "#35eca1",
  "#37ed9f",
  "#39ef9c",
  "#3af09a",
  "#3cf197",
  "#3ef295",
  "#40f392",
  "#42f490",
  "#44f58d",
  "#46f68b",
  "#48f788",
  "#4af786",
  "#4df884",
  "#4ff981",
  "#51fa7f",
  "#54fa7d",
  "#56fb7a",
  "#59fb78",
  "#5cfc76",
  "#5efc74",
  "#61fd71",
  "#64fd6f",
  "#66fd6d",
  "#69fd6b",
  "#6cfd69",
  "#6ffe67",
  "#72fe65",
  "#75fe63",
  "#78fe61",
  "#7bfe5f",
  "#7efd5d",
  "#81fd5c",
  "#84fd5a",
  "#87fd58",
  "#8afc56",
  "#8dfc55",
  "#90fb53",
  "#93fb51",
  "#96fa50",
  "#99fa4e",
  "#9cf94d",
  "#9ff84b",
  "#a2f84a",
  "#a6f748",
  "#a9f647",
  "#acf546",
  "#aff444",
  "#b2f343",
  "#b5f242",
  "#b8f141",
  "#bbf03f",
  "#beef3e",
  "#c1ed3d",
  "#c3ec3c",
  "#c6eb3b",
  "#c9e93a",
  "#cce839",
  "#cfe738",
  "#d1e537",
  "#d4e336",
  "#d7e235",
  "#d9e034",
  "#dcdf33",
  "#dedd32",
  "#e0db32",
  "#e3d931",
  "#e5d730",
  "#e7d52f",
  "#e9d42f",
  "#ecd22e",
  "#eed02d",
  "#f0ce2c",
  "#f1cb2c",
  "#f3c92b",
  "#f5c72b",
  "#f7c52a",
  "#f8c329",
  "#fac029",
  "#fbbe28",
  "#fdbc28",
  "#feb927",
  "#ffb727",
  "#ffb526",
  "#ffb226",
  "#ffb025",
  "#ffad25",
  "#ffab24",
  "#ffa824",
  "#ffa623",
  "#ffa323",
  "#ffa022",
  "#ff9e22",
  "#ff9b21",
  "#ff9921",
  "#ff9621",
  "#ff9320",
  "#ff9020",
  "#ff8e1f",
  "#ff8b1f",
  "#ff881e",
  "#ff851e",
  "#ff831d",
  "#ff801d",
  "#ff7d1d",
  "#ff7a1c",
  "#ff781c",
  "#ff751b",
  "#ff721b",
  "#ff6f1a",
  "#fd6c1a",
  "#fc6a19",
  "#fa6719",
  "#f96418",
  "#f76118",
  "#f65f18",
  "#f45c17",
  "#f25916",
  "#f05716",
  "#ee5415",
  "#ec5115",
  "#ea4f14",
  "#e84c14",
  "#e64913",
  "#e44713",
  "#e24412",
  "#df4212",
  "#dd3f11",
  "#da3d10",
  "#d83a10",
  "#d5380f",
  "#d3360f",
  "#d0330e",
  "#ce310d",
  "#cb2f0d",
  "#c92d0c",
  "#c62a0b",
  "#c3280b",
  "#c1260a",
  "#be2409",
  "#bb2309",
  "#b92108",
  "#b61f07",
  "#b41d07",
  "#b11b06",
  "#af1a05",
  "#ac1805",
  "#aa1704",
  "#a81604",
  "#a51403",
  "#a31302",
  "#a11202",
  "#9f1101",
  "#9d1000",
  "#9b0f00",
  "#9a0e00",
  "#980e00",
  "#960d00",
  "#950c00",
  "#940c00",
  "#930c00",
  "#920c00",
  "#910b00",
  "#910c00",
  "#900c00",
  "#900c00",
  "#900c00",
]
  .map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);

function prepare_data(df) {
  return df
    .then((df) => {
      let colname = Object.keys(df); // value
      let modelname = Object.keys(df[colname[0]]); //model

      let result = Array(modelname.length);

      for (let i = 0; i < modelname.length; i++) {
        let axes_axis = Array(colname.length);
        colname.forEach((element, index) => {
          axes_axis[index] = {
            axis: element,
            value: df[element][modelname[i]],
          };
        });
        result[i] = {
          className: modelname[i],
          axes: axes_axis,
        };
      }
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
}
function showRadaronHtml(
  data,
  title,
  idselector,
  width = 600,
  base_svg_width = 480
) {
  let radar_root_element = document.querySelector(idselector);

  let charttitle_dom = radar_root_element.querySelector(
    "div.chart-container-title"
  );
  if (charttitle_dom == undefined) {
    charttitle_dom = document.createElement("div");
    charttitle_dom.setAttribute("class", "chart-container-title");
    radar_root_element.appendChild(charttitle_dom);
    let title_p_dom = document.createElement("p");
    title_p_dom.appendChild(document.createTextNode(title));
    charttitle_dom.appendChild(title_p_dom);
  }

  let chart_box_dom = document.createElement("div");
  chart_box_dom.setAttribute("class", "radar-chart-box");
  radar_root_element.appendChild(chart_box_dom);

  let chart_view_dom = document.createElement("div");
  chart_view_dom.setAttribute("class", "radar-chart-view");
  chart_box_dom.appendChild(chart_view_dom);

  let radar_plot_view = idselector + " .radar-chart-view";
  let radar_legendplot_view = idselector + " .radar-chart-box";
  return data
    .then((_data) => {
      radarchartd3.RadarChart.draw(radar_plot_view, _data, {
        containerClass: "radar-chart",
        w: base_svg_width,
        h: base_svg_width,
        factor: 0.95,
        factorLegend: 1,
        levels: 3,
        maxValue: 0,
        minValue: 0,
        radians: 2 * Math.PI,
        color: d3.scale.ordinal().range(shuffled_color),
        axisLine: true,
        axisText: true,
        circles: true,
        radius: 1,
        open: false, // whether or not the last axis value should connect back to the first axis value
        // if true, consider modifying the chart opacity (see "Style with CSS" section above)
        axisJoin: function (d, i) {
          return d.className || i;
        },
        tooltipFormatValue: function (d) {
          return d;
        },
        tooltipFormatClass: function (d) {
          return d;
        },
        transitionDuration: 300,
      });
      return _data;
    })
    .then((data) => {
      let legend_dom_ul = document.createElement("ul");

      data.forEach((element, index) => {
        let spanelement = document.createElement("p");
        spanelement.appendChild(document.createTextNode('r' + element["className"]));
        spanelement.style.color = chart_box_dom.querySelector(
          ".radar-chart-serie" + index
        ).style.fill;
        spanelement.addEventListener("mouseenter", (event) => {
          event.target.parentNode.parentNode.parentNode.parentNode
            .querySelector(".radar-chart-serie" + index)
            .classList.add("focused");
          event.target.parentNode.parentNode.parentNode.parentNode
            .querySelector(".radar-chart")
            .classList.add("focus");
        });
        spanelement.addEventListener("mouseleave", (event) => {
          event.target.parentNode.parentNode.parentNode.parentNode
            .querySelector(".radar-chart-serie" + index)
            .classList.remove("focused");
          event.target.parentNode.parentNode.parentNode.parentNode
            .querySelector(".radar-chart")
            .classList.remove("focus");
        });

        let lielement = document.createElement("li");
        lielement.setAttribute("class", "radar_chart_serieIndex_" + index);
        lielement.appendChild(spanelement);

        legend_dom_ul.appendChild(lielement);
      });

      let legend_dom = document.createElement("div");
      legend_dom.setAttribute("class", "radar-chart-legend");
      legend_dom.appendChild(legend_dom_ul);
      document.querySelector(radar_legendplot_view).appendChild(legend_dom);
      return width;
    })
    .then((w) => {
      radar_root_element.style.display = "inline-block";
      // radar_root_element.style.zoom = w / radar_root_element.clientWidth;
      // return radar_root_element.style.zoom;
    })
    .then((w) => {
      // let svg_element = radar_root_element.querySelector("svg.radar-chart");
      // svg_element.style.zoom = (svg_element.clientWidth / base_svg_width) * w;
      return title;
    })
    .catch((err) => {
      console.log(err);
    });
}
function read_csv_from_url(url, baseurl = true) {
  if (baseurl == true) {
    url = document.baseURI + url;
  }
  let df = fetch(url)
    .then((d) => d.json())
    .catch((err) => {
      console.log(err);
    });
  return df;
}

export { showRadaronHtml, prepare_data, read_csv_from_url };
