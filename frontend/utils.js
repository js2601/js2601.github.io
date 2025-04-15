
async function fetchBalance() {
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.error('No JWT found');
      return;
    }

    try {
      const res = await fetch('https://js2601githubio-production.up.railway.app/api', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (res.ok) {
        console.log('Credits:', credits);
        return parseFloat(data.balance);
      } else {
        console.error('API error:', data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
}

async function updateBalance(amount) {
    const token = localStorage.getItem('jwt');
    if (!token) {
        console.error('No JWT found');
        return;
    }

    try {
        const res = await fetch('https://js2601githubio-production.up.railway.app/api', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
        });

        const data = await res.json();
        if (res.ok) {
        console.log(`Balance updated to ${amount}`, data);
        } else {
        console.error('Update failed:', data);
        }
    } catch (err) {
        console.error('Fetch error:', err);
    }
}

