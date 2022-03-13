const router = require('express').Router();
const { JsonWebTokenError } = require('jsonwebtoken');
const db = require("../db");
const jwt = require('jsonwebtoken');
const { route } = require('express/lib/application');
const SECRET = 'testeteste'

const verifyjwt = async (req, res, next) => { 
    console.log("verifyjwt");
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    if(!token){
        return res.status(404).json({
            success: false,
            data: [],
            error:['token not found']
        })
    }
    console.log("Aqui")
    await jwt.verify(token, SECRET,(err, decoded) => {
        if (err) {
            return res.status(404).json({
                success: false,
                data: [],
                error:['token invalid']
            })
        }
        req.Id = decoded.userId
        next()  
    })
       

    
}


router.post('/select', async (req, res) => {
    const data = req.body
    console.log('SELECT * FROM CLIENTES');
    
    const clientes = await db.selectCustomers({email:data.email, senha:data.senha});
    if(!clientes.length){
        res.json("")
        console.log(clientes);
    }else{
        console.log(clientes);
        const token = jwt.sign({userId:clientes[0].i_id_clientes}, SECRET, {expiresIn: 24000})
        res.json({auth:true, id:clientes[0].i_id_clientes , token})
    }
    
    
  
})


router.post('/register', async (req, res) => {
    console.log('INSERT INTO CLIENTES');
    const data = req.body
    res.send(data);
    const result = await db.insertCustomer({email:data.email, senha: data.senha});
    console.log(result);
    console.log(data)
    

})

router.post('/update', async (req, res) => {
    console.log('UPDATE CLIENTES')
    const data = req.body
    const result = await db.updateCustomer({senha:data.senha, id:data.id});
    console.log(result);
    res.send(result);
})

router.post('/delete',verifyjwt, async (req, res) => {
    console.log('DELETE CLIENTES')
    const data = req.body
    res.send(data);
    console.log(data);
    const result = await db.deleteCustomer({id:data.id});
    console.log(result);
})

router.get('/get',verifyjwt, async (req, res) => {
    console.log('SELECT * FROM CLIENTES');
    const clientes = await db.SuperCustomers();
    res.send(clientes);
})


module.exports = router