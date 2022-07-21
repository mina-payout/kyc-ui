function handleResponse(e) {
    console.log('handleResponse', e);
}

const publicKey = '745b24a3850c4ca6b16255ff59289cd3'; // Public Key
const accessTokenURL = 'http://minakycservicedev-env.eba-zmicm36h.us-east-1.elasticbeanstalk.com/KYCService';
new TruliooClient({
    publicKey,
    accessTokenURL,
    handleResponse
});

setTimeout(() => {
    document.getElementById('loading-spinner').classList.add('d-none');
}, 4000);