// ==========================================
// ตรวจสอบความพร้อมของ Mixing Knowledge
// ==========================================

function isMixingDecisionReady() {

    return (
        typeof findMixingKnowledge === "function"
    );

}
// ==========================================
// สร้างเส้นทางการผสมสี
// ==========================================

function getMixingPath(colorName) {

    if (!colorName) {
        return null;
    }


    // --------------------------------------
    // ตรวจสอบ Mixing Knowledge
    // --------------------------------------

    if (!isMixingDecisionReady()) {

        console.warn(
            "⚠️ Mixing Knowledge ยังไม่พร้อมใช้งาน"
        );

        return null;
    }


    const knowledge =
        findMixingKnowledge(colorName);


    if (!knowledge) {
        return null;
    }


    // ======================================
    // สร้างรายการส่วนผสม
    // ======================================

    let ingredients = [];


    // --------------------------------------
    // กรณีสีที่มี ingredients โดยตรง
    // เช่น สีขั้นที่ 2 / สีขั้นที่ 3
    // --------------------------------------

    if (
        Array.isArray(knowledge.ingredients)
    ) {

        ingredients =
            [...knowledge.ingredients];

    }


    // --------------------------------------
    // กรณีสีอ่อน
    // เช่น ชมพู = แดง + ขาว
    // ฟ้าอ่อน = น้ำเงิน + ขาว
    // --------------------------------------

    else if (
        knowledge.base &&
        knowledge.modifier
    ) {

        ingredients = [

            knowledge.base,
            knowledge.modifier

        ];

    }


    // ======================================
    // กรณีข้อมูลมี base แต่ไม่มี modifier
    // ======================================

    else if (knowledge.base) {

        ingredients = [

            knowledge.base

        ];

    }


    // ======================================
    // สร้างผลลัพธ์มาตรฐาน
    // ======================================

    return {

        color: colorName,

        ingredients:
            ingredients,

        ratio:
            knowledge.ratio || [50, 50],

        type:
            knowledge.type || "unknown",

        base:
            knowledge.base || null,

        modifier:
            knowledge.modifier || null,

        purpose:
            knowledge.purpose || null

    };

}
// ==========================================
// ColorSense AI
// Mixing Decision Engine
// Version 4.0.3F
// ==========================================


// ==========================================
// ตัดสินใจแนวทางการผสมสี
// ==========================================

function getMixingDecision(colorName) {

    // --------------------------------------
    // ตรวจสอบชื่อสี
    // --------------------------------------

    if (!colorName) {

        return {

            found: false,

            color: null,

            ingredients: [],

            ratio: [],

            type: "unknown"

        };

    }


    // ======================================
    // ใช้เส้นทางการผสมสีที่มีอยู่แล้ว
    // ======================================

    const path =
        getMixingPath(colorName);


    // --------------------------------------
    // ไม่พบข้อมูล
    // --------------------------------------

    if (!path) {

        return {

            found: false,

            color: colorName,

            ingredients: [],

            ratio: [],

            type: "unknown"

        };

    }


    // ======================================
    // ส่งผลการตัดสินใจ
    // ======================================

    return {

        found: true,

        color:
            path.color,

        ingredients:
            path.ingredients,

        ratio:
            path.ratio,

        type:
            path.type,

        base:
            path.base,

        modifier:
            path.modifier,

        purpose:
            path.purpose

    };

}