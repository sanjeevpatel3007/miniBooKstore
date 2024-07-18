import User from "../modal/user.modal.js";
import bcryptjs from "bcryptjs";

export const signup=async (req,res)=>{
    try {
        const {fullname ,email,password}=req.body;
const user=await User.findOne({email})
if(user){
    // alert("User allready exist")

    return res.status(400).json({message:"User already exist"})
}

const hashedPassword=await bcryptjs.hash(password,10)
const createdUser =new User({
    fullname:fullname,
    email:email,
    password:hashedPassword
})
await createdUser.save()
res.status(200).json({message:"User created successfully "})
    } catch (error) {
        console.log("error : "+ error.message)
        res.status(500).json({ message :" internal server error"})
    }
   
}

export const login=async (req,res)=>{
try {
    const {email,password}=req.body;
    const user=await User.findOne({email})
// const isMatch=await bcryptjs.compare(password,user.password)
const isMatch = await bcryptjs.compare(password, user.password);

if(!isMatch || !user){
    return res.status(400).json({message:"Invalid user nmae or password"})
}
else{
    res.status(200).json({message: "login successfull...!",user: {
        _id:user,
        fullname:user.fullname,
        email:user.email
        
    }})

}

} catch (error) {
    console.log("error : "+ error.message)
    res.status(500).json({ message :" Please enter valid email id  and password "})
}
}