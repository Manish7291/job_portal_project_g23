const multer = require('multer');
const path = require('path');
const { AppError } = require('./errorHandler');

// Resume upload config
const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes');
  },
  filename: (req, file, cb) => {
    const uniqueName = `resume_${req.user._id}_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// Profile photo upload config
const photoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/photos');
  },
  filename: (req, file, cb) => {
    const uniqueName = `photo_${req.user._id}_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const resumeFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new AppError('Only PDF files are allowed for resumes', 400), false);
  }
};

const photoFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new AppError('Only image files are allowed', 400), false);
  }
};

const uploadResume = multer({
  storage: resumeStorage,
  fileFilter: resumeFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

const uploadPhoto = multer({
  storage: photoStorage,
  fileFilter: photoFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

// JD upload config
const jdStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/jds');
  },
  filename: (req, file, cb) => {
    const uniqueName = `jd_${req.user._id}_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const uploadJD = multer({
  storage: jdStorage,
  fileFilter: resumeFilter, // Reuse PDF filter
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

module.exports = { uploadResume, uploadPhoto, uploadJD };
