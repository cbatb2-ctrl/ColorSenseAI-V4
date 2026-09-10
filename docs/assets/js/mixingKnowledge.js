// ==========================================
// ColorSense AI
// Mixing Knowledge Base
// Version 4.0.4A
// ==========================================
//
// ฐานความรู้การผสมสีโปสเตอร์
//
// หลักการสำคัญ
// 1. แม่สี = แดง เหลือง น้ำเงิน
// 2. สีขั้นที่ 2 = แม่สี + แม่สี 50:50
// 3. สีขั้นที่ 3 = สีขั้นที่ 2 + แม่สี 50:50
// 4. สีอ่อน = สีฐาน + สีขาว
// 5. สีหม่น = สีฐาน + สีคู่ตรงข้ามเล็กน้อย
//
// หมายเหตุ:
// อัตราส่วน 50:50 เป็นหลักการสำหรับการเรียนการสอน
// ไม่ใช่การบังคับค่า RGB ให้เป็นค่าเฉลี่ย
// ==========================================


const MIXING_KNOWLEDGE = {

    // ======================================
    // สีขั้นที่ 1
    // ======================================

    primary: {

        "แดง": {
            ingredients: ["แดง"],
            type: "primary"
        },

        "เหลือง": {
            ingredients: ["เหลือง"],
            type: "primary"
        },

        "น้ำเงิน": {
            ingredients: ["น้ำเงิน"],
            type: "primary"
        }

    },


    // ======================================
    // สีขั้นที่ 2
    // ======================================

    secondary: {

        "ส้ม": {
            ingredients: ["แดง", "เหลือง"],
            ratio: [50, 50],
            type: "secondary"
        },

        "เขียว": {
            ingredients: ["เหลือง", "น้ำเงิน"],
            ratio: [50, 50],
            type: "secondary"
        },

        "ม่วง": {
            ingredients: ["แดง", "น้ำเงิน"],
            ratio: [50, 50],
            type: "secondary"
        }

    },


    // ======================================
    // สีขั้นที่ 3
    // ======================================

    tertiary: {

        "ส้มแดง": {
            ingredients: ["แดง", "ส้ม"],
            ratio: [50, 50],
            type: "tertiary"
        },

        "ส้มเหลือง": {
            ingredients: ["ส้ม", "เหลือง"],
            ratio: [50, 50],
            type: "tertiary"
        },

        "เขียวเหลือง": {
            ingredients: ["เหลือง", "เขียว"],
            ratio: [50, 50],
            type: "tertiary"
        },

        "เขียวน้ำเงิน": {
            ingredients: ["เขียว", "น้ำเงิน"],
            ratio: [50, 50],
            type: "tertiary"
        },

        "ม่วงน้ำเงิน": {
            ingredients: ["น้ำเงิน", "ม่วง"],
            ratio: [50, 50],
            type: "tertiary"
        },

        "ม่วงแดง": {
            ingredients: ["ม่วง", "แดง"],
            ratio: [50, 50],
            type: "tertiary"
        }

    },


    // ======================================
    // สีอ่อน
    // ======================================

    lightColors: {

        "ชมพู": {
            base: "แดง",
            modifier: "ขาว",
            purpose: "เพิ่มความสว่าง",
            type: "light"
        },

        "ฟ้าอ่อน": {
            base: "น้ำเงิน",
            modifier: "ขาว",
            purpose: "เพิ่มความสว่าง",
            type: "light"
        },

        "เขียวอ่อน": {
            base: "เขียว",
            modifier: "ขาว",
            purpose: "เพิ่มความสว่าง",
            type: "light"
        },

        "เหลืองอ่อน": {
            base: "เหลือง",
            modifier: "ขาว",
            purpose: "เพิ่มความสว่าง",
            type: "light"
        },

        "ส้มอ่อน": {
            base: "ส้ม",
            modifier: "ขาว",
            purpose: "เพิ่มความสว่าง",
            type: "light"
        },

        "ม่วงอ่อน": {
            base: "ม่วง",
            modifier: "ขาว",
            purpose: "เพิ่มความสว่าง",
            type: "light"
        }

    },


    // ======================================
    // การทำสีหม่น
    // ======================================

    muted: {

        "แดงหม่น": {
            base: "แดง",
            modifier: "เขียว",
            purpose: "ลดความสด"
        },

        "ส้มหม่น": {
            base: "ส้ม",
            modifier: "น้ำเงิน",
            purpose: "ลดความสด"
        },

        "เหลืองหม่น": {
            base: "เหลือง",
            modifier: "ม่วง",
            purpose: "ลดความสด"
        },

        "เขียวหม่น": {
            base: "เขียว",
            modifier: "แดง",
            purpose: "ลดความสด"
        },

        "น้ำเงินหม่น": {
            base: "น้ำเงิน",
            modifier: "ส้ม",
            purpose: "ลดความสด"
        },

        "ม่วงหม่น": {
            base: "ม่วง",
            modifier: "เหลือง",
            purpose: "ลดความสด"
        }

    }

};


// ==========================================
// ค้นหาสูตรการผสมสี
// ==========================================

function findMixingKnowledge(colorName) {

    if (!colorName) {
        return null;
    }

    if (MIXING_KNOWLEDGE.primary[colorName]) {
        return MIXING_KNOWLEDGE.primary[colorName];
    }

    if (MIXING_KNOWLEDGE.secondary[colorName]) {
        return MIXING_KNOWLEDGE.secondary[colorName];
    }

    if (MIXING_KNOWLEDGE.tertiary[colorName]) {
        return MIXING_KNOWLEDGE.tertiary[colorName];
    }

    if (MIXING_KNOWLEDGE.lightColors[colorName]) {
        return MIXING_KNOWLEDGE.lightColors[colorName];
    }

    if (MIXING_KNOWLEDGE.muted[colorName]) {
        return MIXING_KNOWLEDGE.muted[colorName];
    }

    return null;
}


// ==========================================
// ตรวจสอบว่าเป็นสีอ่อนหรือไม่
// ==========================================

function isLightColor(colorName) {

    return Boolean(
        colorName &&
        MIXING_KNOWLEDGE.lightColors[colorName]
    );

}


// ==========================================
// ตรวจสอบว่าเป็นสีหม่นหรือไม่
// ==========================================

function isMutedColor(colorName) {

    return Boolean(
        colorName &&
        MIXING_KNOWLEDGE.muted[colorName]
    );

}


// ==========================================
// ดึงส่วนผสมหลัก
// ==========================================

function getMixingIngredients(colorName) {

    const knowledge =
        findMixingKnowledge(colorName);

    if (!knowledge) {
        return [];
    }

    if (knowledge.ingredients) {
        return knowledge.ingredients;
    }

    if (knowledge.base) {
        return [
            knowledge.base,
            knowledge.modifier
        ];
    }

    return [];

}


// ==========================================
// ดึงอัตราส่วน
// ==========================================

function getMixingRatio(colorName) {

    const knowledge =
        findMixingKnowledge(colorName);

    if (!knowledge) {
        return null;
    }

    return knowledge.ratio || null;

}
// ==========================================
// ColorSense AI
// Mixing Knowledge Helper
// Version 4.0.4B
// ==========================================


// ==========================================
// ตรวจสอบว่าสีมีสูตรการผสมหรือไม่
// ==========================================

function hasMixingKnowledge(colorName) {

    return !!findMixingKnowledge(colorName);

}


// ==========================================
// สร้างข้อความสูตรการผสม
// ==========================================
// ==========================================
// สร้างคำอธิบายสูตรการผสมสี
// ==========================================

function getMixingDescription(colorName) {

    const knowledge =
        findMixingKnowledge(colorName);

    if (!knowledge) {
        return null;
    }


    // ======================================
    // รูปแบบที่ 1
    // ingredients
    // เช่น แดง + เหลือง
    // ======================================

    if (
        Array.isArray(knowledge.ingredients) &&
        knowledge.ingredients.length > 0
    ) {

        return knowledge.ingredients.join(" + ");

    }


    // ======================================
    // รูปแบบที่ 2
    // base + modifier
    // เช่น แดง + ขาว
    // ======================================

    if (
        knowledge.base &&
        knowledge.modifier
    ) {

        return (
            `${knowledge.base} + ` +
            `${knowledge.modifier}`
        );

    }


    // ======================================
    // ไม่พบสูตร
    // ======================================

    return null;

}