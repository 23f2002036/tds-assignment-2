const quizEl = document.getElementById('quiz')
const scoreEl = document.getElementById('score')
const resetBtn = document.getElementById('resetBtn')

const questions = [
	{
		q: 'Which instrument measures atmospheric pressure?',
		options: ['Barometer','Thermometer','Odometer','Manometer','Anemometer'],
		correctIndex: 0
	},
	{
		q: 'Which gas makes up the largest portion of Earth’s atmosphere?',
		options: ['Oxygen','Carbon dioxide','Nitrogen','Hydrogen','Argon'],
		correctIndex: 2
	},
	{
		q: 'What is the boiling point of water at sea level?',
		options: ['90°C','100°C','120°C','80°C','212°F'],
		correctIndex: 1
	},
	{
		q: 'Which layer of the atmosphere contains the ozone layer?',
		options: ['Troposphere','Stratosphere','Mesosphere','Thermosphere','Exosphere'],
		correctIndex: 1
	},
	{
		q: 'Which unit is commonly used to measure atmospheric pressure?',
		options: ['Millibar','Joule','Watt','Kelvin','Newton'],
		correctIndex: 0
	}
]

let score = 0
let answered = new Array(questions.length).fill(false)

function renderQuiz(){
	quizEl.innerHTML = ''
	questions.forEach((item, qi) => {
		const card = document.createElement('div')
		card.className = 'card'

		const qEl = document.createElement('div')
		qEl.className = 'question'
		qEl.textContent = `${qi+1}. ${item.q}`

		const opts = document.createElement('div')
		opts.className = 'options'

		item.options.forEach((opt, oi) => {
			const btn = document.createElement('button')
			btn.className = 'option'
			btn.textContent = opt
			btn.addEventListener('click', () => handleAnswer(qi, oi, btn, opts))
			opts.appendChild(btn)
		})

		card.appendChild(qEl)
		card.appendChild(opts)
		quizEl.appendChild(card)
	})
	updateScore()
}

function handleAnswer(qIndex, optIndex, btnEl, optsContainer){
	if(answered[qIndex]) return
	answered[qIndex] = true

	const correct = questions[qIndex].correctIndex
	const children = Array.from(optsContainer.children)

	children.forEach((child, idx) => {
		child.classList.add('disabled')
		if(idx === correct){
			child.classList.add('correct')
		}
		if(idx === optIndex && idx !== correct){
			child.classList.add('incorrect')
		}
	})

	if(optIndex === correct){
		score++
	}

	updateScore()
}

function updateScore(){
	scoreEl.textContent = `Score: ${score} / ${questions.length}`
}

resetBtn.addEventListener('click', () => {
	score = 0
	answered = new Array(questions.length).fill(false)
	renderQuiz()
})

// initial render
renderQuiz()
