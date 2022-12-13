//list all tasks with narration and button to delete
//show option to add task
import chalk from "chalk";
import inquirer from "inquirer";
//delete functionality
let tasks = [];
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
async function addTask(task) {
    return new Promise((res) => {
        tasks.push(task);
        setTimeout(res, 0);
    });
}
async function deleteTask(task) {
    return new Promise((res) => {
        let t = tasks.findIndex(x => x.taskId === task.taskId);
        if (t != -1) {
            tasks.splice(t, 1);
        }
        setTimeout(res, 0);
    });
}
async function getTasks() {
    return new Promise((r) => {
        console.log(chalk.green('----------------------------------------'));
        tasks.forEach(t => {
            console.log(`${t.taskId} \t${t.taskNarr}\t\t${t.createDate} ✏️ ❌`);
        });
        setTimeout(r, 0);
    });
}
async function getInput() {
    let answer = await inquirer.prompt({
        name: 'action',
        type: 'checkbox',
        choices: [
            'Add    ➕',
            'Edit   ✏️',
            'Delete ❌',
            'Exit   ↗️'
        ]
    });
    return answer;
}
let keepContinue = false;
let taskCounter = 0;
export async function startProg() {
    //index title to prin here
    while (!keepContinue) {
        let x = await getInput();
        if (x === "Exit") {
            keepContinue = true;
        }
        else {
            if (x.includes("Add")) {
                let t = { taskId: ++taskCounter, taskNarr: "", createDate: new Date() };
                await addTask(t);
            }
        }
    }
}
