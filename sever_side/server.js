import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import multer from 'multer';
//
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    credentials: true
}));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser())
app.use(bodyParser.json());

app.use(session({
    secret: 'secrete',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))
//creating connections
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "restaurant"

})
//api fetching items data
app.get("/admin", (req, res) => {
    const sql = "SELECT * FROM menu_items";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        return res.json(results);
    });
});
// Set up Multer middleware to handle file uploads:
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       return cb(null, './public/images') // Specify the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
       return cb(null, `${file.originalname}`) // Specify the name of the uploaded file
    }
});

const upload = multer({storage});

//api input items data
app.post('/adding', upload.single('file'), (req, res) => {
    const sql = "INSERT INTO `menu_items`(`name`, `category`, `price`, `quantity`, `image`, `amount`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.category,
        req.body.price,
        req.body.quantity,
        req.file.filename, // Use req.file.filename to get the name of the uploaded file
        req.body.amount,

    ];
    db.query(sql, [values], (err, results) => {
        if (err) return res.json(err);
        return res.json(results);
    });
});


//api view menu item data
app.get('/view/:id', (req, res) => {
    const sql = "SELECT * FROM menu_items WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        return res.json(results);
    });
});
// API endpoint for fetching payment details
app.get('/payment/:user_id', (req, res) => {
    const userId = req.params.user_id;

    const sql = `SELECT * FROM payments WHERE user_id = ?;`;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Payment details not found" });
        }
        return res.json(results);
    });
});

//api update data
app.put('/edit/:id', (req, res) => {
    const { name, category, quantity, amount, price } = req.body;
    const id = req.params.id; // Correctly accessing the id parameter

    const sql = "UPDATE `menu_items` SET `name` = ?, `category` = ?, `quantity` = ?, `amount` = ?, `price` = ? WHERE `id` = ?";
    const values = [name, category, quantity, amount, price, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (result.affectedRows === 0) { // Check if any rows were affected by the update
            return res.status(404).json({ message: "menu item not found or not updated" });
        }
        return res.json({ message: "order item updated successfully" }); 
    });
});
//api view menu item data
app.get('/view_order/:order_id', (req, res) => {
    const sql = "SELECT * FROM orders WHERE order_id = ?";
    const id = req.params.order_id;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "order item not found" });
        }
        return res.json(results);
    });
});


//api update data
app.put('/edit_order/:order_id', (req, res) => {
    const { name, category, quantity, amount, price } = req.body;
    const id = req.params.order_id; // Correctly accessing the id parameter

    const sql = "UPDATE `orders` SET `name` = ?, `category` = ?, `quantity` = ?, `amount` = ?, `price` = ? WHERE `order_id` = ?";
    const values = [name, category, quantity, amount, price, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (result.affectedRows === 0) { // Check if any rows were affected by the update
            return res.status(404).json({ message: "order item not found or not updated" });
        }
        return res.json({ message: "order item updated successfully" }); 
    });
});

//api delete menu item data
app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM menu_items WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (result.affectedRows === 0) { // Check if any rows were affected by the deletion
            return res.status(404).json({ message: "Menu item not found or not deleted" });
        }
        return res.json({ message: "Menu item deleted successfully" }); 
    });
});
//api delete order item data
app.delete('/delete_order/:order_id', (req, res) => {
    const sql = "DELETE FROM orders WHERE order_id = ?";
    const id = req.params.order_id;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (result.affectedRows === 0) { // Check if any rows were affected by the deletion
            return res.status(404).json({ message: "Menu item not found or not deleted" });
        }
        return res.json({ message: "Menu item deleted successfully" }); 
    });
});
//verify session loged
app.get('/home', (req, res) => {
    if(req.session.role){
        return res.json({valid: true, role: req.session.role})
    }else{
        return res.json({valid: false})
    }
})

app.get('/user', (req, res) => {
    if(req.session.userId && req.session.role){
        return res.json({valid: true, userId: req.session.userId, role: req.session.role });
    } else {
        return res.json({valid: false});
    }
});

// //api input users data
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.role
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error occurred during signup:", err);
            return res.status(500).json({ error: "An error occurred during signup" });
        }
        return res.status(200).json({ message: "Signup successful", result });
    });
});


//api login user data
// app.post('/login', (req, res) => {
//     const sql = "SELECT * FROM users WHERE email = ? and password = ?";
//     db.query(sql, [req.body.email, req.body.password], (err, result) => {
//         if(err) return res.json({Message: "Error inside server"});
//         if(result.length > 0){
//             req.session.role = result[0].role;
//             return res.json({Login: true})
//         }else{
//             return res.json({Login: false})
//         }
//     })
// });
app.post('/login', (req, res) => {
    const sql = "SELECT id, role FROM users WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        if(result.length > 0){
            req.session.userId = result[0].id; // Store the user ID in session
            req.session.role = result[0].role; // Store the user role in session
            return res.json({Login: true});
        } else {
            return res.json({Login: false});
        }
    });
});

//log out
app.get('/logout', (req, res) => {
    // Clear session data
    req.session.destroy(err => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).json({ error: "Failed to logout" });
        }
        
        // Remove cookies
        res.clearCookie('connect.sid'); // Assuming 'connect.sid' is the default session cookie name
        
        // Respond with success message
        return res.status(200).json({ message: "Logout successful" });
    });
});
//storing cart data
app.post('/store-cart', (req, res) => {
    // Retrieve user ID from session
    const userId = req.session.userId;
    console.log("Retrieved userId:", userId);
    
    // Extract cart data from request body
    const { cart } = req.body;

    // Construct SQL query for inserting cart data into the database
    const insertOrderQuery = "INSERT INTO `orders`(`name`, `category`, `price`, `quantity`, `amount`, `user_id`) VALUES ?";
    
    // Construct values array for bulk insert
    const orderValues = cart.map(item => [
        item.name,
        item.category,
        item.price,
        item.quantity,
        item.amount,
        userId // Include user ID for each item in the cart
    ]);

    // Start a database transaction
    db.beginTransaction((beginTransactionError) => {
        if (beginTransactionError) {
            console.error("Error starting database transaction:", beginTransactionError);
            return res.status(500).json({ success: false, message: "Failed to start transaction." });
        }

        // Execute the insertion of order data
        db.query(insertOrderQuery, [orderValues], (insertOrderError, insertOrderResults) => {
            if (insertOrderError) {
                console.error("Error inserting order data:", insertOrderError);
                // Rollback the transaction in case of error
                db.rollback(() => {
                    console.error("Transaction rolled back.");
                    res.status(500).json({ success: false, message: "Failed to place order." });
                });
                return;
            }

            // Update the stock quantities of items in the inventory
            const updateStockQueries = cart.map(item => {
                const updateStockQuery = "UPDATE `menu_items` SET `quantity` = `quantity` - ? WHERE `id` = ?";
                return new Promise((resolve, reject) => {
                    db.query(updateStockQuery, [item.amount, item.id], (updateStockError, updateStockResults) => {
                        if (updateStockError) {
                            reject(updateStockError);
                        } else {
                            resolve(updateStockResults);
                        }
                    });
                });
            });

            // Execute all update queries
            Promise.all(updateStockQueries)
                .then(() => {
                    // Commit the transaction
                    db.commit((commitError) => {
                        if (commitError) {
                            console.error("Error committing transaction:", commitError);
                            res.status(500).json({ success: false, message: "Failed to commit transaction." });
                        } else {
                            res.status(200).json({ success: true, message: "Order placed successfully." });
                        }
                    });
                })
                .catch((updateStockError) => {
                    console.error("Error updating stock quantities:", updateStockError);
                    // Rollback the transaction in case of error
                    db.rollback(() => {
                        console.error("Transaction rolled back.");
                        res.status(500).json({ success: false, message: "Failed to place order." });
                    });
                });
        });
    });
});


// update cart data

app.post('/payment', (req, res) => {
    // Retrieve user ID from session
    const userId = req.session.userId;
    console.log("Retrieved userId:", userId);
    const { paymentMethod, deliveryAddress, phoneNumber } = req.body;
  
    // Insert payment details into the payments table
    const sql = "INSERT INTO payments (payment_method, delivery_address, phone_number, user_id) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [paymentMethod, deliveryAddress, phoneNumber, userId], (err, results) => {
      if (err) {
        console.error("Error inserting payment:", err);
        return res.status(500).json({ error: "Error processing payment" });
      }
      return res.status(200).json({ message: "Payment processed successfully" });
    });
});

//select orders 
// app.post('/update-order', (req, res) => {
   //  const { name, email, phone_number, address } = req.body;

//     // Check if all required fields are provided
//     if (!name || !email || !phone_number || !address) {
//         return res.status(400).json({ error: "Please provide all required fields" });
//     }

//     const sql = "INSERT INTO orders (name, email, phone_number, address) VALUES (?, ?, ?, ?)";
//     const values = [name, email, phone_number, address];

//     db.query(sql, values, (err, results) => {
//         if (err) {
//             console.error("Error updating order:", err);
//             return res.status(500).json({ error: "Error updating order" });
//         }
//         console.log("Order updated successfully");
//         return res.status(200).json({ message: "Order updated successfully" });
//     });
// });

//fetching orders
//api fetching items data
app.get("/orders", (req, res) => {
    const sql = "SELECT * FROM orders";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        return res.json(results);
    });
});
// Update order status
app.put('/orders/:order_id/status', (req, res) => {
    const orderId = req.params.order_id;
    const { status } = req.body;

    // Check if the status is valid
    const validStatuses = ['pending', 'processing', 'completed', 'deliverd','delivering'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
    }

    // Update the status in the database
    const sql = "UPDATE orders SET status = ? WHERE order_id = ?";
    db.query(sql, [status, orderId], (err, results) => {
        if (err) {
            console.error("Error updating order status:", err);
            return res.status(500).json({ error: "Error updating order status" });
        }
        console.log("Order status updated successfully");
        return res.status(200).json({ message: "Order status updated successfully" });
    });
});
//track api
app.get('/orders/:userId', (req, res) => {
    const userId = req.params.userId;
    console.log("my orders userId:", userId);
    const sql = "SELECT * FROM orders WHERE user_id = ?";
    
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("Error fetching orders:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        return res.json(results);
    });
});
// discount timer

// PATCH endpoint for updating menu item discounts
app.patch('/updateDiscounts', (req, res) => {
    const updatedItems = req.body;
    const sql = 'UPDATE menu_items SET price = ? WHERE id = ?';
  
    // Update each menu item's price in the database
    updatedItems.forEach(item => {
      db.query(sql, [item.price, item.id], (err, result) => {
        if (err) {
          console.error('Error updating menu item discount:', err);
        } else {
          console.log('Menu item discount updated:', result);
        }
      });
    });
  
    res.send('Menu item discounts updated successfully');
  });



// // Start the discount timer
// app.post('/start-timer', (req, res) => {
//     const { duration } = req.body; // Duration in seconds
//     const userId = req.session.userId; // Retrieve user ID from session
    
//     // Insert discount information into the Discounts table with user ID
//     const sql = "INSERT INTO discounts (duration, user_id) VALUES (?, ?)";
//     db.query(sql, [duration, userId], (err, result) => {
//         if (err) {
//             console.error("Error starting discount timer:", err);
//             return res.status(500).json({ message: "Internal server error" });
//         }
//         res.sendStatus(200);
//     });
// });

// // Stop the discount timer
// app.post('/stop-timer', (req, res) => {
//     const userId = req.session.userId; // Retrieve user ID from session
    
//     // Delete discount information associated with the user's session
//     const sql = "DELETE FROM discounts WHERE user_id = ?";
//     db.query(sql, [userId], (err, result) => {
//         if (err) {
//             console.error("Error stopping discount timer:", err);
//             return res.status(500).json({ message: "Internal server error" });
//         }
//         res.sendStatus(200);
//     });
// });

// // Get the remaining time of the discount timer
// app.get('/remaining-time', (req, res) => {
//     const userId = req.session.userId; // Retrieve user ID from session
    
//     // Retrieve the remaining time associated with the user's session
//     const sql = "SELECT duration FROM discounts WHERE user_id = ?";
//     db.query(sql, [userId], (err, result) => {
//         if (err) {
//             console.error("Error retrieving discount timer:", err);
//             return res.status(500).json({ message: "Internal server error" });
//         }
//         const remainingTime = result.length > 0 ? result[0].duration : null;
//         res.json({ remainingTime });
//     });
// });

// // Middleware to check if the discount timer is running for the current user
// const timerRunningMiddleware = (req, res, next) => {
//     const userId = req.session.userId; // Retrieve user ID from session
    
//     // Check if there is any record in the Discounts table associated with the user's session
//     const sql = "SELECT * FROM discounts WHERE user_id = ?";
//     db.query(sql, [userId], (err, result) => {
//         if (err) {
//             console.error("Error checking discount timer:", err);
//             return res.status(500).json({ message: "Internal server error" });
//         }
//         if (result.length > 0) {
//             res.status(400).json({ message: 'Discount timer is already running.' });
//         } else {
//             next();
//         }
//     });
// };

// // Middleware to check if the discount timer is stopped for the current user
// const timerStoppedMiddleware = (req, res, next) => {
//     const userId = req.session.userId; // Retrieve user ID from session
    
//     // Check if there is no record in the Discounts table associated with the user's session
//     const sql = "SELECT * FROM discounts WHERE user_id = ?";
//     db.query(sql, [userId], (err, result) => {
//         if (err) {
//             console.error("Error checking discount timer:", err);
//             return res.status(500).json({ message: "Internal server error" });
//         }
//         if (result.length === 0) {
//             res.status(400).json({ message: 'Discount timer is not running.' });
//         } else {
//             next();
//         }
//     });
// };












//port innitializing
app.listen(8001, ()=> {
    console.log("listening");
})
