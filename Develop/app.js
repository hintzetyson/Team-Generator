//Required variables
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


//Need a team constant to allow for the team members to join
const team = [];

//First team member will be the manager, who makes the team
function managerFunction() {

    //Manager questions
    const managerQuestions = [
        {
            type: 'input',
            name: 'managerName',
            message: 'What is the your name?'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is your ID number?'
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: 'What is your email address?',
        },
        {
            type: 'input',
            name: 'managerPhone',
            message: 'What is your phone number?'
        }
    ];

    //Prompt for joining in the team members
    inquirer.prompt(managerQuestions).then(function res() {
        let name = res.managerName;
        let id = res.managerId;
        let email = res.managerEmail;
        let officeNumber = res.managerOffice;

        const manager = new Manager(name, id, email, officeNumber);

        team.push(manager);
    })
};

function engineerFunction() {
    const engineerQuestions = [
        {
            type: 'input'
            name: 'engineerName'
            message: 'What is the name of the Engineer?'
        },
        {
            type: 'input'
            name: 'engineerId'
            message: 'What is the Id number of this Engineer?'
        },
        {
            type: 'input'
            name: 'engineerEmail'
            message: 'What is the Engineer\'s email address?'
        },
        {
            type: 'input'
            name: 'githubUsername'
            message: 'What is the Engineer\'s Github username?'
        },
    ];

    inquirer.prompt(engineerQuestions).then(function res() {
        let name = res.engineerName;
        let id = res.engineerId;
        let email = res.engineerEmail;
        let github = res.engineerGithub;

        const engineer = new Engineer(name, id, email, github);

        team.push(engineer);
    })

    
}
