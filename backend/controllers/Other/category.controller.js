const Category = require("../../models/Other/category.model");

const getCategory = async (req, res) => {
    try {
        let categories = await Category.find();

        const data = {
            success: true,
            message: "All Category Loaded!",
            categories,
        };
        res.json(data);
    } catch (error) {
        console.error(error.message);
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}

const addCategory = async (req, res) => {
    let { name } = req.body;
    try {
        let category = await Category.findOne({ name });
        if (category) {
            const data = {
                success: false,
                message: "Already Exists!",
            };
            res.status(400).json(data);
        } else {
            await Category.create(req.body);
            const data = {
                success: true,
                message: "Category Added!",
            };
            res.json(data);
        }
    } catch (error) {
        console.error(error.message);
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const deleteCategory = async (req, res) => {
    try {
        let bill = await Category.findByIdAndDelete(req.params.id);
        if (!bill) {
            return res
                .status(400)
                .json({ success: false, message: "No Category Data Exists!" });
        }
        const data = {
            success: true,
            message: "Category Deleted!",
        };
        res.json(data);
    } catch (error) {
        console.error(error.message);
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { getCategory, addCategory, deleteCategory }