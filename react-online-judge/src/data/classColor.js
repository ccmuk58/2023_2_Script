const classes = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Ruby"];
const classColor = ["#cd7f32", "#6E6E6E", "#FFBF00", "#01DFA5", "#00BFFF", "#FF0040"];

export const getClassName = (exp) => {
	return classes[Math.floor(exp / 100)];
};

export const getClassColor = (exp) => {
	return classColor[classes.indexOf(getClassName(exp))];
}
export const getProblemClassColor = (difficulty) => {
	for (let i = 0; i < classes.length; i++) {
		if (difficulty === classes[i]) {
			return classColor[i];
		}
	}
}
