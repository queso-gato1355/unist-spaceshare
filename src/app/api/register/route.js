import { connectToDatabase } from "../../../lib/mongodb";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import fs from "fs";
import nextConnect from "next-connect";

const uploadDir = path.join(process.cwd(), "public", "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const fileFilter = (req, file, cb) => {
    const typeArray = file.mimetype.split('/');
    const fileType = typeArray[1];

    if (fileType === 'jpg' || fileType === 'png' || fileType === 'jpeg' || fileType === 'gif' || fileType === 'webp') {
        req.fileValidationError = null;
        cb(null, true);
    } else {
        req.fileValidationError = "jpg, jpeg, png, gif, webp 파일만 업로드 가능합니다.";
        cb(null, false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(file.originalname);
        const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
        cb(null, filename);
    },
});

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { 
        fileSize: 10 * 1024 * 1024 //크기 제한 : 10MB
    }
});

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Something went wrong: ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    },
});

apiRoute.use(upload.single('profilePicture'));

apiRoute.post(async (req, res) => {
    const { email, username, password } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: "Username, password, and email are required" });
    }

    const { db } = await connectToDatabase();

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
    }

    const profilePicture = req.file;
    let profilePicturePath = "";
    if (profilePicture) {
        profilePicturePath = path.join("public", "uploads", profilePicture.filename);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
        username,
        password: hashedPassword,
        email,
        profilePicture: profilePicturePath,
    };

    try {
        await db.collection("users").insertOne(user);
        return res.status(201).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ error: "Server Error" });
    }
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disable Next.js's default body parsing so multer can handle it
    },
};
