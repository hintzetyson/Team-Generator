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

managerFunction();
//First team member will be the manager, who makes the team
function managerFunction() {

    //Manager questions
    const managerQuestions = [
        {
            type: 'input',
            name: 'managerName',
            message: 'What is your name?'
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
    inquirer.prompt(managerQuestions).then(res => {
        let name = res.managerName;
        let id = res.managerId;
        let email = res.managerEmail;
        let officeNumber = res.managerOffice;

        const manager = new Manager(name, id, email, officeNumber);

        team.push(manager);

        nextEmployee();
    })
};

function engineerFunction() {
    const engineerQuestions = [
        {
            type: 'input',
            name: 'engineerName',
            message: 'What is the name of the Engineer?'
        },
        {
            type: 'input',
            name: 'engineerId',
            message: 'What is the Id number of this Engineer?'
        },
        {
            type: 'input',
            name: 'engineerEmail',
            message: 'What is the Engineer\'s email address?'
        },
        {
            type: 'input',
            name: 'engineerGithub',
            message: 'What is the Engineer\'s Github username?'
        }
    ];

    inquirer.prompt(engineerQuestions).then(res => {
        let name = res.engineerName;
        let id = res.engineerId;
        let email = res.engineerEmail;
        let github = res.engineerGithub;

        const engineer = new Engineer(name, id, email, github);

        team.push(engineer);

        nextEmployee();
    });
    
};

function internFunction() {
    const internQuestions = [
        {
            type: 'input',
            name: 'internName',
            message: 'What is the name of the intern?'
        },
        {
            type: 'input',
            name: 'internId',
            message: 'What is the Id number of this intern?'
        },
        {
            type: 'input',
            name: 'internEmail',
            message: 'What is the intern\'s email address?'
        },
        {
            type: 'input',
            name: 'internSchool',
            message: 'What is the intern\'s school?'
        },
    ];

    inquirer.prompt(internQuestions).then(res => {
        let name = res.internName;
        let id = res.internId;
        let email = res.internEmail;
        let school = res.internSchool;

        const intern = new Intern(name, id, email, school);

        team.push(intern);

        nextEmployee();
    });
}

function nextEmployee() {
//Questions for next employees
    const nextEmployeeQuestions = [
        {
            type: 'list',
            name: 'continue',
            message: 'Would you like to add another member of your team?',
            choices: ['Engineer', 'Intern', 'Team Complete']
        }
    ];
//Next employee questions switch cases
    inquirer.prompt(nextEmployeeQuestions).then(res => {
        switch (res.continue) {
            case 'Engineer':
                engineerFunction();
                break;

            case 'Intern':
                internFunction();
                break;
//Default will be to put in to the folder
            default:
                if (!fs.existsSync(OUTPUT_DIR)) {
                    fs.mkdirSync(OUTPUT_DIR, function (err) {
                        if (err) throw err;
                    })
                }

        // Write file for the team cards
        fs.writeFileSync(outputPath, render(team), 'utf-8');
        
        console.log('Your team has been generated!');
        }
    })
}
