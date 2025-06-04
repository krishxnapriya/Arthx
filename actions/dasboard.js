"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
const serializeTransaction = (obj) => {
    const serialized = {...obj};
    
    if(obj.balance)
    {
        serialized.balance = obj.balance.toNumber();
    }

};
export async function createAccount(data){
    try{
        const{userId} = await auth();
        if(!userId) throw new Error("User not found");

        const user = await db.user.findUnique({
            where:{
                clerkUserId:userId
            },
        });
        if(!user) {throw new Error("User not found");}
        const balanceFloat = parseFloat(data.balance);
        if(isNaN(balanceFloat)) throw new Error("Invalid balance");
        const existingAccounts = await db.account.findMany({
            where:{
                userId:user.id,
            },
        });
        const shouldBedefault = existingAccounts.length === 0 ? true : data.isDefault;

        if(shouldBedefault)
        {
            await db.account.updateMany({
                where:{
                    userId:user.id, isDefault:true
                },
                data:{
                    isDefault:false
                },
            });
        }
        const account = await db.account.create({
            data:{
                ...data,
                userId:user.id,
                balance:balanceFloat,
                isDefault:shouldBedefault,
            },
        });
       const serializedaccount = serializeTransaction(account);
       revalidatePath("/dashboard");
       return {success:true, data:serializedaccount};
    }
    catch(error){
        throw new Error(error.message);
    }
}