// https://stackoverflow.com/questions/16155592/negative-numbers-to-binary-string-in-javascript
// https://www.w3schools.com/js/js_bitwise.asp

export const getBinaryOfNum = (num) => (num >>> 0).toString(2);

export const convertBinarytoArray = (ruleNum, arrLength = undefined) => {
	const binaryStr = getBinaryOfNum(ruleNum);

	const splitBinaryArr = binaryStr.split('').map((str) => parseInt(str, 2));

	if (arrLength) {
		return [...new Array(arrLength - splitBinaryArr.length).fill(0), ...splitBinaryArr];
	}

	return splitBinaryArr;
};

export const getRule = (rule) => {
	const caRule = convertBinarytoArray(rule, 8);
	return caRule;
};
