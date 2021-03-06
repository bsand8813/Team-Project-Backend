const express = require("express");
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser')

const db = require ("./config/db");
const User = require("./models/User");
const Cart = require("./models/Cart");
const Profile = require("./models/Profile");

app.get("/", (req,res) => res.send ("respon berhasil"));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('img'))

db.authenticate().then(() =>
 console.log ("berhasil terkoneksi dengan database")
);


app.post("/produk", async (req,res) => {
    try {
        const { idProduk, namaProduk, hargaProduk, kategoriProduk, gambarProduk, gambarProduk2, gambarProduk3, gambarProduk4, keteranganProduk } = req.body;
        const newUser = new User({
            idProduk,
            namaProduk,
            hargaProduk,
            kategoriProduk,
            gambarProduk,
            gambarProduk2,
            gambarProduk3,
            gambarProduk4,
            keteranganProduk
        });

        await newUser.save();

        res.json(newUser);

    } catch (err) {
        console.error(err.massage);
        res.status(500).send("server error");
    }
});



app.get("/produk", async (req, res)=>{
    try {
        const getAllUser = await User.findAll({})

        res.json(getAllUser)
    } catch (err) {
        console.error(err.massage);
        res.status(500).send("server error");
    }
})

app.get("/produk/:id", async (req,res)=>{
    try {
        const ids = req.params.id

        const getUser = await User.findOne({
            where: {idProduk:ids}
        });

        res.json(getUser);
    } catch (err) {
        console.error(err.massage);
        res.status(500).send("server error");
    }
})

app.get("/category/:kategori", async (req,res)=>{
    try {
        const idu = req.params.kategori

        const getUser = await User.findAll({
            where: {kategoriProduk:idu}
        });

        res.json(getUser);
    } catch (err) {
        console.error(err.massage);
        res.status(500).send("server error");
    }
})

app.delete("/produk/:id", async (req,res) =>{
    try {
        const ids = req.params.id;

        const deleteUser = await User.destroy({
            where : {idProduk:ids}
        });

        res.json("berhasil di hapus")
    } catch (err) {
        console.error(err.massage);
        res.status(500).send("server error");
    }
});

app.put("/produk/:id", async (req,res) =>{
    try {
        const {idProduk, namaProduk, hargaProduk, kategoriProduk, gambarProduk, gambarProduk2, gambarProduk3, gambarProduk4, keteranganProduk} = req.body;
        const ids = req.params.id;

        const updateUser = await User.update({
            idProduk,
            namaProduk,
            hargaProduk,
            kategoriProduk,
            gambarProduk,
            gambarProduk2,
            gambarProduk3,
            gambarProduk4,
            keteranganProduk
        },{where : {idProduk:ids}});

        await updateUser;

        res.json("berhasil di update");
    } catch (err) {
        console.error(err.massage);
        res.status(500).send("server error");
    }
});


// Cart Produk

app.post("/cart", async (req,res) => {
    try {
        const { idProduk, namaProduk, hargaProduk, sizeProduk, jumlahProduk, gambarProduk} = req.body;
        const newCart = new Cart({
            idProduk,
            namaProduk,
            hargaProduk,
            sizeProduk,
            jumlahProduk,
            gambarProduk
        });

        await newCart.save();

        res.json(newCart);

    } catch (err) {
        console.error(err.massage);
        res.status(500).send("server error");
    }
});

app.get("/cart", async (req, res)=>{
    try {
        const getAllCart = await Cart.findAll({})

        res.json(getAllCart)
    } catch (err) {
        console.error(err.massage);
        res.status(500).send("server error");
    }
})

app.delete("/cart/:id", async (req,res) =>{
    try {
        const ids = req.params.id;

        const deleteCart = await Cart.destroy({
            where : {idProduk:ids}
        });

        res.json("berhasil di hapus")
    } catch (err) {
        console.error(err.massage);
        res.status(500).send("server error");
    }
});

app.delete("/cart", async (req,res) =>{
    try {
        

        const deleteCart = await Cart.destroy({
            where : {},
            truncate : true
        });

        res.json("berhasil di hapus")
    } catch (err) {
        console.error(err.massage);
        res.status(500).send("server error");
    }
});

//Profile Page

app.post("/profile", async (req,res) => {
    try {
        const { userName, contact, alamat,metode,bank, jumlahProduk, totalHarga } = req.body;
        const newProfile = new Profile({
            userName, 
            contact, 
            alamat,
            metode,
            bank, 
            jumlahProduk, 
            totalHarga
        });

        await newProfile.save();

        res.json(newProfile);

    } catch (err) {
        console.error(err.massage);
        res.status(500).send("server error");
    }
});

app.get("/profile", async (req, res)=>{
    try {
        const getAllProfile = await Profile.findAll({})

        res.json(getAllProfile)
    } catch (err) {
        console.error(err.massage);
        res.status(500).send("server error");
    }
})




app.listen(8000, ()=> console.log("port berjalan di 8000"));