

// /* Test page
exports.getTest = (req, res) => {
    try{

        const data ={
            message: "Test za backend razvoj na softver!",
        };
        res.status(200).render("test", data); 
    }
    catch(err){
        res.status(500).send("Error");
    }
};

