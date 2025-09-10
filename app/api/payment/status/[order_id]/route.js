import { NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE_URL = process.env.API_URL_INTERNAL || 'http://127.0.0.1:5000';

export async function GET(request, { params }) {
    const orderId = params.order_id;
    const token = request.headers.get('Authorization');

    if (!token) {
        return NextResponse.json({ message: 'Authorization required' }, { status: 401 });
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/api/payment/status/${orderId}`, {
            headers: {
                'Authorization': token
            }
        });
        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        const status = error.response ? error.response.status : 500;
        const data = error.response ? error.response.data : { message: 'An unexpected error occurred' };
        return NextResponse.json(data, { status });
    }
}
