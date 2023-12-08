// problemData.js
const problemData = {
	'1': {
		title: '형진이의 정렬',
		description: `
		요즘 형진이는 장현이에게 알고리즘 과외를 받고있다.
		오늘은 정렬을 배우는 날이다.
		장현이는 형진이에게 다음과 같은 문제를 주었다.
		
		"주어진 수열을 내림차순으로 정렬하시오."
		
		형진이는 이 문제를 풀 수 있을까?
		형진이를 도와 문제를 풀어주자.
		
		`,
		difficulty: 'Silver',
		inputLimit: '첫 번째 줄에 수열의 크기 N이 주어진다. (1 ≤ N ≤ 10)\n두 번째 줄에 N개의 정수가 주어진다. 이 수는 모두 1 이상 100 이하이다.',
		ouputLimit: '주어진 수열을 내림차순으로 정렬한 결과를 출력한다.',
		exinput: `5\n1 3 4 2 5`,
		exoutput: '5 4 3 2 1',
		input:["5 1 3 4 2 5", "10 1 2 3 4 5 6 7 8 9 10", "1 10"],
		output:["5 4 3 2 1", "10 9 8 7 6 5 4 3 2 1", "10"],
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
		exinput: 'Snow',
		exoutput: 'Wrong Answer',
		solved: false,
		algorithms: ['애드혹'],
	},
	'3': {
		title: '제목 3',
		description: 'This is the third problem.',
		difficulty: 'Gold',
		exinput: '5\n1 2 3 4 5',
		exoutput: '3 7',
		solved: false,
		algorithms: ['수학'],
	},
}
export default problemData;