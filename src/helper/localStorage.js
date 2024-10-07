const localStorageHelper = {};

localStorageHelper.set = (key, value) => {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
};

localStorageHelper.get = (key) => {
    const value = localStorage.getItem(key);
    if (value === undefined) {
        return value;
    }
    try {
        return JSON.parse(value);
    } catch (e) {
        return value;
    }
};

localStorageHelper.clear = () => {
    localStorage.clear();
};

localStorageHelper.remove = (key) => {
    localStorage.removeItem(key);
};

export { localStorageHelper };
