DROP DATABASE IF EXISTS employee_trackerDB;

create database employee_trackerDB;

use employee_trackerDB;

create table department(
	id int not null auto_increment,
    name varchar(60),
    primary key (id)
);

create table role(
	id int not null auto_increment,
    title varchar(60),
    salary decimal(10,2),
    department_id int,
    primary key (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

create table employee (
	id int not null auto_increment,
	first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int,
    manager_id int,
	primary key (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);