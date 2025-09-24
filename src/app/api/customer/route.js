import connectDB from "@/app/utils/connectDB"
import { NextResponse } from "next/server"
import Customer from "../../../../models/Customer"

export async function POST(req) {
    try {
        await connectDB()

        const body = await req.json()
        const data = body.data ?? body

        if (!data.name || !data.lastName || !data.email) return NextResponse.json({ status: 'failed', message: 'invalid data !' })

        try {
            const customer = await Customer.create(data)
            return NextResponse.json({ status: 'success', message: 'data created !', data: customer })
        } catch (error) {
            return NextResponse.json({ status: 'failed', message: 'error in network !' })
        }

    } catch (error) {
        return NextResponse.json({ status: 'failed', message: 'error in network !' })
    }
}