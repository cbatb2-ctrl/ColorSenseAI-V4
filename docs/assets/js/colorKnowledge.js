// ==========================================
// ColorSense AI
// Color Knowledge Base
// Version 4.0.3A
// ==========================================

const COLOR_KNOWLEDGE = {

    // ======================================
    // สีขั้นที่ 1
    // ======================================

    primary: {

        red: {
            name: "แดง",
            emoji: "🔴",
            hue: 0
        },

        yellow: {
            name: "เหลือง",
            emoji: "🟡",
            hue: 60
        },

        blue: {
            name: "น้ำเงิน",
            emoji: "🔵",
            hue: 240
        }

    },


    // ======================================
    // สีขั้นที่ 2
    // ======================================

    secondary: {

        orange: {
            name: "ส้ม",
            emoji: "🟠",
            hue: 30,

            mix: [
                "แดง",
                "เหลือง"
            ]
        },

        green: {
            name: "เขียว",
            emoji: "🟢",
            hue: 120,

            mix: [
                "เหลือง",
                "น้ำเงิน"
            ]
        },

        purple: {
            name: "ม่วง",
            emoji: "🟣",
            hue: 300,

            mix: [
                "น้ำเงิน",
                "แดง"
            ]
        }

    },


    // ======================================
    // สีขั้นที่ 3
    // ======================================

    tertiary: {

        redOrange: {
            name: "ส้มแดง",
            emoji: "🟠🔴",
            hue: 15,

            mix: [
                "แดง",
                "ส้ม"
            ],

            neighbors: [
                "แดง",
                "ส้ม"
            ]
        },

        yellowOrange: {
            name: "ส้มเหลือง",
            emoji: "🟠🟡",
            hue: 45,

            mix: [
                "ส้ม",
                "เหลือง"
            ],

            neighbors: [
                "ส้ม",
                "เหลือง"
            ]
        },

        yellowGreen: {
            name: "เขียวเหลือง",
            emoji: "🟢🟡",
            hue: 90,

            mix: [
                "เหลือง",
                "เขียว"
            ],

            neighbors: [
                "เหลือง",
                "เขียว"
            ]
        },

        blueGreen: {
            name: "เขียวน้ำเงิน",
            emoji: "🟢🔵",
            hue: 180,

            mix: [
                "เขียว",
                "น้ำเงิน"
            ],

            neighbors: [
                "เขียว",
                "น้ำเงิน"
            ]
        },

        bluePurple: {
            name: "ม่วงน้ำเงิน",
            emoji: "🟣🔵",
            hue: 270,

            mix: [
                "น้ำเงิน",
                "ม่วง"
            ],

            neighbors: [
                "น้ำเงิน",
                "ม่วง"
            ]
        },

        redPurple: {
            name: "ม่วงแดง",
            emoji: "🟣🔴",
            hue: 330,

            mix: [
                "ม่วง",
                "แดง"
            ],

            neighbors: [
                "ม่วง",
                "แดง"
            ]
        }

    },


    // ======================================
    // สีคู่ตรงข้าม
    // ======================================

    complementary: {

        "แดง": "เขียว",
        "เขียว": "แดง",

        "ส้ม": "น้ำเงิน",
        "น้ำเงิน": "ส้ม",

        "เหลือง": "ม่วง",
        "ม่วง": "เหลือง",

        "ส้มแดง": "เขียวน้ำเงิน",
        "เขียวน้ำเงิน": "ส้มแดง",

        "ส้มเหลือง": "ม่วงน้ำเงิน",
        "ม่วงน้ำเงิน": "ส้มเหลือง",

        "เขียวเหลือง": "ม่วงแดง",
        "ม่วงแดง": "เขียวเหลือง"

    },


    // ======================================
    // สีข้างเคียง
    // ======================================

    adjacent: {

        "แดง": [
            "ม่วงแดง",
            "ส้มแดง"
        ],

        "ส้มแดง": [
            "แดง",
            "ส้ม"
        ],

        "ส้ม": [
            "ส้มแดง",
            "ส้มเหลือง"
        ],

        "ส้มเหลือง": [
            "ส้ม",
            "เหลือง"
        ],

        "เหลือง": [
            "ส้มเหลือง",
            "เขียวเหลือง"
        ],

        "เขียวเหลือง": [
            "เหลือง",
            "เขียว"
        ],

        "เขียว": [
            "เขียวเหลือง",
            "เขียวน้ำเงิน"
        ],

        "เขียวน้ำเงิน": [
            "เขียว",
            "น้ำเงิน"
        ],

        "น้ำเงิน": [
            "เขียวน้ำเงิน",
            "ม่วงน้ำเงิน"
        ],

        "ม่วงน้ำเงิน": [
            "น้ำเงิน",
            "ม่วง"
        ],

        "ม่วง": [
            "ม่วงน้ำเงิน",
            "ม่วงแดง"
        ],

        "ม่วงแดง": [
            "ม่วง",
            "แดง"
        ]

    }

};


// ==========================================
// ค้นหาข้อมูลสี
// ==========================================

function findColorKnowledge(colorName) {

    if (!colorName) {
        return null;
    }


    if (COLOR_KNOWLEDGE.primary[colorName]) {
        return COLOR_KNOWLEDGE.primary[colorName];
    }


    if (COLOR_KNOWLEDGE.secondary[colorName]) {
        return COLOR_KNOWLEDGE.secondary[colorName];
    }


    if (COLOR_KNOWLEDGE.tertiary[colorName]) {
        return COLOR_KNOWLEDGE.tertiary[colorName];
    }


    return null;
}


// ==========================================
// หาสีคู่ตรงข้าม
// ==========================================

function getComplementaryColor(colorName) {

    if (!colorName) {
        return null;
    }

    return COLOR_KNOWLEDGE.complementary[colorName]
        || null;
}


// ==========================================
// หาสีข้างเคียง
// ==========================================

function getAdjacentColors(colorName) {

    if (!colorName) {
        return [];
    }

    return COLOR_KNOWLEDGE.adjacent[colorName]
        || [];
}
// ==========================================
// ColorSense AI V4.1
// Master Color Calibration — 12 Color Wheel
// ==========================================

const COLOR_CALIBRATION_12 = {

    "แดง": {
        type: "primary",
        rgb: { r: 255, g: 0, b: 0 }
    },

    "ม่วงแดง": {
        type: "tertiary",
        rgb: { r: 204, g: 0, b: 153 }
    },

    "ม่วง": {
        type: "secondary",
        rgb: { r: 153, g: 0, b: 153 }
    },

    "ม่วงน้ำเงิน": {
        type: "tertiary",
        rgb: { r: 102, g: 0, b: 153 }
    },

    "น้ำเงิน": {
        type: "primary",
        rgb: { r: 0, g: 51, b: 255 }
    },

    "เขียวน้ำเงิน": {
        type: "tertiary",
        rgb: { r: 0, g: 102, b: 0 }
    },

    "เขียว": {
        type: "secondary",
        rgb: { r: 0, g: 153, b: 0 }
    },

    "เขียวเหลือง": {
        type: "tertiary",
        rgb: { r: 102, g: 204, b: 0 }
    },

    "เหลือง": {
        type: "primary",
        rgb: { r: 255, g: 255, b: 0 }
    },

    "ส้มเหลือง": {
        type: "tertiary",
        rgb: { r: 255, g: 204, b: 0 }
    },

    "ส้ม": {
        type: "secondary",
        rgb: { r: 255, g: 153, b: 0 }
    },

    "ส้มแดง": {
        type: "tertiary",
        rgb: { r: 255, g: 102, b: 0 }
    }

};
// ==========================================
// ColorSense AI V4.1
// STEP 1.2.3
// Find Nearest Calibrated Color
// ==========================================

function getNearestCalibratedColor(r, g, b) {

    let nearestColor = null;
    let smallestDistance = Infinity;

    for (const colorName in COLOR_CALIBRATION_12) {

        const calibrated =
            COLOR_CALIBRATION_12[colorName];

        const cr = calibrated.rgb.r;
        const cg = calibrated.rgb.g;
        const cb = calibrated.rgb.b;

        const distance = Math.sqrt(
            Math.pow(r - cr, 2) +
            Math.pow(g - cg, 2) +
            Math.pow(b - cb, 2)
        );

        if (distance < smallestDistance) {

            smallestDistance = distance;
            nearestColor = colorName;

        }

    }

    return {

        color: nearestColor,

        distance: smallestDistance

    };

}
// ==========================================
// RGB → HSV
// ==========================================

function rgbToHSV(r, g, b) {

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    const delta = max - min;

    let h = 0;

    // ------------------------------
    // Hue
    // ------------------------------

    if (delta !== 0) {

        if (max === r) {

            h = 60 * (
                ((g - b) / delta) % 6
            );

        }

        else if (max === g) {

            h = 60 * (
                ((b - r) / delta) + 2
            );

        }

        else {

            h = 60 * (
                ((r - g) / delta) + 4
            );

        }

    }

    if (h < 0) {
        h += 360;
    }


    // ------------------------------
    // Saturation
    // ------------------------------

    const s =
        max === 0
            ? 0
            : delta / max;


    // ------------------------------
    // Brightness / Value
    // ------------------------------

    const v = max;


    return {

        h: h,
        s: s,
        v: v

    };

}
// ==========================================
// วิเคราะห์ชื่อสีจาก RGB
// Hue + Saturation + Brightness
// ==========================================

function getColorNameFromRGB(r, g, b) {

    const hsv = rgbToHSV(r, g, b);

    const hue = hsv.h;
    const saturation = hsv.s;
    const brightness = hsv.v;


    // ======================================
    // สีไม่มีความอิ่มตัวมาก
    // ======================================

    if (saturation < 0.10) {

        if (brightness > 0.90) {
            return "ขาว";
        }

        if (brightness < 0.20) {
            return "ดำ";
        }

        return "เทา";

    }


    // ======================================
    // สีอ่อนมาก
    // ======================================

    if (brightness > 0.80 && saturation < 0.40) {

        // ชมพู
        if (hue >= 315 || hue < 15) {
            return "ชมพู";
        }

        // ฟ้าอ่อน
        if (hue >= 180 && hue < 250) {
            return "ฟ้าอ่อน";
        }

        // เขียวอ่อน
        if (hue >= 90 && hue < 160) {
            return "เขียวอ่อน";
        }

        // เหลืองอ่อน
        if (hue >= 40 && hue < 90) {
            return "เหลืองอ่อน";
        }

        // ส้มอ่อน
        if (hue >= 15 && hue < 40) {
            return "ส้มอ่อน";
        }

        // ม่วงอ่อน
        if (hue >= 250 && hue < 315) {
            return "ม่วงอ่อน";
        }

    }


    // ======================================
    // สีชมพู
    // ======================================

    if (
        hue >= 315 &&
        hue < 350 &&
        brightness > 0.65
    ) {

        return "ชมพู";

    }
// ==========================================
// V4.1 STEP 1.2.4
// Master Calibration 12 Colors
// ==========================================

const calibratedColor =
    getNearestCalibratedColor(
        r,
        g,
        b
    );

console.log(
    "🎨 Calibrated Color:",
    calibratedColor
);

return calibratedColor.color;

}