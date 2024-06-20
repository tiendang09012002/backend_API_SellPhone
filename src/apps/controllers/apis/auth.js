const CustomerModel = require("../../models/customer")
const jwt = require("jsonwebtoken")
const config = require("config")
exports.loginCustomer =async (req,res)=>{
    try {
        const {body} = req
        const customer = await CustomerModel.findOne({email : body.email})
        const validPassword = customer.password === body.password;

        if(!customer){
            return res.status(401).json("Email not valid")
        }
        if(!validPassword){
            return res.status(401).json("Password not valid")
        }
        if(customer && validPassword){
            const accsessToken = jwt.sign(
                {
                    email : body.email,
                    password :  body.password,
                },
                config.get("app.jwtAccessKey"),
                {expiresIn: "1d"}
            )
            res.cookie("token", accsessToken)
            const {password, ...others} = customer._doc
            return res.status(200).json({customer:{...others,accsessToken}})
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}
exports.registerCustomers = async (req, res) => {
    try{
        const {body}= req
        const customer = await CustomerModel.findOne({email : body.email})
        if(customer){
            return res.status(401).json("Email is existing")
        }
        const isPhoneExists = await CustomerModel.findOne({phone : body.phone})
        if(isPhoneExists) {return res.status(401).json("Phone already exists")}
        const newCustomer = {
            fullName: body.fullName,
            email: body.email,
            password:  body.password,
            phone: body.phone,
            address: body.address,
        }
        await new CustomerModel(newCustomer).save()
        return res.status(201).json({status:"success", message:"Customer created successfully"})
    }
    catch(error){
        res.status(500).json(error)
    }
}