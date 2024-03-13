const fs = require("fs");
const express = require("express");

const app = express();
const PORT = 9000;

// middleware untuk membaca json dari request body ke kita
app.use(express.json());

// read file json
const customers = JSON.parse(fs.readFileSync(`${__dirname}/data/dummy.json`));

// localhost:8000
app.get("/", (req, res, next) => {
  res.send("<p>Hello fsw 1 tercinta</p>");
});

app.get("/api/v1/customers", (req, res, next) => {
  res.status(200).json({
    status: "success",
    totalData: customers.length,
    data: {
      customers,
    },
  });
});

app.post("/api/v1/customers", (req, res) => {
  console.log(req.body);

  const newCustomer = req.body;

  customers.push(req.body);
  fs.writeFile(
    `${__dirname}/data/dummy.json`,
    JSON.stringify(customers),
    (err) => {
      req.status(201).json({
        status: "success",
        data: {
          customer: newCustomer,
        },
      });
    }
  );

  res.send("oke udah");
});

app.listen(PORT, () => {
  console.log(`APP running on port : ${PORT}`);
});
