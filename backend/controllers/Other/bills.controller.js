const Bills = require("../../models/Other/bills.model.js");

const getBills = async (req, res) => {
    try {
        let Bill = await Bills.find(req.body);
        if (!Bill) {
            return res
                .status(400)
                .json({ success: false, message: "Bills Not Available" });
        }
        const data = {
            success: true,
            message: "All Bills Loaded!",
            Bill,
        };
        res.json(data);
    } catch (error) {
        console.error(error.message);
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const addBills = async (req, res) => {
    let { enrollmentNo, internal } = req.body;
    try {
        let existingBills = await Bills.findOne({ enrollmentNo });
        if (existingBills) {
            if (internal) {
                existingBills.internal = { ...existingBills.internal, ...internal }
            }
            await existingBills.save()
            const data = {
                success: true,
                message: "Bills Added!",
            };
            res.json(data);
        } else {
            await Bills.create(req.body);
            const data = {
                success: true,
                message: "Bills Added!",
            };
            res.json(data);
        }
    } catch (error) {
        console.error(error.message);
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const deleteBills = async (req, res) => {
    try {
        let bill = await Bills.findByIdAndDelete(req.params.id);
        if (!bill) {
            return res
                .status(400)
                .json({ success: false, message: "No Bills Data Exists!" });
        }
        const data = {
            success: true,
            message: "Bills Deleted!",
        };
        res.json(data);
    } catch (error) {
        console.error(error.message);
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { getBills, addBills, deleteBills }