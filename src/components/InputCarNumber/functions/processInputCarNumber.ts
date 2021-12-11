export function processInputCarNumber(
    value: string,
    onChange: any,
    regionInputRef: any,
) {
    if (value.length === 0) {
        onChange(value);
    } else if (value.length === 1) {
        if (/^[АВЕКМНОРСТУХ]*$/.test(value)) {
            onChange(value);
        }
    } else if (value.length === 2) {
        const cut1 = value.slice(0, 1);
        const cut2 = value.slice(1, 2);
        if (/^[АВЕКМНОРСТУХ]*$/.test(cut1) && /^[0-9]*$/.test(cut2)) {
            onChange(value);
        }
    } else if (value.length === 3) {
        const cut1 = value.slice(0, 1);
        const cut2 = value.slice(1, 2);
        const cut3 = value.slice(2, 3);
        if (
            /^[АВЕКМНОРСТУХ]*$/.test(cut1) &&
            /^[0-9]*$/.test(cut2) &&
            /^[0-9]*$/.test(cut3)
        ) {
            onChange(value);
        }
    } else if (value.length === 4) {
        const cut1 = value.slice(0, 1);
        const cut2 = value.slice(1, 2);
        const cut3 = value.slice(2, 3);
        const cut4 = value.slice(3, 4);
        if (
            (/^[АВЕКМНОРСТУХ]*$/.test(cut1) &&
                /^[0]*$/.test(cut2) &&
                /^[0]*$/.test(cut3) &&
                /^[1-9]*$/.test(cut4)) ||
            (/^[АВЕКМНОРСТУХ]*$/.test(cut1) &&
                /^[0]*$/.test(cut2) &&
                /^[1-9]*$/.test(cut3) &&
                /^[1-9]*$/.test(cut4)) ||
            (/^[АВЕКМНОРСТУХ]*$/.test(cut1) &&
                /^[0]*$/.test(cut2) &&
                /^[1-9]*$/.test(cut3) &&
                /^[0]*$/.test(cut4)) ||
            (/^[АВЕКМНОРСТУХ]*$/.test(cut1) &&
                /^[1-9]*$/.test(cut2) &&
                /^[0]*$/.test(cut3) &&
                /^[0]*$/.test(cut4)) ||
            (/^[АВЕКМНОРСТУХ]*$/.test(cut1) &&
                /^[1-9]*$/.test(cut2) &&
                /^[1-9]*$/.test(cut3) &&
                /^[0]*$/.test(cut4)) ||
            (/^[АВЕКМНОРСТУХ]*$/.test(cut1) &&
                /^[1-9]*$/.test(cut2) &&
                /^[1-9]*$/.test(cut3) &&
                /^[1-9]*$/.test(cut4))
        ) {
            onChange(value);
        }
    } else if (value.length === 5) {
        const cut1 = value.slice(0, 1);
        const cut2 = value.slice(1, 2);
        const cut3 = value.slice(2, 3);
        const cut4 = value.slice(3, 4);
        const cut5 = value.slice(4, 5);
        if (
            (/^[АВЕКМНОРСТУХ]*$/.test(cut1) &&
                /^[0]*$/.test(cut2) &&
                /^[0]*$/.test(cut3) &&
                /^[1-9]*$/.test(cut4) &&
                /^[АВЕКМНОРСТУХ]*$/.test(cut5)) ||
            (/^[АВЕКМНОРСТУХ]*$/.test(cut1) &&
                /^[0]*$/.test(cut2) &&
                /^[1-9]*$/.test(cut3) &&
                /^[1-9]*$/.test(cut4) &&
                /^[АВЕКМНОРСТУХ]*$/.test(cut5)) ||
            (/^[АВЕКМНОРСТУХ]*$/.test(cut1) &&
                /^[0]*$/.test(cut2) &&
                /^[1-9]*$/.test(cut3) &&
                /^[0О]*$/.test(cut4) &&
                /^[АВЕКМНОРСТУХ]*$/.test(cut5)) ||
            (/^[АВЕКМНОРСТУХ]*$/.test(cut1) &&
                /^[1-9]*$/.test(cut2) &&
                /^[0]*$/.test(cut3) &&
                /^[0]*$/.test(cut4) &&
                /^[АВЕКМНОРСТУХ]*$/.test(cut5)) ||
            (/^[АВЕКМНОРСТУХ]*$/.test(cut1) &&
                /^[1-9]*$/.test(cut2) &&
                /^[1-9]*$/.test(cut3) &&
                /^[0]*$/.test(cut4) &&
                /^[АВЕКМНОРСТУХ]*$/.test(cut5)) ||
            (/^[АВЕКМНОРСТУХ]*$/.test(cut1) &&
                /^[1-9]*$/.test(cut2) &&
                /^[1-9]*$/.test(cut3) &&
                /^[1-9]*$/.test(cut4) &&
                /^[АВЕКМНОРСТУХ]*$/.test(cut5))
        ) {
            onChange(value);
        }
    } else if (value.length === 6) {
        const cut1 = value.slice(0, 1);
        const cut2 = value.slice(1, 2);
        const cut3 = value.slice(2, 3);
        const cut4 = value.slice(3, 4);
        const cut5 = value.slice(4, 5);
        const cut6 = value.slice(5, 6);
        if (
            (/^[АВЕКМНОРСТУХ]*$/.test(cut1) &&
                /^[0]*$/.test(cut2) &&
                /^[0]*$/.test(cut3) &&
                /^[1-9]*$/.test(cut4) &&
                /^[АВЕКМНОРСТУХ]*$/.test(cut5) &&
                /^[АВЕКМНОРСТУХ]*$/.test(cut6)) ||
            (/^[АВЕКМНОРСТУХ]*$/.test(cut1) &&
                /^[0]*$/.test(cut2) &&
                /^[1-9]*$/.test(cut3) &&
                /^[1-9]*$/.test(cut4) &&
                /^[АВЕКМНОРСТУХ]*$/.test(cut5) &&
                /^[АВЕКМНОРСТУХ]*$/.test(cut6)) ||
            (/^[АВЕКМНОРСТУХ]*$/.test(cut1) &&
                /^[0]*$/.test(cut2) &&
                /^[1-9]*$/.test(cut3) &&
                /^[0]*$/.test(cut4) &&
                /^[АВЕКМНОРСТУХ]*$/.test(cut5) &&
                /^[АВЕКМНОРСТУХ]*$/.test(cut6)) ||
            (/^[АВЕКМНОРСТУХ]*$/.test(cut1) &&
                /^[1-9]*$/.test(cut2) &&
                /^[0]*$/.test(cut3) &&
                /^[0]*$/.test(cut4) &&
                /^[АВЕКМНОРСТУХ]*$/.test(cut5) &&
                /^[АВЕКМНОРСТУХ]*$/.test(cut6)) ||
            (/^[АВЕКМНОРСТУХ]*$/.test(cut1) &&
                /^[1-9]*$/.test(cut2) &&
                /^[1-9]*$/.test(cut3) &&
                /^[0]*$/.test(cut4) &&
                /^[АВЕКМНОРСТУХ]*$/.test(cut5) &&
                /^[АВЕКМНОРСТУХ]*$/.test(cut6)) ||
            (/^[АВЕКМНОРСТУХ0]*$/.test(cut1) &&
                /^[1-9]*$/.test(cut2) &&
                /^[1-9]*$/.test(cut3) &&
                /^[1-9]*$/.test(cut4) &&
                /^[АВЕКМНОРСТУХ]*$/.test(cut5) &&
                /^[АВЕКМНОРСТУХ]*$/.test(cut6))
        ) {
            regionInputRef.current.focus();
            onChange(value);
        }
    }
}
