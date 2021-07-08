import express, { Router } from "express"
const router: Router = Router()
router.post("/",(req : express.Request , res: express.Response)=>{
    console.log(req.body);
})
    

export default router;