const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

const { signToken, publicUser } = require("../utils/token");


/*
|--------------------------------------------------------------------------
| REGISTER
|--------------------------------------------------------------------------
*/
async function register(req, res) {
    try {
        const {
            role = "customer",

            // User details
            email,
            phone,
            password,
            fullname,
            name,
            address,

            // Delivery details
            vehicleType,
            vehicleNumber,
            licenseNumber,

            // Restaurant details
            cuisine,
            restaurantName,
            restaurantContact,
            fssai_license,
            fssaiLicense
        } = req.body;


        /*
        |--------------------------------------------------------------------------
        | VALIDATION
        |--------------------------------------------------------------------------
        */

        if (!fullname && !name && !restaurantName) {
            return res.status(400).json({
                error: "Full name is required."
            });
        }


        if (!password || password.length < 6) {
            return res.status(400).json({
                error: "Password must be at least 6 characters."
            });
        }


        if (!email && !phone) {
            return res.status(400).json({
                error: "Email or phone is required."
            });
        }


        if (!["customer", "restaurant", "delivery"].includes(role)) {
            return res.status(400).json({
                error: "Invalid registration role."
            });
        }


        /*
        |--------------------------------------------------------------------------
        | NORMALIZE EMAIL
        |--------------------------------------------------------------------------
        */

        const normalizedEmail = email
            ? email.toLowerCase().trim()
            : undefined;


        /*
        |--------------------------------------------------------------------------
        | CHECK EXISTING USER
        |--------------------------------------------------------------------------
        */

        const query = normalizedEmail
            ? { email: normalizedEmail }
            : { phone };


        const existingUser = await User.findOne({
            ...query,
            role
        });


        if (existingUser) {
            return res.status(409).json({
                error: "Account already exists."
            });
        }


        /*
        |--------------------------------------------------------------------------
        | CREATE USER
        |--------------------------------------------------------------------------
        */

        const passwordHash = await bcrypt.hash(password, 12);


        const user = await User.create({
            fullname: fullname || name || restaurantName,

            email: normalizedEmail,

            phone,

            passwordHash,

            role,

            address: address || "",

            vehicleType,

            vehicleNumber,

            licenseNumber
        });


        console.log(
            "USER CREATED:",
            user._id.toString(),
            "ROLE:",
            user.role
        );


        /*
        |--------------------------------------------------------------------------
        | CREATE RESTAURANT
        |--------------------------------------------------------------------------
        */

        let restaurant = null;


        if (role === "restaurant") {

            restaurant = await Restaurant.create({

                // Connect restaurant to registered user
                owner: user._id,

                // Restaurant information
                name: restaurantName || name || fullname,

                cuisine: cuisine || "Indian",

                address: address || "",

                contact_number:
                    restaurantContact || phone || "",

                email: normalizedEmail || "",

                fssai_license:
                    fssai_license ||
                    fssaiLicense ||
                    "",

                status: "Pending"
            });


            console.log(
                "RESTAURANT CREATED:",
                restaurant._id.toString(),
                restaurant.name
            );
        }


        /*
        |--------------------------------------------------------------------------
        | RESPONSE
        |--------------------------------------------------------------------------
        */

        return res.status(201).json({

            message: "Registration successful.",

            user: publicUser(user),

            restaurant,

            token: signToken(user)
        });


    } catch (error) {

        console.error(
            "REGISTER ERROR:",
            error
        );


        return res.status(500).json({

            error:
                error.message ||
                "Registration failed."
        });
    }
}


/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/

async function login(req, res) {

    try {

        const {
            identifier,
            password,
            role
        } = req.body;


        if (!identifier || !password) {

            return res.status(400).json({
                error:
                    "Identifier and password are required."
            });
        }


        const q =
            identifier.includes("@")
                ? {
                    email:
                        identifier
                            .toLowerCase()
                            .trim()
                }
                : {
                    phone: identifier.trim()
                };


        const user = await User.findOne({
  ...q,
  ...(role ? { role } : {})
}).select('+passwordHash');


        if (
            !user ||
            !(await bcrypt.compare(
                password,
                user.passwordHash
            ))
        ) {

            return res.status(401).json({
                error:
                    "Invalid email/phone or password."
            });
        }


        if (!user.isActive) {

            return res.status(403).json({
                error:
                    "Account is inactive."
            });
        }

        if (user.role === "restaurant") {
            const restaurantAccount = await Restaurant.findOne({ owner: user._id });
            if (!restaurantAccount || restaurantAccount.status !== "Approved") {
                return res.status(403).json({
                    error: "Restaurant account is awaiting admin approval."
                });
            }
        }


        user.lastLoginAt = new Date();

        await user.save();


        let restaurant = null;


        if (user.role === "restaurant") {

            restaurant =
                await Restaurant.findOne({
                    owner: user._id
                });
        }


        return res.json({

            message:
                "Login successful.",

            token:
                signToken(user),

            user:
                publicUser(user),

            restaurant
        });


    } catch (error) {

        console.error(
            "LOGIN ERROR:",
            error
        );


        return res.status(500).json({

            error:
                error.message ||
                "Login failed."
        });
    }
}


/*
|--------------------------------------------------------------------------
| CURRENT USER
|--------------------------------------------------------------------------
*/

async function me(req, res) {

    try {

        let restaurant = null;


        if (
            req.user &&
            req.user.role === "restaurant"
        ) {

            restaurant =
                await Restaurant.findOne({
                    owner: req.user._id
                });
        }


        return res.json({

            user:
                publicUser(req.user),

            restaurant
        });


    } catch (error) {

        console.error(
            "ME ERROR:",
            error
        );


        return res.status(500).json({

            error:
                error.message ||
                "Unable to get user."
        });
    }
}


/*
|--------------------------------------------------------------------------
| EXPORT
|--------------------------------------------------------------------------
*/

module.exports = {
    register,
    login,
    me
};