// http://127.0.0.1:5000/storage/KT1CZ2S9eSM8csf5Cnv7TZs7EnbqMGYnAxFv

const rpcStorage = (address) => {
    return fetch(`http://127.0.0.1:5000/storage/${address}`)
};

export default rpcStorage;