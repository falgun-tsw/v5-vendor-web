
function Amount(props) {
    const { value, decimal = 2, currency = '' } = props
    //decimal=0 for integer

    if (!value) {
        return ''
    }
    const parsedValue = parseFloat(value) ? parseFloat(value).toFixed(decimal) : '0'; 
    return `${currency} ${parsedValue}`;
}


export default Amount;