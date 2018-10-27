drop database if exists bamazon_db;

create database bamazon_db;

use bamazon_db;

create table products(
    id int not null auto_increment,
    product_name varchar(50) null,
    department_name varchar(50) null,
    price decimal(10,2) null,
    stock_quantity int null,
    primary key (id)
);

insert into products (product_name, department_name, price, stock_quantity) 
values ("Rare Batman Action Figure", "Toys",100.00,2);
insert into products (product_name, department_name, price, stock_quantity) 
values ("LOL Dolls", "Toys",9.99,200);
insert into products (product_name, department_name, price, stock_quantity) 
values ("iPad", "Electronics",529.99,9);
insert into products (product_name, department_name, price, stock_quantity) 
values ("Purple Rain Album by Prince", "Music",19.99,6);
insert into products (product_name, department_name, price, stock_quantity) 
values ("New Kids on the Block", "Music",9.99,5);
insert into products (product_name, department_name, price, stock_quantity) 
values ("Male Unicorn T-Shirt", "Clothing",29.99,30);
insert into products (product_name, department_name, price, stock_quantity) 
values ("How to Code for Dummies", "Books",59.99,22);
insert into products (product_name, department_name, price, stock_quantity) 
values ("Sunsets and Sunflowers", "Artwork",920.00,3);
insert into products (product_name, department_name, price, stock_quantity) 
values ("Pink Ponies and Pixes", "Artwork",1920.00,2);
insert into products (product_name, department_name, price, stock_quantity) 
values ("How to Win the Lottery", "Books",20.00,200);
insert into products (product_name, department_name, price, stock_quantity) 
values ("Pretty Pretty Princess T-Shirt", "Clothing",29.99,30);
insert into products (product_name, department_name, price, stock_quantity) 
values ("Macbook Pro", "Electronics",2529.99,12);



