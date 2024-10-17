const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 4000;
const crypto = require("crypto");

app.use(
  cors({
    origin: "*", // Allow all origins for development
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mcmhost",
  //sample
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});
app.post("/login", (req, res) => {
  const sqlfind = `SELECT fullname FROM users WHERE fullname = ?} `;
  // const sqlfind = `SELECT fullname FROM users WHERE `current.user dept == username.dept`} `;
  let { username, password } = req.body;

  // Ensure username and password are strings
  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).json({ message: "Invalid input format" });
  }

  username = username.trim();
  password = password.trim();

  const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;

  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).send(err);
    }
    if (results.length > 0) {
      const user = results[0];
      const isAdmin = user.admin === 1;
      const isDeptHead = user.admin === 0;

      // Generate token
      const token = crypto.randomBytes(16).toString("hex");
      const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      // Save token and expiry to database
      const tokenSql = `UPDATE users SET token = ?, token_expiry = ? WHERE id = ?`;
      db.query(tokenSql, [token, expiry, user.id], (err, tokenResults) => {
        if (err) {
          console.error("Database update error:", err);
          return res.status(500).send(err);
        }
        res.status(200).json({
          message: "Login successful",
          user: {
            username: user.username,
            fullname: user.fullname,
            isAdmin,
            isDeptHead,
            dept: user.dept,
          },
          token,
          expiry,
        });
      });
    } else {
      console.log("Invalid username or password for user:", username);
      res.status(401).json({ message: "Invalid username or password" });
    }
  });
});

app.post("/api/requestsFilter", (req, res) => {
  const userDept = req.body.dept;

  const sql = "SELECT * FROM request WHERE dept = ? AND facultyApproved = 0";
  db.query(sql, [userDept], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.post("/getDeanForUser", (req, res) => {
  // const { username } = req.body;
  const userDept = req.body.dept;

  const sqlfind = `
        SELECT fullname
        FROM users
        WHERE username = ?
    `;

  db.query(sqlfind, userDept, (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

app.post("/validate_token", (req, res) => {
  const { token } = req.body;

  const sql = "SELECT token_expiry FROM users WHERE token = ?";

  db.query(sql, [token], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).send(err);
    }
    if (results.length > 0) {
      const tokenExpiry = results[0].token_expiry;
      if (new Date(tokenExpiry) > new Date()) {
        res.status(200).json({ valid: true, expiry: tokenExpiry });
      } else {
        res.status(401).json({ valid: false, message: "Token expired" });
      }
    } else {
      res.status(401).json({ valid: false, message: "Invalid token" });
    }
  });
});

app.post("/saveCRequest", (req, res) => {
  const {
    requestorName,
    dept,
    purpose,
    dateOfFiling,
    dateOfUse,
    timeOfUseStart,
    timeOfUseEnd,
    schoolBuilding,
    others,
    adminBuilding,
    furnitures,
    quantities,
    device,
    cquantities,
    telev,
    tquantities,
    micQty,
    speakerQty,
    accessoriesQty,
    sportsEquipment,
    otherEquipment,
    status = "Pending", // Default status to "Pending" if not provided
    remarks = "None", // Default remarks to "None" if not provided
    user,
    ticket,
    carsQty,
  } = req.body;

  // Function to filter nested car models based on 'checked' property and 'qty' greater than zero
  const filterCarModels = (models) => {
    return Object.fromEntries(
      Object.entries(models).filter(
        ([modelKey, modelValue]) => modelValue.checked && modelValue.qty > 0
      )
    );
  };

  // Function to filter top-level car categories
  const filterCarsQty = (cars) => {
    const filtered = {};
    Object.keys(cars).forEach((carType) => {
      const filteredModels = filterCarModels(cars[carType]);
      if (Object.keys(filteredModels).length > 0) {
        filtered[carType] = filteredModels;
      }
    });
    return filtered;
  };

  const filterObject = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => value)
    );
  };

  const filteredSchoolBuilding = filterObject(schoolBuilding);
  const filteredOthers = filterObject(others);
  const filteredAdminBuilding = filterObject(adminBuilding);
  const filteredFurnitures = filterObject(furnitures);
  const filteredQuantities = filterObject(quantities);
  const filteredDevice = filterObject(device);
  const filteredCQuantities = filterObject(cquantities);
  const filteredTelev = filterObject(telev);
  const filteredTQuantities = filterObject(tquantities);
  const filteredMicQty = filterObject(micQty);
  const filteredSpeakerQty = filterObject(speakerQty);
  const filteredAccessoriesQty = filterObject(accessoriesQty);
  const filteredSportsEquipment = filterObject(sportsEquipment);
  const filteredOtherEquipment = filterObject(otherEquipment);
  const filteredCarsQty = filterCarsQty(carsQty);

  const sql = `INSERT INTO request (
        requestorName,
        dept,
        purpose,
        dateOfFiling,
        dateOfUse,
        timeOfUseStart,
        timeOfUseEnd,
        schoolBuilding,
        others,
        adminBuilding,
        furnitures,
        quantities,
        device,
        cquantities,
        telev,
        tquantities,
        micQty,
        speakerQty,
        accessoriesQty,
        sportsEquipment,
        otherEquipment,
        status,
        remarks,
        DeptHead,
        ticket,
        carsQty
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    requestorName,
    dept,
    purpose,
    dateOfFiling,
    dateOfUse,
    timeOfUseStart,
    timeOfUseEnd,
    JSON.stringify(filteredSchoolBuilding),
    JSON.stringify(filteredOthers),
    JSON.stringify(filteredAdminBuilding),
    JSON.stringify(filteredFurnitures),
    JSON.stringify(filteredQuantities),
    JSON.stringify(filteredDevice),
    JSON.stringify(filteredCQuantities),
    JSON.stringify(filteredTelev),
    JSON.stringify(filteredTQuantities),
    JSON.stringify(filteredMicQty),
    JSON.stringify(filteredSpeakerQty),
    JSON.stringify(filteredAccessoriesQty),
    JSON.stringify(filteredSportsEquipment),
    JSON.stringify(filteredOtherEquipment),
    status,
    remarks,
    user,
    ticket,
    JSON.stringify(filteredCarsQty),
  ];

  db.query(sql, values, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ id: results.insertId, ...req.body });
  });
});

app.post("/saveRequest", (req, res) => {
  const {
    requestorName,
    dept,
    purpose,
    dateOfFiling,
    dateOfUse,
    timeOfUseStart,
    timeOfUseEnd,
    schoolBuilding,
    others,
    adminBuilding,
    furnitures,
    quantities,
    device,
    cquantities,
    telev,
    tquantities,
    micQty,
    speakerQty,
    accessoriesQty,
    sportsEquipment,
    otherEquipment,
    status = "Pending", // Default status to "Pending" if not provided
    remarks = "None", // Default remarks to "None" if not provided
    user,
    ticket,
    carsQty = "",
  } = req.body;

  const filterObject = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => value)
    );
  };

  const filteredSchoolBuilding = filterObject(schoolBuilding);
  const filteredOthers = filterObject(others);
  const filteredAdminBuilding = filterObject(adminBuilding);
  const filteredFurnitures = filterObject(furnitures);
  const filteredQuantities = filterObject(quantities);
  const filteredDevice = filterObject(device);
  const filteredCQuantities = filterObject(cquantities);
  const filteredTelev = filterObject(telev);
  const filteredTQuantities = filterObject(tquantities);
  const filteredMicQty = filterObject(micQty);
  const filteredSpeakerQty = filterObject(speakerQty);
  const filteredAccessoriesQty = filterObject(accessoriesQty);
  const filteredSportsEquipment = filterObject(sportsEquipment);
  const filteredOtherEquipment = filterObject(otherEquipment);

  const sql = `INSERT INTO request (
            requestorName,
            dept,
            purpose,
            dateOfFiling,
            dateOfUse,
            timeOfUseStart,
        timeOfUseEnd,
            schoolBuilding,
            others,
            adminBuilding,
            furnitures,
            quantities,
            device,
            cquantities,
            telev,
            tquantities,
            micQty,
            speakerQty,
            accessoriesQty,
            sportsEquipment,
            otherEquipment,
            status,
            remarks,
            DeptHead,
            ticket,
            carsQty
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    requestorName,
    dept,
    purpose,
    dateOfFiling,
    dateOfUse,
    timeOfUseStart,
    timeOfUseEnd,
    JSON.stringify(filteredSchoolBuilding),
    JSON.stringify(filteredOthers),
    JSON.stringify(filteredAdminBuilding),
    JSON.stringify(filteredFurnitures),
    JSON.stringify(filteredQuantities),
    JSON.stringify(filteredDevice),
    JSON.stringify(filteredCQuantities),
    JSON.stringify(filteredTelev),
    JSON.stringify(filteredTQuantities),
    JSON.stringify(filteredMicQty),
    JSON.stringify(filteredSpeakerQty),
    JSON.stringify(filteredAccessoriesQty),
    JSON.stringify(filteredSportsEquipment),
    JSON.stringify(filteredOtherEquipment),
    status,
    remarks,
    user,
    ticket,
    carsQty,
  ];

  db.query(sql, values, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ id: results.insertId, ...req.body });
  });
});

// Endpoint to get requests
app.get("/api/requests", (req, res) => {
  db.query("SELECT * FROM request WHERE status = 'Pending'", (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.post("/api/requests/:id/approve", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const sql = `UPDATE request SET remarks = '',status = ?, facultyApproved = '1' WHERE id = ?`;
  db.query(sql, [status, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Request approved", id });
  });
});

app.post("/api/requests/:id/disapprove", (req, res) => {
  const { id } = req.params;
  const { remarks } = req.body;
  const sql = `UPDATE request SET status = 'Disapproved', remarks = ? WHERE id = ?`;
  db.query(sql, [remarks, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Request disapproved", id });
  });
});

app.delete("/api/requests/:id/disapproveOten", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM request WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Request disapproved", id });
  });
});

app.get("/api/logs", (req, res) => {
  let sql = "SELECT * FROM request";
  const filters = [];

  if (req.query.department) {
    filters.push(`dept = '${req.query.department}'`);
  }
  if (req.query.statuses) {
    const statuses = req.query.statuses.split(",");
    filters.push(
      `status IN (${statuses.map((status) => `'${status}'`).join(",")})`
    );
  }

  if (filters.length > 0) {
    sql += " WHERE " + filters.join(" AND ");
  }

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.get("/api/category_counts", (req, res) => {
  const departmentQuery =
    "SELECT dept as department, COUNT(*) as count FROM request GROUP BY dept";
  const statusQuery = req.query.department
    ? "SELECT status, COUNT(*) as count FROM request WHERE dept = ? GROUP BY status"
    : "SELECT status, COUNT(*) as count FROM request GROUP BY status";

  db.query(departmentQuery, (err, departmentResults) => {
    if (err) return res.status(500).send(err);

    db.query(statusQuery, [req.query.department], (err, statusResults) => {
      if (err) return res.status(500).send(err);

      res.json({
        departments: departmentResults,
        statuses: statusResults,
      });
    });
  });
});

app.post("/api/getCurrentDateSched", (req, res) => {
  const { dateOfUse } = req.body;

  const sql = `
        SELECT schoolBuilding, adminBuilding, others, timeOfUseStart, timeOfUseEnd
        FROM request
            WHERE status = 'Approved'
            AND dateOfUse = ?
            AND (schoolBuilding IS NOT NULL AND schoolBuilding <> ''
                OR adminBuilding IS NOT NULL AND adminBuilding <> ''
                OR others IS NOT NULL AND others <> '')


    `;

  db.query(sql, [dateOfUse], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.post("/api/getCurrentDateShedCar", (req, res) => {
  const { dateOfUse } = req.body;

  const sql = `
        SELECT carsQty, timeOfUseStart, timeOfUseEnd
            FROM request
            WHERE status = 'Approved'
            AND dateOfUse = ?
            AND carsQty IS NOT NULL
            AND carsQty <> ''
    `;

  db.query(sql, [dateOfUse], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://172.20.10.11:${port}`);
});
