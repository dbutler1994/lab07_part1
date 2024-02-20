// imports & instance setup
const express = require("express");
const app = express();
const connection = require("./connection");
const path = require("path");


// configuration & middleware
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index", {title : "My TV Shows"});
})

app.get("/admin/add", (req, res) =>{
    res.render("addtv");
})

app.post("/admin/add", (req, res) =>{
    const title = req.body.showField;
    const imgp = req.body.imgField;
    const descr = req.body.desField;

    const createSQL = `INSERT INTO my_shows (showname, imgpath, descript) VALUES(?,?,?);`;

    connection.query(createSQL,[title,imgp,descr], (err, result) =>{
        if (err) throw err;
        res.send(`You have added ::: <p>${title}</p> <p>${imgp}</p> <p>${descr}</p>`)
    })

})


app.get("/select", (req, res) =>{
    const readSQL = "SELECT * from my_shows";
    
    connection.query(readSQL, (err, result) =>{
        if (err) throw err;
        res.render("shows", {title : "List of Shows", shows : result});
        //let getStringy = JSON.stringify(result);
        //res.send(`<h2>My TV</h2><code> ${result[1].showname} </code>
        //<img src="${result[1].imgpath}">`);
    })
})

app.get("/row", (req,res) =>{
    const showid = req.query.tvid;
    const readSQL = "SELECT * FROM my_shows where id = ?"

    connection.query(readSQL, [showid], (err, result) =>{
        if(err) throw err;
        // res.send(`<h2>My TV</h2><code> ${result[0].showname}<code>
        // <img src="${result[0].imgpath}">`);
        res.render("series", {title : "My TV", show : result[0]})
    })
});


app.listen(3000, (err) =>{
    if (err) throw err;

    console.log('Listening on port 3000');
})