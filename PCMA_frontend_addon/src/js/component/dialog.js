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
require("./dialog.scss");
import { make_DOMnode } from "../utils";

class Dialog {
  constructor({ parentnode: node_, innerNode: node_inner_ }) {
    this.dialog_dom = make_DOMnode({
      tagname: "dialog",
      attr: { class: "dialog_box" },
      innerNode: node_inner_,
      parentnode: node_,
    });
    this.timeoutctr = undefined;
    return this;
  }
  open() {
    this.dialog_dom.setAttribute("open", "");
    return this;
  }
  close() {
    this.dialog_dom.removeAttribute("open");
    return this;
  }
  showerror(code, msg, details) {
    clearInterval(this.timeoutctr);
    this.dialog_dom.innerHTML = `<div><strong><pre>${msg}</pre></strong><details><sumary><pre>${details}</pre></sumary></details>` + `<hr><button style="border-radius: 10px;">Close</button></div>`;
    this.dialog_dom.querySelector('button').onclick = () => { this.close(); }
    this.open();
    return this;
  }
  showinformation(innerHTML, button = true) {
    clearInterval(this.timeoutctr);
    this.dialog_dom.innerHTML = `<div>${innerHTML}` + (button ? `<hr><button style="border-radius: 10px;">Close</button>` : '') + `</div>`;
    if (button) this.dialog_dom.querySelector('button').onclick = () => { this.close(); }
    this.open();
    return this;
  }
  showforatime(innerHTML, sec = 5.0) {
    clearInterval(this.timeoutctr);
    this.dialog_dom.innerHTML = `<div>${innerHTML}</div>`;
    this.open();
    this.timeoutctr = setTimeout(() => {
      this.close();
    }, sec * 1000);
    return this;
  }
}

class ToolTip {
  constructor({ parentnode: node_, innerNode: node_inner_, timeout: timeout }) {
    this.tooltip_dom = make_DOMnode({
      tagname: "div",
      attr: { class: "tooltop_box" },
      innerNode: node_inner_,
      parentnode: node_,
    });
    this.interval_contrl = undefined;
    this.timeout = timeout;

    this.tooltip_dom.addEventListener("mouseover", (event) => {
      clearInterval(this.interval_contrl);
    });
    this.tooltip_dom.addEventListener("mouseout", (event) => {
      this.interval_contrl = setInterval(function () {
        this.#close();
        clearInterval(this.interval_contrl);
      }, this.timeout);
    });
    return this;
  }
  add_listener(target) {
    target.addEventListener("mouseover", (event) => {
      this.#display(target);
    });
    target.addEventListener("mouseout", (event) => {
      this.interval_contrl = setInterval(function () {
        this.#close();
        clearInterval(this.interval_contrl);
      }, this.timeout);
    });
  }

  #display(target) {
    this.tooltip_dom.style.display = "block";
    let element_position = target.getBoundingClientRect();
    this.tooltip_dom.style.top = `${window.scrollY + element_position.top + element_position.height
      }px`;
    this.tooltip_dom.style.left = `${window.scrollX + e.clientX}px`;

    let dom_position = this.tooltip_dom.getBoundingClientRect();
    // console.log(dom_position.y + dom_position.height);
    if (dom_position.y + dom_position.height > window.innerHeight) {
      this.tooltip_dom.style.top = `${window.scrollY + element_position.top - dom_position.height
        }px`;
    }
    if (
      dom_position.x + this.tooltip_dom.offsetWidth >
      document.body.clientWidth
    ) {
      this.tooltip_dom.style.left = `${window.scrollX +
        dom_position.x -
        (dom_position.x +
          this.tooltip_dom.offsetWidth -
          document.body.clientWidth)
        }px`;
    }

  }
  #close() {
    this.tooltip_dom.style.display = "none";
  }
}

export { Dialog, ToolTip };
