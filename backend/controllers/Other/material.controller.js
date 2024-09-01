const Material = require("../../models/Other/material.model");

const getMaterial = async (req, res) => {
    try {
        let material = await Material.find(req.body);
        if (!material) {
            return res
                .status(400)
                .json({ success: false, message: "No Material Available!" });
        }
        res.json({ success: true, message: "Material Found!", material });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const addMaterial = async (req, res) => {
    let { employee, utility, title } = req.body;
    try {
        await Material.create({
            employee,
            link: req.file.filename,
            utility,
            title,
        });
        const data = {
            success: true,
            message: "Material Added!",
        };
        res.json(data);
    } catch (error) {
        console.error(error.message);
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const updateMaterial = async (req, res) => {
    let { employee, link, utility, title } = req.body;
    try {
        let material = await Material.findByIdAndUpdate(req.params.id, {
            employee,
            link,
            utility,
            title,
        });
        if (!material) {
            return res
                .status(400)
                .json({ success: false, message: "No Material Available!" });
        }
        res.json({
            success: true,
            message: "Material Updated!",
        });
    } catch (error) {
        console.error(error.message);
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const deleteMaterial = async (req, res) => {
    try {
        let material = await Material.findByIdAndDelete(req.params.id);
        if (!material) {
            return res
                .status(400)
                .json({ success: false, error: "No Material Available!" });
        }
        res.json({
            success: true,
            message: "Material Deleted!",
            material,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
module.exports = { getMaterial, addMaterial, updateMaterial, deleteMaterial }