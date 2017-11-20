DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(25) NULL,
    department_name VARCHAR(25) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mouse", "Electronics", 9.50, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wireless Keyboard", "Electronics", 13.75, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Monitor", "Electronics", 25.75, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ground Coffee", "Beverages", 9.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Desk", "Office", 36.50, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chair", "Office", 19.50, 65);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics", 1500.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Glasses", "Eyewear", 100.75, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Stress Ball", "Office Good", 5.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Desk Lamp", "Office Good", 19.50, 10);

SELECT * FROM products;