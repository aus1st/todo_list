import chalk from "chalk";
import inquirer, { ListChoiceOptions, ListQuestionOptions } from "inquirer";
import { Task } from "../models/task.js";
import figlet from "figlet";
import gradient from "gradient-string";


let tasks: Task[] = [];

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

export async function welComeScreen() {
    console.clear();
    console.log('');
    figlet(`    Todo List     `, (err, data) => {
      console.log(gradient.fruit(data));
    });
    await sleep();
  }

async function addTask() {
let t = await inquirer.prompt({
    name: 'taskDesc',
    type: 'input',
    message: 'Input Task description'
})

let tsk: Task = {
    taskId: Math.floor(Math.random()*10),
    taskNarr: t.taskDesc,
    createDate: new Date(),
    status: 'Pending'
};
    return new Promise((res) => {
        tasks.push(tsk);
        setTimeout(res, 0);
    });

}

async function deleteTask(taskId: number) {
    return new Promise((res) => {
        let t = tasks.findIndex(x => x.taskId === taskId);
        if (t != -1) {
            tasks.splice(t, 1);
        }
        setTimeout(res, 0);
    });
}

async function getTasks() {

    return new Promise((r) => {

        if(tasks.length > 0 ){
            console.log(gradient.passion('Tasks List\n'));
            console.log(chalk.green('TaskId\t Date\t\t Status\t\tDesc.'));
            tasks.forEach(t => {
                console.log(chalk.bold(`${t.taskId} \t${t.createDate.getDate()}/${t.createDate.getMonth()}/${t.createDate.getFullYear()}\t${t.status}\t\t${t.taskNarr}`));
            });
            console.log('');
        } else {
            console.log(chalk.red('No Tasks Exist'));
        }
        setTimeout(r, 0);

    });
}

async function getInput() {
    let answer = await inquirer.prompt({
        name: 'action',
        type: 'list',
        choices: ['1.List   📃', '2.Add    ➕','3.Delete ❌','4.Update  🖊','5.Exit   ↗️'
        ],
        message: 'Select option: '
    });

    return answer.action;
}

async function updateStatus() {
    let taskId = await getTaskId();

    let st = await inquirer.prompt({
        name:'sts',
        type: 'list',
        choices: ['Started','Pending','Completed'],
        message: 'Select Status'
    });

    let taskToUpdate = tasks.find(t=>t.taskId === taskId);
    let taskIndex = tasks.findIndex(t=>t.taskId === taskId);
    if(taskToUpdate!=null) {
        taskToUpdate.status = st.sts;
        tasks.splice(taskIndex,1,taskToUpdate);
    }
}

async function getTaskId() {
   console.clear();
    await getTasks();
    let taskId = await inquirer.prompt({
        name: 'action',
        type: 'number',
        message: 'Input Task ID '
    });

    return taskId.action;
}

let keepContinue = false;
let taskCounter = 0;

export async function startProg() {
    //index title to prin here
    await welComeScreen();
    while (!keepContinue) {
        let x = await getInput();
        if ((x as string).includes("Exit")) {
            keepContinue = true;
        } else if ((x as string).includes("Add  ")) {
            await addTask();
            await getTasks();
            console.log(chalk.green( 'Task Added'));
        }
        else if ((x as string).includes("List  ")) {
                       
            await getTasks();

        } else if ((x as string).includes("3")) {
             let taskId =  await getTaskId();
         
            await deleteTask(taskId);
            await getTasks();     
            console.log(chalk.red('Task Deleted'));

        } else if ((x as string).includes("4")) {
            await updateStatus();
           await getTasks();     
           console.log(chalk.red('Task Updated'));

       }
    }


}