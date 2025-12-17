// --- (1) IMPORTS ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// --- (2) CONFIGURATIONS & APP INITIALIZATION ---
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/Petora";
const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';

// --- (3) MIDDLEWARE ---
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- (4) DATABASE CONNECTION ---
mongoose.connect(MONGO_URI)
 .then(() => {
  console.log("MongoDB connected successfully.");
 })
  .catch(err =>{
    console.error("MongoDB connection error:", err);
  });

// --- (5) MONGOOSE MODELS ---

// --- Shelter Model ---
const ShelterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  contactEmail: { type: String },
  contactPhone: { type: String },
}, { timestamps: true });

const Shelter = mongoose.model('Shelter', ShelterSchema);

// --- Shelter User Model (NEW) ---
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['shelter-admin', 'super-admin'], default: 'shelter-admin' },
    shelterRef: { // Links the user to the Shelter document they manage
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shelter',
        required: true
    }
}, { timestamps: true });

// Pre-save hook to hash the password before saving
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('User', UserSchema);
// --- End User Model ---

// --- Pet Model ---
const PetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String },
  age: { type: Number },
  gender: { type: String, enum: ['Male', 'Female', 'Unknown'], default: 'Unknown' },
  size: { type: String, enum: ['Small', 'Medium', 'Large'], default: 'Medium' },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  status: { type: String, enum: ['Available', 'Pending', 'Adopted'], default: 'Available' },
  shelterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shelter',
    required: false
  }
}, { timestamps: true });

const Pet = mongoose.model('Pet', PetSchema);

// --- Application Model ---
const ApplicationSchema = new mongoose.Schema({
  applicantName: { type: String, required: true },
  applicantEmail: { type: String, required: true },
  applicantPhone: { type: String, required: true },
  message: { type: String },
  status: { type: String, enum: ['Submitted', 'In-Review', 'Approved', 'Rejected'], default: 'Submitted' },
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  }
}, { timestamps: true });

const Application = mongoose.model('Application', ApplicationSchema);

// --- (6.1) AUTH MIDDLEWARE (FIXED) ---
const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded; 
            return next(); // Added return to stop execution after successful verification
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // This only runs if no token was provided
    return res.status(401).json({ message: 'Not authorized, no token' });
};

const admin = (req, res, next) => {
    if (req.user && (req.user.role === 'shelter-admin' || req.user.role === 'super-admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};
// --- END AUTH MIDDLEWARE ---

// --- (6.2) MULTER CONFIGURATION (For Image Uploads) ---
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// --- (7) API ROUTES (Our Server's Endpoints) ---

// --- (7.1) AUTH ROUTES (NEW) ---
// A. Register/Create Admin (Should only be accessible internally/once)
app.post('/api/auth/register', async (req, res) => {
    try {
        const newUser = new User(req.body); 
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User registered successfully', userId: savedUser._id });
    } catch (error) {
        // Error 11000 is duplicate key (email)
        const errorMessage = error.code === 11000 ? 'Email already registered.' : error.message;
        res.status(400).json({ message: errorMessage });
    }
});

// B. Login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role, shelterId: user.shelterRef }, 
            JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.status(200).json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// --- END AUTH ROUTES ---

// --- Shelter Routes ---
app.post('/api/shelters', async (req, res) => {
  try {
    const newShelter = new Shelter(req.body);
    const savedShelter = await newShelter.save();
    res.status(201).json(savedShelter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/shelters', async (req, res) => {
  try {
    const shelters = await Shelter.find();
    res.status(200).json(shelters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- Pet Routes ---
// GET routes remain PUBLIC
app.get('/api/pets', async (req, res) => {
  try {
    const filters = {};
    if (req.query.species) {
      filters.species = req.query.species;
    }
    if (req.query.size) {
      filters.size = req.query.size;
    }
    if (req.query.status) {
      filters.status = req.query.status;
    }
    
    const pets = await Pet.find(filters).populate('shelterId');
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/pets/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate('shelterId');
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST Pet: NOW PUBLIC (No authentication required)
app.post('/api/pets', upload.single('image'), async (req, res) => {
  try {
    // Extract body fields including shelterId from request body
    const { name, species, breed, age, gender, size, description, shelterId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image upload is required.' });
    }

    const imageUrl = req.file.path.replace(/\\/g, "/");

    const newPet = new Pet({
      name,
      species,
      breed,
      age,
      gender,
      size,
      description,
      shelterId: shelterId || null, // Accept shelterId from request body
      imageUrl: imageUrl
    });

    const savedPet = await newPet.save();
    res.status(201).json(savedPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT Pet: NOW PUBLIC (No authentication required)
app.put('/api/pets/:id', async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPet) return res.status(404).json({ message: 'Pet not found' });
    res.status(200).json(updatedPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE Pet: NOW PUBLIC (No authentication required)
app.delete('/api/pets/:id', async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.id);
    if (!deletedPet) return res.status(404).json({ message: 'Pet not found' });
    
    res.status(200).json({ message: 'Pet deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// --- Application Routes ---
// GET and POST application routes remain OPEN
app.post('/api/applications', async (req, res) => {
  try {
    const newApplication = new Application(req.body);
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/applications', async (req, res) => {
  try {
  const applications = await Application.find().populate('petId');
    res.status(200).json(applications);
 } catch (error) {
    res.status(500).json({ message: error.message });
   }
});


// app.put('/api/applications/:id', async (req, res) => {
//     try {
//         const { status } = req.body;
//         // Assuming your model is named 'AdoptionApplication' or similar
//         const updatedApplication = await AdoptionApplication.findByIdAndUpdate(
//             req.params.id,
//             { status: status },
//             { new: true }
//         );

//         if (!updatedApplication) {
//             return res.status(404).json({ message: 'Application not found' });
//         }
//         res.json(updatedApplication);
//     } catch (error) {
//         console.error("Error updating application:", error);
//         res.status(500).json({ message: 'Server error updating application' });
//     }
// });

// // 2. Route to Update Pet Status
// // Ensure you have a route that looks like this:
// app.put('/api/pets/:id', async (req, res) => {
//     try {
//         const { status } = req.body;
//         // Assuming your model is named 'Pet'
//         const updatedPet = await Pet.findByIdAndUpdate(
//             req.params.id,
//             { status: status },
//             { new: true }
//         );

//         if (!updatedPet) {
//             return res.status(404).json({ message: 'Pet not found' });
//         }
//         res.json(updatedPet);
//     } catch (error) {
//         console.error("Error updating pet:", error);
//         res.status(500).json({ message: 'Server error updating pet' });
//     }
// });


// --- (8) START THE SERVER ---
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:5000');
});