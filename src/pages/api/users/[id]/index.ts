import { NextApiRequest, NextApiResponse } from "next";
import mongo from "@/lib/mongo";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "DELETE") {
        const id = req.query.id?.toString()
        await mongo.db().collection("User").deleteOne({_id: new ObjectId(id)})
        res.status(200).send("Success");
    }
    if (req.method == "PATCH") {
        const id = req.query.id?.toString()
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        console.log(id)
        await mongo.db().collection("User").updateOne({_id: new ObjectId(id)}, {
            $set: {
                email: req.body.email,
                password: hash,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            
        }
        })
        res.status(200).send("Success");    
    }
}