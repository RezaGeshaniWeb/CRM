import connectDB from "@/app/utils/connectDB"
import Customer from "../../../../../models/Customer"
import { NextResponse } from "next/server"

export async function DELETE(req, context) {
    try {
        await connectDB()

        const params = await context.params
        const id = params.customerId

        try {
            await Customer.deleteOne({ _id: id })
            return NextResponse.json({ status: 'success', message: 'data deleted !' })

        } catch (error) {
            return NextResponse.json({ status: 'failed', message: 'error in network !' })
        }

    } catch (error) {
        return NextResponse.json({ status: 'failed', message: 'error in network !' })
    }
}


export async function PATCH(req, context) {
    try {
        await connectDB()

        const params = await context.params
        const id = params.customerId

        const body = await req.json()
        const data = body.data

        try {
            const customer = await Customer.findOne({ _id: id })
            customer.name = data.name
            customer.lastName = data.lastName
            customer.email = data.email
            customer.phoneNumber = data.phoneNumber
            customer.address = data.address
            customer.postalCode = data.postalCode
            customer.date = data.date
            customer.products = data.products
            customer.updatedAt = Date.now()
            customer.save()
            return NextResponse.json({ status: 'success', message: 'data edited !', data: customer })
        } catch (error) {
            return NextResponse.json({ status: 'failed', message: 'error in network !' })
        }

    } catch (error) {
        return NextResponse.json({ status: 'failed', message: 'error in network !' })
    }
}


export async function GET(req, context) {
    try {
        await connectDB()

        const params = await context.params
        const id = params.customerId

        try {
            const customer = await Customer.findOne({ _id: id })

            return NextResponse.json({ status: 'success', data: customer })

        } catch (error) {
            return NextResponse.json({ status: 'failed', message: 'error in network !' })
        }

    } catch (error) {
        return NextResponse.json({ status: 'failed', message: 'error in network !' })
    }
}