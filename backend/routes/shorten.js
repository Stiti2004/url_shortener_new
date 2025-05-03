const Url = require("../models/Url");
const { body, validationResult } = require('express-validator');
const express = require("express");
const router = express.Router();

const host = "http://localhost:5000"

const randomString = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 7; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

router.post("/shorten", [body("longUrl", "Enter the long Url").notEmpty()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const longUrl = req.body.longUrl;
    let name;
    let val;

    if (req.body.customString !== "") {
        const data = await Url.findOne({ name: req.body.customString });
        if (!data) {
            name = req.body.customString;
        } else {
            return res.status(400).json({ success: false, error: "Name is unavailable" });
        }
    } else {
        do {
            name = randomString();
            const data = await Url.findOne({ name: name });
            if (!data) {
                val = 0;
            } else {
                val = 1;
            }
        } while (val);
    }

    const shortUrl = `${host}/api/${name}`;
    //console.log(name, shortUrl);

    try {
        const newUrl = await Url.create({
            name: name,
            longUrl: longUrl,
            shortUrl: shortUrl
        });
        return res.status(200).json({success: true, shortUrl: newUrl.shortUrl});
    } catch (err) {
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
});

router.get("/:name", async (req, res) => {
    const name = req.params.name;
    const data = await Url.findOne({ name: name });
    if (!data) {
        return res.status(404).json({ error: "Invalid URL" });
    } else {
        //return res.status(200).json({ url: data.longUrl });
        return res.status(200).redirect(data.longUrl);
    }
});

module.exports = router;
