var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");




var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employee_trackerDB"
});


connection.connect(function(err) {
  if (err) throw err;
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles", "Add Role", "Update Role", "View All Departments", "Update Deparment", "Add Department","Exit"]
    })
    .then(function(answer) {
        switch (answer.action) {
            case "View All Employees":
              viewEmployees();
              break;
      
            case "View All Employees By Department":
              viewEmpsByDep();
              break;
      
            case "View All Employees By Manager":
              viewEmpsByMgr();
              break;
      
            case "Add Employee":
              addEmployee();
              break;

            case "Remove Employee":
              removeEmployee();
              break;

            case "Update Employee Role":
              updateEmpRole();
              break;

            case "Update Employee Manager":
              updateEmpMgr();
              break;
      
            case "Exit":
              connection.end();
              break;
        }
    });
}


function viewEmployees() {

    var query = `select employee.id as EmployeeID, employee.first_name as "First Name", employee.last_name as "Last Name", 
    role.title as "Job Title",  department.name as Department, role.salary as Salary, concat(manager.first_name," ",manager.last_name) as Manager
    from employee
    left join role on employee.role_id = role.id
    left join department on department.id = role.department_id
    left join employee manager on employee.manager_id = manager.id`;
      connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);    
        start();
      });
}

function viewEmpsByDep() {

    var query = `select name from department`;
    connection.query(query, function(err, res) {
        if (err) throw err;
        var depts = [];
        res.forEach(employee => {
            if(depts.indexOf(employee.name == -1)){
                depts.push(employee.name)
            }
        });
        inquirer
            .prompt({
                name: "dept",
                type: "list",
                message: "Which Department would you like to view?",
                choices: depts
            })
            .then(function(answer) {
                var query = `select employee.id as EmployeeID, employee.first_name as "First Name", employee.last_name as "Last Name", 
                role.title as "Job Title",  department.name as Department, role.salary as Salary, concat(manager.first_name," ",manager.last_name) as Manager
                from employee
                left join role on employee.role_id = role.id
                left join department on department.id = role.department_id
                left join employee manager on employee.manager_id = manager.id where department.name = ?`;
                connection.query(query,answer.dept, function(err, res) {
                    if (err) throw err;
                    console.table(res);    
                    start();
            });
             
      });
    });
      
}

function viewEmpsByMgr() {
    var query = `select distinct concat(manager.first_name," ",manager.last_name) as name from employee inner join employee manager on employee.manager_id = manager.id`;

    connection.query(query, function(err, res) {
        if (err) throw err;
        var managers = [];
        res.forEach(manager => {
            if(managers.indexOf(manager.name == -1)){
                managers.push(manager.name)
            }
        });

        // console.log(managers);
    
        inquirer
            .prompt({
                name: "mgr",
                type: "list",
                message: "Which team would you like to view?",
                choices: managers
            })
            .then(function(answer) {
                var query = `select employee.id as EmployeeID, employee.first_name as "First Name", employee.last_name as "Last Name", 
                role.title as "Job Title",  department.name as Department, role.salary as Salary, concat(manager.first_name," ",manager.last_name) as Manager
                from employee
                left join role on employee.role_id = role.id
                left join department on department.id = role.department_id
                left join employee manager on employee.manager_id = manager.id where concat(manager.first_name," ",manager.last_name) = ?`;
                connection.query(query,answer.mgr, function(err, res) {
                    if (err) throw err;
                    console.table(res);    
                    start();
                // console.log(answer.mgr);
            });
             
      });
    });
  
}

function addEmployee(){

}

function removeEmployee(){

}

function updateEmpRole(){
    
}

function updateEmpMgr(){

}