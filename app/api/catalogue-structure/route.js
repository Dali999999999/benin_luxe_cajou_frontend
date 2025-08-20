import { NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE_URL = 'https://benin-luxe-cajou-api.onrender.com';

export async function GET(request) {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/catalogue-structure`);
        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        const status = error.response ? error.response.status : 500;
        const data = error.response ? error.response.data : { message: 'An unexpected error occurred' };
        return NextResponse.json(data, { status });
    }
}
