
async function testApi() {
    try {
        console.log('Testing /restaurants/most-reserved...');
        const res = await fetch('http://localhost:3000/restaurants/most-reserved');
        console.log('Status: ' + res.status + ' ' + res.statusText);
        const text = await res.text();

        if (res.status !== 200) {
            console.log('Error Body:', text);
            return;
        }

        try {
            const data = JSON.parse(text);
            console.log('Count: ' + data.length);
            if (data.length > 0) {
                console.log('First Item Keys:', Object.keys(data[0]));
                console.log('First Item:', JSON.stringify(data[0], null, 2));
            }
        } catch (e) {
            console.log('JSON Parse Error:', e);
        }
    } catch (e) {
        console.error('Error:', e);
    }
}

testApi();
