const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./media");
    },
    filename: function (req, file, cb) {
        let filename = ""
       if (req.body?.type === "profile") {
            if (req.body.enrollmentNo) {
                filename = `user_Profile_${req.body.enrollmentNo}_EnrollmentYear_${req.body.category}.png`
            } else {
                filename = `Employee_Profile_${req.body.employeeId}.png`
            }
        } else if (req.body?.type === "material") {
            filename = `${req.body.title}_Utility_${req.body.utility}.pdf`
        }
        cb(null, `${filename}`);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
