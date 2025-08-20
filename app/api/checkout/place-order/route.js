import { NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE_URL = 'https://benin-luxe-cajou-api.onrender.com';

export async function POST(request) {
    const token = request.headers.get('Authorization');
    if (!token) {
        return NextResponse.json({ message: 'Authorization required' }, { status: 401 });
    }

    let payload;
    try {
        payload = await request.json();
    } catch (error) {
        return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/api/checkout/place-order`, payload, {
            headers: {
                'Content-Type': 'application/json',
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
