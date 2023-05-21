CREATE TYPE enum_status AS ENUM ('OPEN', 'ORDERED');
CREATE EXTENSION if not exists "uuid-ossp";
DROP TABLE if exists users cascade;
DROP TABLE if exists carts cascade;
DROP TABLE if exists products cascade;
DROP TABLE if exists stocks cascade;
DROP TABLE if exists cart_items cascade;
DROP TABLE if exists orders cascade;

CREATE TABLE users (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   name text,
   email text,
   password text
);

CREATE TABLE carts (
	id uuid PRIMARY KEY default uuid_generate_v4(),
    user_id uuid not null,
    created_at date not null, 
    updated_at date not null,
    status enum_status,
    foreign key ("user_id") references "users" ("id")
);

CREATE TABLE stocks (
   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   count integer not null
);

CREATE TABLE products (
   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   title text not null,
   description text,
   price integer,
   stocks_id uuid,
   foreign key ("stocks_id") references "stocks" ("id")
);


CREATE TABLE cart_items (
	id uuid PRIMARY KEY default uuid_generate_v4(),
	cart_id uuid, 
    product_id uuid,
    count integer,
    foreign key ("cart_id") references "carts" ("id"),
	foreign key ("product_id") references "products" ("id")
);


CREATE TABLE orders (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   user_id uuid,
   cart_id uuid,
   payment json,
   delivery json,
   comments text,
   status enum_status,
   total numeric,
   foreign key ("cart_id") references "carts" ("id"),
   foreign key ("user_id") references "users" ("id")
);

insert into users (id, name, email, password) values 
('088bef61-8b79-4c8c-be38-d045e59bb043','Egor', 'egor@gmail.com', 'secret123.'),
('c564ba91-d2da-429d-a32f-819693997d77','Egor2', 'egor2@gmail.com', 'secret1232.'),
('4658f634-c567-4c20-b5e5-b716d6cd11ad','Andry', 'andry@gmail.com', 'secret456.');

insert into carts (id, user_id, created_at, updated_at, status) values 
('d5cefa30-f679-4686-9007-71e11747990c', 'c564ba91-d2da-429d-a32f-819693997d77', '2023-05-01', '2023-05-02', 'OPEN'),
('db75bda8-5da4-434a-938b-a176a7910786', '4658f634-c567-4c20-b5e5-b716d6cd11ad', '2023-04-20', '2023-04-21', 'ORDERED');

insert into stocks (id, count) values 
('b5d02652-a87d-4c6a-b2c3-406f9b8d8a12', 20),
('e97d2aa9-b558-4d20-9364-b6bb761617f1', 10);

insert into products (id, title, description, price, stocks_id) values 
('714a1450-1b99-415b-94f2-034a353c1dd1','Product1', 'Description for product1', 65, 'b5d02652-a87d-4c6a-b2c3-406f9b8d8a12'),
('261696d8-2899-4a6a-b82e-91d0cde4c7e9', 'Product2', 'Product2 descriptions', 45, 'e97d2aa9-b558-4d20-9364-b6bb761617f1');


insert into cart_items (cart_id, product_id, count) values 
('d5cefa30-f679-4686-9007-71e11747990c', '714a1450-1b99-415b-94f2-034a353c1dd1', 2),
('d5cefa30-f679-4686-9007-71e11747990c', '261696d8-2899-4a6a-b82e-91d0cde4c7e9', 3),
('db75bda8-5da4-434a-938b-a176a7910786', '714a1450-1b99-415b-94f2-034a353c1dd1', 4),
('db75bda8-5da4-434a-938b-a176a7910786', '261696d8-2899-4a6a-b82e-91d0cde4c7e9', 5);

insert into orders (id, user_id, cart_id, payment, delivery, comments, status, total) values 
('739180ca-0d19-4c74-9097-3c799eaa011c', 'c564ba91-d2da-429d-a32f-819693997d77', 'd5cefa30-f679-4686-9007-71e11747990c', '{"payment": "baz"}', '{"delivery": "der"}', 'some comment', 'OPEN', 5),
('5b447afe-5c0a-4d0a-9750-695a988527db','4658f634-c567-4c20-b5e5-b716d6cd11ad', 'db75bda8-5da4-434a-938b-a176a7910786', '{"payment": "baz22"}', '{"delivery": "der22"}', 'some comment22', 'OPEN', 9);
