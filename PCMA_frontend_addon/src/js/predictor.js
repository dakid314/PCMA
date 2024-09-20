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
require("../scss/predictor.scss");
import * as utils from "./utils";
import { Dialog } from "./component/dialog";


    
document.getElementById("main").querySelector("h1#loadingpage").remove();


let predictor_page = document.querySelector("[data_store]#predictor_page");
document.getElementById("main").innerHTML = predictor_page.innerHTML;


const paragraphElement = document.querySelector('div > p');
paragraphElement.id = 'job-id';
const jobIdText = utils.createUUID(); 
const textNode = document.createTextNode(` ${jobIdText}`);
paragraphElement.appendChild(textNode);

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    let wait_dialog_obj = new Dialog({
        parentnode: document.body,
    });
    wait_dialog_obj.dialog_dom.innerHTML = '<h1>WAIT a MOMENT...</h1>';
    wait_dialog_obj.open();
    
    const formData = new FormData();
    const bacteriaFile = document.getElementById('bacteriaFile').files[0];
    const metaboliteFile = document.getElementById('metaboliteFile').files[0];
    const diagnosisFile = document.getElementById('diagnosisFile').files[0];
    const labelFile = document.getElementById('LabelFile').files[0];
    const bacFile = document.getElementById('bac_File').files[0]

    if (bacteriaFile) { formData.append('Bacteria', bacteriaFile); if (!bacteriaFile.name.endsWith('csv')) { wait_dialog_obj.showinformation("<strong>Please Input CSV formatted bacteriaFile.</strong>", true);return; }}
    if (metaboliteFile) { formData.append('Metabolite', metaboliteFile); if (!metaboliteFile.name.endsWith('csv')) {wait_dialog_obj.showinformation("<strong>Please Input CSV formatted metaboliteFile.</strong>", true);return; }}
    if (diagnosisFile) { formData.append('Diagnosis', diagnosisFile); if (!diagnosisFile.name.endsWith('csv')) { wait_dialog_obj.showinformation("<strong>Please Input CSV formatted diagnosisFile.</strong>", true);return; }}
    if (labelFile) { formData.append('labelFile', labelFile);if (!labelFile.name.endsWith('csv')) { wait_dialog_obj.showinformation("<strong>Please Input CSV formatted labelFile.</strong>", true);return; }}
    if (bacFile) { formData.append('bacFile', bacFile);if (!bacFile.name.endsWith('csv')) { wait_dialog_obj.showinformation("<strong>Please Input CSV formatted labelFile.</strong>", true);return; }}
    
    formData.append('jobid', jobIdText);
    
    function parseCSVFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
    
            reader.onload = (event) => {
                const csv = event.target.result;
                const rows = csv.trim().split('\n').map(row => row.split(','));
                resolve(rows);
            };
    
            reader.onerror = () => {
                reject(new Error("File reading failed"));
            };
    
            reader.readAsText(file);
        });
    }
    
    // 提取第一列的函数
    function getFirstColumn(rows) {
        return rows.map(row => row[0]);
    }
    
    // 比较两个数组是否相等的函数
    function arraysAreEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }
      
      
    var checkboxes = document.querySelectorAll('#opt input[type="checkbox"]');
    var selectedValues = [];
    
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            selectedValues.push(checkbox.value);
        }
    });

    let args_dict = {
        'jobid': jobIdText,
        'email': document.querySelector("#email").value,
        'model': selectedValues
    };


    if (!args_dict.email.match(/^[0-9a-zA-Z][-0-9a-zA-Z]*@[0-9a-zA-Z][-0-9a-zA-Z]*(\.[-0-9a-zA-Z]+)+$/)) {
        wait_dialog_obj.showinformation("<strong>Please Input Correctly formatted email address.</strong>", true);
        return; 
    }

    
    if (!Array.isArray(args_dict.model) || !args_dict.model.includes('1') && !args_dict.model.includes('2') && !args_dict.model.includes('3')) {
        args_dict.model = undefined;
        wait_dialog_obj.showinformation("<strong>Please Select model.</strong>", true);
        return; 
    }
    
    const keys = ['Bacteria', 'Metabolite', 'Diagnosis'];

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (!formData.has(key)) {
            wait_dialog_obj.showinformation(`<strong>Please Select ${key} file.</strong>`, true);
            return;  
        }
    }
    if (!formData.has('labelFile') && args_dict.model.includes('4')) {
        args_dict.model = undefined;
        wait_dialog_obj.showinformation("<strong>Please Upload Label_file.</strong>", true);
        return; 
    }
    if (!formData.has('bacFile') && args_dict.model.includes('1')) {
        args_dict.model = undefined;
        wait_dialog_obj.showinformation("<strong>Please Upload bac_file.</strong>", true);
        return; 
    }
    if (bacteriaFile && metaboliteFile &&diagnosisFile){
    Promise.all([
        parseCSVFile(bacteriaFile),
        parseCSVFile(metaboliteFile),
        parseCSVFile(diagnosisFile)
        ]).then(([bacteriaData, metaboliteData, diagnosisData]) => {
        const bacteriaFirstColumn = getFirstColumn(bacteriaData);
        const metaboliteFirstColumn = getFirstColumn(metaboliteData);
        const diagnosisFirstColumn = getFirstColumn(diagnosisData);
        if (arraysAreEqual(bacteriaFirstColumn, metaboliteFirstColumn) && arraysAreEqual(bacteriaFirstColumn, diagnosisFirstColumn)) {
            setTimeout(() => {
                wait_dialog_obj.close();
            }, 2000);
            fetch(document.baseURI + 'api/file_submit', {
                method: 'POST',
                body: formData
            })
            .then(() => {
                return fetch(document.baseURI + 'api/job_submit', {
                    method: 'post', 
                    body: JSON.stringify(args_dict)
                });
            })
            .then(r => r.json())
            .then(d => {
                if (d.code != 0) {
                    wait_dialog_obj.showinformation(`<strong><pre>${d.msg}</pre></strong><details><sumary><pre>${d.errdetail}</pre></sumary></details>`, true)
                    UUID_box.value = utils.createUUID();
                    throw new Error("Wrong");
                }
                return d.data;
            })
            .then(data => {
                if (window.localStorage.UUID_list == undefined)
                    window.localStorage.UUID_list = '[]';
                let UUID_list = JSON.parse(window.localStorage.UUID_list)
                UUID_list.push(data.jobid)
            
                window.localStorage.UUID_list = JSON.stringify(UUID_list);
    
                window.location.href = document.baseURI + `result/index.html?jobid=${data.jobid}`;
            }) 
        }
        else{wait_dialog_obj.showinformation("<strong>Please Check you Files first Cloumn.</strong>", true);
            return;}
    })}
});