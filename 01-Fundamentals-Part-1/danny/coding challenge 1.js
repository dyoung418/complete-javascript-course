const markMass = 78;
const markHeight = 1.69;
const johnMass = 92;
const johnHeight = 1.95;

const markBMI = markMass / (markHeight ** 2);
const johnBMI = johnMass / (johnHeight ** 2);

const markHigherBMI = markBMI > johnBMI;

console.log(`mark: ${markBMI}, john: ${johnBMI}, mark higher: ${markHigherBMI}`);

if (markHigherBMI) {
    console.log(`Mark's BMI (${markBMI}) is higher than John's BMI (${johnBMI}).`);
} else {
    console.log(`John's BMI (${johnBMI}) is higher than Mark's BMI (${markBMI}).`);
}