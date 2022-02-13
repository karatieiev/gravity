interface UsedColor {
    pointId: number,
    colorId: number
}

let usedColors: UsedColor[] = [];

export const colorsList = [
    "#f00",
    "#0a0",
    "#00f",
    "#ee0",
    "#0ff",
    "#f0f"
];

export const assignColor = (pointId: number): string => {
    for (let colorId=0; colorId<colorsList.length; colorId++) {
        if (!usedColors.filter(item => item.colorId === colorId).length) {
            usedColors.push({pointId, colorId});
            return colorsList[colorId];
        }
    }
    usedColors.push({pointId, colorId: colorsList.length-1});
    return colorsList[colorsList.length-1];
}

export const freeColor = (pointId: number) => {
    usedColors = usedColors.filter(item => item.pointId !== pointId);
}
