// ==========================================
// ColorSense AI
// AI Coach Engine
// Version 4.0.1
// ==========================================

const aiCoachMessage =
    document.getElementById("aiCoachMessage");


// ==========================================
// ColorSense AI
// AI Coach V4.1
// Color Path Intelligence
// ==========================================

// ==========================================
// ดึงสีที่อยู่ในเส้นทางการผสม
// ==========================================

function getAllowedMixingColors(colorName) {

    if (!colorName) {
        return [];
    }

    const decision =
        getMixingDecision(colorName);

    if (!decision || !decision.found) {
        return [];
    }

    let colors = [];

    // --------------------------------------
    // ส่วนผสมหลัก
    // --------------------------------------

    if (Array.isArray(decision.ingredients)) {

        colors.push(
            ...decision.ingredients
        );

    }

    // --------------------------------------
    // base / modifier
    // --------------------------------------

    if (decision.base) {

        colors.push(
            decision.base
        );

    }

    if (decision.modifier) {

        colors.push(
            decision.modifier
        );

    }

    // --------------------------------------
    // ลบข้อมูลซ้ำ
    // --------------------------------------

    return [
        ...new Set(colors)
    ];

}
// ==========================================
// V4.1 STEP 2
// Intelligent Mixing Direction Engine
// ==========================================

function getIntelligentMixingDirection(
    rgb,
    reference,
    mixingPath
) {

   if (
    !rgb ||
    !reference ||
    !Array.isArray(mixingPath)
) {

    return {

        differences: [],

        primaryDirection: {
            action: "none",
            channel: null,
            difference: 0
        },

        mixingPath: []

    };

}

    // --------------------------------------
    // คำนวณความแตกต่าง RGB
    // --------------------------------------

    const dR = rgb.r - reference.r;
    const dG = rgb.g - reference.g;
    const dB = rgb.b - reference.b;


    const absR = Math.abs(dR);
    const absG = Math.abs(dG);
    const absB = Math.abs(dB);


    // --------------------------------------
    // เรียงช่องสีที่คลาดเคลื่อนมากที่สุด
    // --------------------------------------

    const differences = [

        {
            channel: "R",
            value: dR,
            abs: absR
        },

        {
            channel: "G",
            value: dG,
            abs: absG
        },

        {
            channel: "B",
            value: dB,
            abs: absB
        }

    ];


    differences.sort(
        (a, b) => b.abs - a.abs
    );


    // --------------------------------------
    // วิเคราะห์สีหลักที่ควรปรับ
    // --------------------------------------

    let primaryDirection = null;


    const largest =
        differences[0];


    if (largest.abs <= 5) {

        primaryDirection = {

            action: "none",

            channel: largest.channel,

            difference: largest.value

        };

    }

    else if (largest.channel === "R") {

        primaryDirection = {

            action:
                largest.value > 0
                    ? "decrease_red"
                    : "increase_red",

            channel: "R",

            difference: largest.value

        };

    }

    else if (largest.channel === "G") {

        primaryDirection = {

            action:
                largest.value > 0
                    ? "decrease_green"
                    : "increase_green",

            channel: "G",

            difference: largest.value

        };

    }

    else if (largest.channel === "B") {

        primaryDirection = {

            action:
                largest.value > 0
                    ? "decrease_blue"
                    : "increase_blue",

            channel: "B",

            difference: largest.value

        };

    }


    // --------------------------------------
    // คืนค่าผลการวิเคราะห์
    // --------------------------------------

    return {

        differences,

        primaryDirection,

        mixingPath

    };

}
// ==========================================
// ColorSense AI
// V4.1 STEP 3
// Mixing Path Recommendation
// ==========================================

// ==========================================
// ColorSense AI
// V4.1 STEP 3.1
// Mixing Path Recommendation
// ==========================================

function getMixingPathRecommendation(
    rgb,
    reference,
    mixingPath,
    intelligentDirection
){

    // --------------------------------------
    // ตรวจสอบข้อมูล
    // --------------------------------------

    if(
        !rgb ||
        !reference ||
        !Array.isArray(mixingPath) ||
        !intelligentDirection ||
        !intelligentDirection.primaryDirection
    ){

        return [];

    }


    const recommendations = [];


    // --------------------------------------
    // Primary Direction
    // --------------------------------------

    const primaryDirection =
        intelligentDirection.primaryDirection;


    const action =
        primaryDirection.action;


    const channel =
        primaryDirection.channel;


    const difference =
        primaryDirection.difference;


    // ======================================
    // ตรวจสอบเฉพาะสีที่อยู่ใน Mixing Path
    // ======================================

    // --------------------------------------
    // 🔴 สีแดง
    // --------------------------------------

    if(
        channel === "R" &&
        mixingPath.includes("แดง")
    ){

        if(action === "increase_red"){

            recommendations.push({

                color: "แดง",

                action: "เพิ่มเล็กน้อย",

                direction: "increase",

                channel: "R",

                difference: difference

            });

        }

        else if(action === "decrease_red"){

            recommendations.push({

                color: "แดง",

                action: "ลดเล็กน้อย",

                direction: "decrease",

                channel: "R",

                difference: difference

            });

        }

    }


    // --------------------------------------
    // 🟢 สีเขียว
    // --------------------------------------

    else if(
        channel === "G" &&
        mixingPath.includes("เขียว")
    ){

        if(action === "increase_green"){

            recommendations.push({

                color: "เขียว",

                action: "เพิ่มเล็กน้อย",

                direction: "increase",

                channel: "G",

                difference: difference

            });

        }

        else if(action === "decrease_green"){

            recommendations.push({

                color: "เขียว",

                action: "ลดเล็กน้อย",

                direction: "decrease",

                channel: "G",

                difference: difference

            });

        }

    }


    // --------------------------------------
    // 🔵 สีน้ำเงิน
    // --------------------------------------

    else if(
        channel === "B" &&
        mixingPath.includes("น้ำเงิน")
    ){

        if(action === "increase_blue"){

            recommendations.push({

                color: "น้ำเงิน",

                action: "เพิ่มเล็กน้อย",

                direction: "increase",

                channel: "B",

                difference: difference

            });

        }

        else if(action === "decrease_blue"){

            recommendations.push({

                color: "น้ำเงิน",

                action: "ลดเล็กน้อย",

                direction: "decrease",

                channel: "B",

                difference: difference

            });

        }

    }


    // --------------------------------------
    // 🟡 สีเหลือง
    // --------------------------------------

    else if(
        channel === "R" &&
        mixingPath.includes("เหลือง")
    ){

        if(action === "increase_red"){

            recommendations.push({

                color: "เหลือง",

                action: "เพิ่มเล็กน้อย",

                direction: "increase",

                channel: "R",

                difference: difference

            });

        }

        else if(action === "decrease_red"){

            recommendations.push({

                color: "เหลือง",

                action: "ลดเล็กน้อย",

                direction: "decrease",

                channel: "R",

                difference: difference

            });

        }

    }


    // --------------------------------------
    // ⚪ สีขาว
    // --------------------------------------

    else if(
        channel === "brightness" &&
        mixingPath.includes("ขาว")
    ){

        if(
            action === "increase_brightness"
        ){

            recommendations.push({

                color: "ขาว",

                action: "เพิ่มเล็กน้อย",

                direction: "increase",

                channel: "brightness",

                difference: difference

            });

        }

        else if(
            action === "decrease_brightness"
        ){

            recommendations.push({

                color: "ขาว",

                action: "ลดเล็กน้อย",

                direction: "decrease",

                channel: "brightness",

                difference: difference

            });

        }

    }


    // ======================================
    // คืนค่าคำแนะนำ
    // ======================================

    return recommendations;

}
// ==========================================
// AI COACH ENGINE
// ==========================================

function updateAICoach(
    rgb,
    reference,
    similarity,
    attempt,
    referenceColorName
) {

    // --------------------------------------
    // ตรวจสอบข้อมูล
    // --------------------------------------

    if (!rgb || !reference || !aiCoachMessage) {

        if (aiCoachMessage) {
            aiCoachMessage.textContent =
                "รอการทดลองครั้งที่ 1...";
        }

        return;
    }
// ==========================================
// V4.1 — Color Path Intelligence
// ==========================================

const allowedMixingColors =
    getAllowedMixingColors(
        referenceColorName
    );

console.log(
    "🎯 AI Coach Target:",
    referenceColorName
);

console.log(
    "🧪 Allowed Mixing Colors:",
    allowedMixingColors
);
      // ======================================
    // Mixing Knowledge
    // ======================================

    let mixingDecision = null;

    if (referenceColorName) {

        mixingDecision =
            getMixingDecision(referenceColorName);

    }


    // ======================================
    // คำนวณความแตกต่าง RGB
    // ======================================

    const dR = rgb.r - reference.r;
    const dG = rgb.g - reference.g;
    const dB = rgb.b - reference.b;


    const absR = Math.abs(dR);
    const absG = Math.abs(dG);
    const absB = Math.abs(dB);


    // ======================================
    // วิเคราะห์ความสว่าง
    // ======================================

    const studentBrightness =
        (rgb.r + rgb.g + rgb.b) / 3;

    const referenceBrightness =
        (
            reference.r +
            reference.g +
            reference.b
        ) / 3;

    const brightnessDifference =
        studentBrightness -
        referenceBrightness;


    // ======================================
    // เริ่มสร้างข้อความ AI
    // ======================================

    let message = "";

    message +=
        "🤖 AI ครูสอนผสมสี\n\n";

    message +=
        `🧪 ผลการทดลองครั้งที่ ${attempt}\n`;

    message +=
        `🏆 ความเหมือน ${similarity.toFixed(2)}%\n\n`;


    // ======================================
    // RGB ต้นแบบ
    // ======================================

    message +=
        "🎯 RGB ต้นแบบ\n";

    message +=
        `${reference.r} | ${reference.g} | ${reference.b}\n\n`;


    // ======================================
    // RGB นักเรียน
    // ======================================

    message +=
        "🎨 RGB ของนักเรียน\n";

    message +=
        `${rgb.r} | ${rgb.g} | ${rgb.b}\n\n`;
        // ==========================================
// Mixing Recommendation
// ==========================================

if (
    mixingDecision &&
    mixingDecision.found
) {

    message +=
        "🧪 แนวทางการผสมสี\n\n";

    message +=
        `🎯 สีเป้าหมาย : ${mixingDecision.color}\n`;

    message +=
        `🎨 สีที่ใช้ : ${mixingDecision.ingredients.join(" + ")}\n`;

    if (mixingDecision.ratio) {

        message +=
            `⚖️ อัตราส่วนเริ่มต้น : ` +
            `${mixingDecision.ratio[0]} : ` +
            `${mixingDecision.ratio[1]}\n`;

    }

    if (mixingDecision.purpose) {

        message +=
            `💡 ${mixingDecision.purpose}\n`;

    }

    message += "\n";

}
 
    // ======================================
    // ระดับความใกล้เคียง
    // ======================================

    if (similarity >= 98) {

        message +=
            "🏆 ระดับดีเยี่ยม\n";

        message +=
            "🎉 สีใกล้เคียงต้นแบบมากที่สุด\n";

        message +=
            "✅ แนะนำให้หยุดเติมสี\n";

        message +=
            "⭐ สามารถนำสีไปใช้งานได้\n\n";

    }

    else if (similarity >= 95) {

        message +=
            "🟢 ระดับดีมาก\n";

        message +=
            "🎨 สีใกล้เคียงต้นแบบมาก\n\n";

    }

    else if (similarity >= 85) {

        message +=
            "🟡 ระดับใกล้เคียงมาก\n";

        message +=
            "🎨 ปรับสีเพียงเล็กน้อย\n\n";

    }

    else if (similarity >= 70) {

        message +=
            "🟠 ระดับเริ่มใกล้เคียง\n";

        message +=
            "🔄 ค่อย ๆ ปรับสีทีละน้อย\n\n";

    }

    else {

        message +=
            "🔴 ระดับแตกต่างจากต้นแบบมาก\n";

        message +=
            "🔄 ควรปรับส่วนผสมหลายจุด\n\n";
    }


// ==========================================
// V4.1 — Mixing Knowledge Guided
// ==========================================

// ------------------------------------------
// Mixing Path
// ------------------------------------------

const mixingPath =
    getAllowedMixingColors(
        referenceColorName
    );

console.log(
    "🎨 Mixing Path:",
    mixingPath
);


// ==========================================
// V4.1 STEP 2
// Intelligent Direction Analysis
// ==========================================

const intelligentDirection =
    getIntelligentMixingDirection(
        rgb,
        reference,
        mixingPath
    );

console.log(
    "🧠 Intelligent Direction:",
    intelligentDirection
);


// ==========================================
// V4.1 STEP 3
// Mixing Path Recommendation
// ==========================================

const mixingRecommendations =
    getMixingPathRecommendation(
        rgb,
        reference,
        mixingPath,
        intelligentDirection
    );

console.log(
    "💡 Mixing Recommendations:",
    mixingRecommendations
);


// ==========================================
// ตรวจสอบ Intelligent Direction
// ==========================================

if (intelligentDirection) {

    console.log(
        "🔍 Differences:",
        intelligentDirection.differences
    );

    console.log(
        "🎯 Primary Direction:",
        intelligentDirection.primaryDirection
    );

    console.log(
        "🧪 Mixing Path:",
        intelligentDirection.mixingPath
    );

}

else {

    console.log(
        "ℹ️ Intelligent Direction ไม่มีข้อมูลสำหรับสีนี้"
    );

}
// ==========================================
// V4.1 STEP 2.4
// Intelligent Mixing Explanation
// ==========================================

const primaryDirection =
    intelligentDirection.primaryDirection;

const directionAction =
    primaryDirection.action;

const directionChannel =
    primaryDirection.channel;

const directionDifference =
    primaryDirection.difference;

// ==========================================
// V4.1 STEP 4
// Smart AI Coach Message
// ==========================================


const differences =
    intelligentDirection.differences;

const smartMixingPath =
    intelligentDirection.mixingPath;


// ==========================================
// วิเคราะห์ทิศทางหลัก
// ==========================================

message +=
    "🧠 การวิเคราะห์อัจฉริยะ\n\n";


// ------------------------------------------
// กรณีสีใกล้เคียงมาก
// ------------------------------------------

if (
    primaryDirection.action === "none"
) {

    message +=
        "✅ สีโดยรวมใกล้เคียงสีต้นแบบมากแล้ว\n";

    message +=
        "🎯 ยังไม่จำเป็นต้องเพิ่มหรือลดสีหลัก\n";

}


// ------------------------------------------
// กรณีต้องเพิ่มสี
// ------------------------------------------

else if (
    primaryDirection.action === "increase_red"
) {

    message +=
        "🔴 AI วิเคราะห์ว่าโทนแดงยังน้อยเกินไป\n";

    message +=
        "💡 เพิ่มสีแดงเล็กน้อย\n";

}

else if (
    primaryDirection.action === "increase_green"
) {

    message +=
        "🟢 AI วิเคราะห์ว่าโทนเขียวยังน้อยเกินไป\n";

    message +=
        "💡 เพิ่มสีเขียวเล็กน้อย\n";

}

else if (
    primaryDirection.action === "increase_blue"
) {

    message +=
        "🔵 AI วิเคราะห์ว่าโทนน้ำเงินยังน้อยเกินไป\n";

    message +=
        "💡 เพิ่มสีน้ำเงินเล็กน้อย\n";

}


// ------------------------------------------
// กรณีต้องลดสี
// ------------------------------------------

else if (
    primaryDirection.action === "decrease_red"
) {

    message +=
        "🔴 AI วิเคราะห์ว่าโทนแดงมากเกินไป\n";

    message +=
        "💡 ลดสีแดงเล็กน้อย\n";

}

else if (
    primaryDirection.action === "decrease_green"
) {

    message +=
        "🟢 AI วิเคราะห์ว่าโทนเขียวมากเกินไป\n";

    message +=
        "💡 ลดสีเขียวเล็กน้อย\n";

}

else if (
    primaryDirection.action === "decrease_blue"
) {

    message +=
        "🔵 AI วิเคราะห์ว่าโทนน้ำเงินมากเกินไป\n";

    message +=
        "💡 ลดสีน้ำเงินเล็กน้อย\n";

}


message += "\n";


// ==========================================
// Mixing Path
// ==========================================



message += "\n";

    // ======================================
    // วิเคราะห์ความสว่าง
    // ======================================

    if (brightnessDifference < -8) {

        message +=
            "🌑 สีโดยรวมเข้มเกินไป\n";

        message +=
            "💡 ลองเติมสีขาวทีละน้อย\n\n";

    }

    else if (brightnessDifference > 8) {

        message +=
            "☀️ สีโดยรวมสว่างเกินไป\n";

        message +=
            "💡 ลองเพิ่มสีที่เข้มกว่าเล็กน้อย\n\n";
    }


    // ======================================
    // คำแนะนำตามระดับคะแนน
    // ======================================

    message +=
        "🧪 คำแนะนำ\n";


    if (similarity < 70) {

        message +=
            "🔄 ปรับสีทีละขั้น อย่าเติมหลายสีพร้อมกัน\n";

        message +=
            "📷 จากนั้นสแกนสีใหม่อีกครั้ง\n";

    }

    else if (similarity < 85) {

        message +=
            "🔄 สีเริ่มใกล้ต้นแบบแล้ว\n";

        message +=
            "💡 ปรับตามลูกศรทีละเล็กน้อย\n";

    }

    else if (similarity < 95) {

        message +=
            "🎯 ใกล้ต้นแบบมากแล้ว\n";

        message +=
            "💡 ปรับเฉพาะสีที่มีลูกศร ↑ หรือ ↓\n";

    }

    else if (similarity < 98) {

        message +=
            "⭐ สีใกล้เคียงมาก\n";

        message +=
            "💡 เติมสีเพียงเล็กน้อย แล้วทดลองใหม่\n";

    }

    else {

        message +=
            "🏆 สีอยู่ในระดับดีเยี่ยม\n";

        message +=
            "🛑 หยุดเติมสีเพื่อรักษาสีที่ได้\n";
    }


    // ======================================
    // แสดงผล AI Coach
    // ======================================

    aiCoachMessage.textContent =
        message;

}