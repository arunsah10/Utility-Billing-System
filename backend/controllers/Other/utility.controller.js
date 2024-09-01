const Utility = require("../../models/Other/utility.model");

const getUtility = async (req, res) => {
    try {
        let utility = await Utility.find();
        if (!utility) {
            return res
                .status(400)
                .json({ success: false, message: "No Utility Available" });
        }
        const data = {
            success: true,
            message: "All Utility Loaded!",
            utility,
        };
        res.json(data);
    } catch (error) {
        console.error(error.message);
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const addUtility = async (req, res) => {
    let { name, code } = req.body;
    try {
        let utility = await Utility.findOne({ code });
        if (utility) {
            return res
                .status(400)
                .json({ success: false, message: "Utility Already Exists" });
        }
        await Utility.create({
            name,
            code,
        });
        const data = {
            success: true,
            message: "Utility Added!",
        };
        res.json(data);
    } catch (error) {
        console.error(error.message);
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const deleteUtility = async (req, res) => {
    try {
        let utility = await Utility.findByIdAndDelete(req.params.id);
        if (!utility) {
            return res
                .status(400)
                .json({ success: false, message: "No Utility Exists!" });
        }
        const data = {
            success: true,
            message: "Utility Deleted!",
        };
        res.json(data);
    } catch (error) {
        console.error(error.message);
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { getUtility, addUtility, deleteUtility }