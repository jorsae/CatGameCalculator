/**
 * Converts int to abbreviated number.
 * 1,005,123 => 1m, etc.
 */
export function intToString (num, fixed=0) {
    if (num === null) { return null; } // terminate early
    if (num === 0) { return '0'; } // terminate early
    fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
    var b = (num).toPrecision(2).split("e"), // get power
        k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
        c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3) ).toFixed(1 + fixed), // divide by power
        d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
        e = d + ['', 'k', 'm', 'b', 't'][k]; // append power
    return e;
}

/**
 * Helper function to convert minutes to more readable text
 */
export function convertMinutes(num){
    var d = Math.floor(num/1440); // 60*24
    var h = Math.floor((num-(d*1440))/60);
    var m = Math.round(num%60);

    var output = "";
    if(d > 0){
        output += d + " " + fixPlural(d, 'day') + ", ";
    }

    if(h > 0){
        output += h + " " + fixPlural(h, 'hour') + ", ";
    }

    if(m > 0){
        output += m + " min";
    }

    if(output.endsWith(", ")){
        return output.substring(0, output.length - 2);
    }

    return output === "" ? "N/A" : output;
}

/**
 * Function to fix singular/plural for convertMinutes
 */
function fixPlural(number, base){
    return number === 1 ? base : base.concat('s');
}

export function mapToJson(map){
    return JSON.stringify(Object.fromEntries(map));
}

export function jsonToMap(json){
    return new Map(Object.entries(JSON.parse(json)));
}