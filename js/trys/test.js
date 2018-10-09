class Question extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            checking: false
        }
    }
    updateField(){
        this.props.onchange(this.refs.userinput.value ,this.props.index);
    }
    getAnswer() {

        return (
            <div className={this.props.useranswer == this.props.question.answer? 'alert alert-success' : 'alert alert-danger'} role="alert">
                {this.props.useranswer == this.props.question.answer? 'Ответ верный: '+this.props.question.answer:'Ответ неверный - '+this.props.useranswer+'. Правильный ответ - '+this.props.question.answer}
            </div>
        )
    }
    render() {
        return (
            <div className='card card-body mb-2'>
                <h5 className='card-title'>{this.props.question.text}</h5>
                {this.props.checking ? this.getAnswer() : <input type="text" ref='userinput' onChange={this.updateField.bind(this)} className='form-control'/>}

            </div>
        )
    }
}
class App extends React.Component {
    constructor(props){
        super(props);
        let empty_answer = [];
        for(var i = 0; i < this.props.data; i++){
            empty_answer[i] = ' ';
        }
        this.state = {
            answers: empty_answer.slice(),
            checking: false,
            error: false,
        }
    }
    updateUserAnswer(text, i) {
        this.state.answers[i] = text;
        this.setState({
            answers: this.state.answers
        });
    }
    checkAnswer(){
        if(this.state.answers.length === this.props.data.length) {
            let hasEmpty = false;
            for(var i = 0; i < this.state.answers.length;i++) {
                if(this.state.answers[i] == undefined) {
                    hasEmpty = true;
                }
            }
            if(!hasEmpty){
                this.setState({
                    checking: true,
                    error: false,
                });
            }else {
                this.setState({
                    error: 'Заполните все поля'
                });
            }
        }else {
            this.setState({
                error: 'Заполните все поля'
            });
        }

    }
    render() {
        const questions = this.props.data.map((item, i) => {
            return <Question question={item} key={i} index={i} checking={this.state.checking} useranswer={this.state.answers[i]} onchange={this.updateUserAnswer.bind(this)}/>
        });
        return (
            <div className='container'>
                <h3>Тест</h3>
                {this.state.error? <div className="alert alert-danger" role="alert">{this.state.error}</div>: ''}
                {questions}
                <button onClick={this.checkAnswer.bind(this)} className='btn btn-primary float-right'>Сдать тест</button>
            </div>
        )
    }
}

const questions = [
    {
        'text': 'Сколько обычно пальцев у человека на одной руке?',
        'answer': '5'
    },
    {
        'text': 'Кто написал лунную сонату?',
        'answer': 'Бетховен'
    },
    {
        'text': 'Кто будет следующим президентом РФ?',
        'answer': 'Путин'
    },
    {
        'text': 'Кто последний император России?',
        'answer': 'Путин'
    },
];

ReactDOM.render(
    <App data={questions} />,
    document.querySelector('#app'),
);