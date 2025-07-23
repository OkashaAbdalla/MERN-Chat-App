import bcrypt from 'bcrypt';
import userModel from '../models/user.model.js';
import generateJWT from '../utils/generateJWT.js';


export const signup = async (req, res ) =>{
    const {username, email, password, avatar} = req.body;
    try{

        if (!username || !email || !password){
            return res.status(400).json({message: "Please fill all field"});
        }  
            
            //validate password
        if (password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters"});   
        }

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (!hashedPassword) {
            return res.status(404).json({message: "password hashing faileld"});
        }

        // check if user already exists
        const existinguser = await userModel.findOne({email})

        // create user
        const newUser = new userModel({
            username: username,
            email: email,
            password: hashedPassword,
            avatar: avatar || 'https://via.placeholder.com/150/4A90E2/FFFFFF?text=User'        
        });

        await newUser.save();
        res.status(201).json({message: "User created successfully",
             user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                avatar: newUser.avatar    }});
                
         } catch (error) {  
            console.error("Error in signUp:", error);
        }       res.status(500).json({message: "Internal server error"});
         
    }    

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ⿡ Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    // ⿢ Find user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // ⿣ Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // ⿤ Set user online status to true
    user.isOnline = true;
    await user.save();

    // ⿥ Generate token
    const token = generateJWT(user._id, res);

    // ⿦ Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        isOnline: user.isOnline,
      },
    });

   

  // ⿥ Create and save new user
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      avatar,
      location: {
        country: location?.country || "",
        city: location?.city || "",
        houseAddress: location?.houseAddress || ""
      }
    });
   

  await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
        location: newUser.location,
        

      }
    });

    // ⿥ Create and save new user
    const newuser = new userModel({
      username,
      email,
      password: hashedPassword,
      avatar,
      location: {
        country: location?.country || "",
        city: location?.city || "",
        houseAddress: location?.houseAddress || ""
      }
    });

    await newuser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
        location: newUser.location
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error during login",
      error: error.message,
    });
  }
};
 // Import the JWT generation function


export const signout = async (req, res) => {
  try {
    if (!req.user || !req.user._id ) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }
     
    // Update user's online status to false
    await userModel.findByIdAndUpdate(req.user._id, {
      isOnline: false,
    });

    // Clear the JWT cookie
    res.cookie('jwt', '', {
      maxAge: 0, // Expire the cookie immediately
      httpOnly: true, 
      sameSite: 'strict', // Ensure the cookie is sent only in same-site requests
      secure: process.env.NODE_ENV === 'production', 
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during logout',
      error: error.message,
    });
  }
};
 

// Update user info controller

export const checkAuth = async (req, res) => {
  try {
    if (!res.req.user) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error during authentication check",
      error: error.message,
    });
  }
}
