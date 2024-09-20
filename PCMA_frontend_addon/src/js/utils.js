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
function addbookmark(title, url) {
    if (window.sidebar) {
        // Firefox
        window.sidebar.addPanel(title, url, '');
    }
    else if (window.opera && window.print) {
        // Opera
        var elem = document.createElement('a');
        elem.setAttribute('href', url);
        elem.setAttribute('title', title);
        elem.setAttribute('rel', 'sidebar');
        elem.click(); //this.title=document.title;
    }
    else if (document.all) {
        // ie
        window.external.AddFavorite(url, title);
    }
}

function make_DOMnode({ tagname: tagname, attr: attr, parentnode: parentnode, innerHTML: innerHTML, innerText: innerText, innerNode: innerNode }) {
    let node = document.createElement(tagname);
    if (attr != undefined)
        Object.keys(attr).forEach(k => node.setAttribute(k, attr[k]));
    if (parentnode != undefined)
        parentnode.appendChild(node);
    if (innerNode != undefined)
        node.appendChild(innerNode);
    if (innerHTML != undefined)
        node.innerHTML = innerHTML;
    if (innerText != undefined)
        node.innerText = innerText;
    return node;
}

const html_search_params = () => {
    return new Proxy(
        new URLSearchParams(window.location.search),
        {
            get: (searchParams, prop) => searchParams.get(prop),
        }
    )
};

function createUUID() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

function render_table(data, caption = undefined, table_head = undefined) {
    let table_dom = document.createElement("table");
    let head_keys = Object.keys(data);
    // check length
    let data_length = data[head_keys[0]].length;

    head_keys.forEach((e) => {
        if (data[e].length != data_length)
            throw Error(`${e}: data[e].length != data_length`);
    });
    if (caption != undefined) {
        let caption_dom = document.createElement("caption");
        caption_dom.innerHTML = caption;
        table_dom.appendChild(caption_dom);
    }
    // Add Head.
    let head_dom = document.createElement("thead");
    let head_row_dom = document.createElement("tr");
    head_dom.appendChild(head_row_dom);
    table_dom.appendChild(head_dom);

    if (table_head == undefined) {
        head_keys.forEach((e) => {
            let cell_dom = document.createElement("th");
            cell_dom.innerText = e;
            head_row_dom.appendChild(cell_dom);
        });
    } else {
        head_keys.forEach((e) => {
            let cell_dom = document.createElement("th");
            cell_dom.innerText = table_head[e];
            head_row_dom.appendChild(cell_dom);
        });
    }

    // Add Cell
    let tbody_dom = document.createElement("tbody");
    [...Array(data_length).keys()].forEach((_, i) => {
        let row_dom = document.createElement("tr");

        head_keys.forEach((key) => {
            let cell_dom = document.createElement("td");
            cell_dom.innerText = data[key][i];
            cell_dom.classList.add(`tdcell_${key}`);
            row_dom.appendChild(cell_dom);
        });

        tbody_dom.appendChild(row_dom);
    });
    table_dom.appendChild(tbody_dom);
    return table_dom;
}
const b64toBlob = (b64Data, contentType, sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}
export { make_DOMnode, html_search_params, createUUID, render_table, b64toBlob };