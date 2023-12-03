const problemData = {
	'1': {
		title: '장현이가 대충 만든 문제',
		description: `
		장현이는 기말 프로젝트의 추가하기위해 문제를 대충 만든다.\n
		앗! 문제를 대충 만들다가 문제를 잘못 만들었다. 이 문제를 해결해주자.\n
		입력은 첫 줄에는 정수의 개수 N이 주어지고, 두 번째 줄에는 N개의 정수가 주어진다.\n
		출력에는 M개의 정수를 출력한다.\n
		`,
		difficulty: 'Silver',
		input: `5\n1 3 4 2 5`,
		output: '5 4 3 2 1',
		solved: false,
		algorithms: ['정렬'],
	},
	'2': {
		title: '음악만이 나라에서 허락한 유일한 보약이니까',
		description: `
		장현이는 요즘 새벽에 코딩을 하면서 노래를 듣는다.
		특히 자주듣는 노래가 있는데, 안타깝게도 제목을 잊어버렸다.
		아래 가사를 보고 제목을 맞춰보자.
		
		------------------------
		Cilla 계속 이곳에 서서
		Cilla 언제나 기다렸어
		Cilla 내 손을 잡아

		Cilla 저 텅 빈 땅 위에는
		Cilla 너와 나만이 있어
		Cilla 빛은 더 밝아와
		밝게 빛나는 물 위에
		비추는 모든 게 다
		우리 거야

		머릿속에 그렸던 흐린 그림은
		이제 눈앞으로 와
		문이 될 거야
		------------------------
		`,
		difficulty: 'Bronze',
		input: 'Snow',
		output: 'Wrong Answer',
		solved: false,
		algorithms: ['애드혹'],
	},
	'3': {
		title: '제목 3',
		description: 'This is the third problem.',
		difficulty: 'Gold',
		input: '5\n1 2 3 4 5',
		output: '3 7',
		solved: false,
		algorithms: ['수학'],
	},
}
export default problemData;