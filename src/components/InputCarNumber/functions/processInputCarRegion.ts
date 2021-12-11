export function processInputCarRegion(v: string, onChange: any) {
    if (v.length === 0) {
        onChange(v);
    } else if (v.length === 1) {
        if (/^[0-9]*$/.test(v)) {
            onChange(v);
        }
    } else if (v.length === 2) {
        const cut1 = v.slice(0, 1);
        const cut2 = v.slice(1, 2);
        // 0*
        if (/^[0]*$/.test(cut1) && /^[1-9]*$/.test(cut2)) {
            onChange(v);
        }
        // 2*
        else if (/^[2]*$/.test(cut1) && /^[1-9]*$/.test(cut2)) {
            onChange(v);
        }
        // 1*, 3*, 4*, 5*, 6*, 7*, 8*, 9*
        else if (/^[13-9]*$/.test(cut1) && /^[0-9]*$/.test(cut2)) {
            onChange(v);
        }
    } else if (v.length === 3) {
        const cut1 = v.slice(0, 1);
        const cut2 = v.slice(1, 2);
        const cut3 = v.slice(2, 3);
        // 10*
        if (/^[1]*$/.test(cut1) && /^[0]*$/.test(cut2) && /^[2]*$/.test(cut3)) {
            onChange(v);
        }
        // 11*
        else if (
            /^[1]*$/.test(cut1) &&
            /^[1]*$/.test(cut2) &&
            /^[136]*$/.test(cut3)
        ) {
            onChange(v);
        }
        // 12*
        else if (
            /^[1]*$/.test(cut1) &&
            /^[2]*$/.test(cut2) &&
            /^[123456]*$/.test(cut3)
        ) {
            onChange(v);
        }
        // 13*
        else if (
            /^[1]*$/.test(cut1) &&
            /^[3]*$/.test(cut2) &&
            /^[468]*$/.test(cut3)
        ) {
            onChange(v);
        }
        // 14*
        else if (
            /^[1]*$/.test(cut1) &&
            /^[4]*$/.test(cut2) &&
            /^[2]*$/.test(cut3)
        ) {
            onChange(v);
        }
        // 15*
        else if (
            /^[1]*$/.test(cut1) &&
            /^[5]*$/.test(cut2) &&
            /^[02469]*$/.test(cut3)
        ) {
            onChange(v);
        }
        // 16*
        else if (
            /^[1]*$/.test(cut1) &&
            /^[6]*$/.test(cut2) &&
            /^[134]*$/.test(cut3)
        ) {
            onChange(v);
        }
        // 17*
        else if (
            /^[1]*$/.test(cut1) &&
            /^[7]*$/.test(cut2) &&
            /^[3478]*$/.test(cut3)
        ) {
            onChange(v);
        }
        // 18*
        else if (
            /^[1]*$/.test(cut1) &&
            /^[8]*$/.test(cut2) &&
            /^[6]*$/.test(cut3)
        ) {
            onChange(v);
        }
        // 19*
        else if (
            /^[1]*$/.test(cut1) &&
            /^[9]*$/.test(cut2) &&
            /^[036789]*$/.test(cut3)
        ) {
            onChange(v);
        }
        // 27*
        else if (
            /^[2]*$/.test(cut1) &&
            /^[7]*$/.test(cut2) &&
            /^[78]*$/.test(cut3)
        ) {
            onChange(v);
        }
        // 33*
        else if (
            /^[3]*$/.test(cut1) &&
            /^[3]*$/.test(cut2) &&
            /^[03]*$/.test(cut3)
        ) {
            onChange(v);
        }
        // 44*
        else if (
            /^[4]*$/.test(cut1) &&
            /^[4]*$/.test(cut2) &&
            /^[4]*$/.test(cut3)
        ) {
            onChange(v);
        }
        // 66*
        else if (
            /^[6]*$/.test(cut1) &&
            /^[6]*$/.test(cut2) &&
            /^[2]*$/.test(cut3)
        ) {
            onChange(v);
        }
        // 70*
        else if (
            /^[7]*$/.test(cut1) &&
            /^[0]*$/.test(cut2) &&
            /^[2]*$/.test(cut3)
        ) {
            onChange(v);
        }
        // 71*
        else if (
            /^[7]*$/.test(cut1) &&
            /^[1]*$/.test(cut2) &&
            /^[6]*$/.test(cut3)
        ) {
            onChange(v);
        }
        // 75*
        else if (
            /^[7]*$/.test(cut1) &&
            /^[5]*$/.test(cut2) &&
            /^[0]*$/.test(cut3)
        ) {
            onChange(v);
        }
        // 76*
        else if (
            /^[7]*$/.test(cut1) &&
            /^[6]*$/.test(cut2) &&
            /^[13]*$/.test(cut3)
        ) {
            onChange(v);
        }
        // 77*
        else if (
            /^[7]*$/.test(cut1) &&
            /^[7]*$/.test(cut2) &&
            /^[478]*$/.test(cut3)
        ) {
            onChange(v);
        }
        // 79*
        else if (
            /^[7]*$/.test(cut1) &&
            /^[9]*$/.test(cut2) &&
            /^[079]*$/.test(cut3)
        ) {
            onChange(v);
        }
        // 99*
        else if (
            /^[9]*$/.test(cut1) &&
            /^[9]*$/.test(cut2) &&
            /^[059]*$/.test(cut3)
        ) {
            onChange(v);
        }
    }
}
