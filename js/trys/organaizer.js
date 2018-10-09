const month_names = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];
const records = {
    '2018': {       // year
        '1': {      // month
            '15': [ // day
                'Купить слона',
                'Сдать отчёт'
            ]
        },
        '9': {      // month
            '27': [ // day
                'Написать диплом',
                'Написать диплом',
                'Написать диплом',
                'Написать диплом',
                'Написать диплом',
                'Съебать их техникума'
            ],
            '1': [
                'Прийти в тех',
                'Попердеть'
            ]
        },
        '10': {      // month
            '27': [ // day
                'Написать диплом',
                'Написать диплом',
                'Написать диплом',
                'Написать диплом',
                'Съебать из техникума'
            ],
            // '3': [
            //     'Дописать органазйер',
            //     'Дописать органазйер',
            //     'Сидеть-пердеть'
            // ],
            '5': [
                'Пердеть еще',
                'Пердеть еще',
                'Пердеть еще',
                'Пердеть еще',
                'Пердеть еще',
                'Пердеть еще',
                'Пердеть еще',
                'Пердеть еще',

            ],
            '9': [
                'Пердеть еще',
                'Пердеть еще',
                'Пердеть еще',
                'Пердеть еще',
                'Пердеть еще',
                'Пердеть еще',
                'Пердеть еще',
                'Пердеть еще',

            ],
        }
    }
};

class Task extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            checked: false,
            edit: false,
        }
    }
    checked(){
        this.setState({
            checked: !this.state.checked
        });
    }
    edit(){
        this.setState({
            edit: true
        });
    }
    save(){
        this.setState({
            edit: false
        });
        this.props.editTask(this.props.val,this.refs.newvalue.value);
    }
    deleteTask(){
        this.props.deleteTask(this.props.val);
    }
    render() {
        let styles = {
            textDecoration: 'none'
        };
        if(this.state.checked){
            styles = {
                textDecoration: 'line-through'
            };
        }
        if(!this.state.edit){
            return (
                <div className='bg-dark text-light p-3 rounded mb-1'>
                    <h6 className='mt-1 mb-1 float-left' style={styles}>
                        {this.props.val+1}) {this.props.item}
                    </h6>
                    <div className="btn-group float-right" role="group" aria-label="Actions">
                        <button type="button" onClick={this.deleteTask.bind(this)} className="btn btn-secondary"><i className='fa fa-trash'></i></button>
                        <button type="button" onClick={this.edit.bind(this)} className="btn btn-secondary"><i className='fa fa-pen-square'></i></button>
                        <button type="button" onClick={this.checked.bind(this)} className="btn btn-secondary"><i className='fa fa-check'></i></button>
                    </div>
                    <div className="clearfix"></div>
                </div>
            )
        }else {
            return (
                <div className='bg-dark text-light p-3 rounded mb-1'>
                    <div className="input-group">
                        <input ref='newvalue' defaultValue={this.props.item} type="text" className='task-text bg-dark text-light form-control border-secondary' />
                        <div className="input-group-append"><button onClick={this.save.bind(this)} className='btn btn-secondary'><i className="fas fa-save"></i></button></div>
                    </div>
                    <div className="clearfix"></div>
                </div>
            )
        }


    }
}
class Tasks extends React.Component {
    constructor(props){
        super(props);
    }
    newTaskChange(e) {
        this.props.newTaskChanged(e.target.value);
    }
    render(){
        return (
            <div style={{height:'446px'}}>
                    <div className="bg-dark text-light rounded p-2 mb-3 mt-3">
                        <div className="input-group" style={{height:'44px'}}>
                            <input type="text" ref='newtasktext' value={this.props.newTaskText} onChange={this.newTaskChange.bind(this)} className="form-control bg-dark text-light border-secondary" placeholder="Новая задача" />
                            <div className="input-group-append">
                                <button className="btn btn-secondary text-light" onClick={this.props.addNewTask.bind(null)} type="button"><i className="fa fa-plus-square"></i></button>
                            </div>
                        </div>
                    </div>
                    <div style={{height: '370px', overflowY:'scroll', marginRight: '-10px'}} className={'scrollbar-secondary pr-1'}>
                        {this.props.tasks !== undefined ? this.props.tasks.map((item, i) => { return (<Task key={i} val={i} item={item} editTask={this.props.editTask.bind(this)} deleteTask={this.props.deleteTask.bind(this)} />) }): ''}
                        </div>
            </div>
        )
    }
}
class Month extends React.Component {
    constructor(props) {
        super(props);
    }
    getDaysInMonth() {
        return new Date(this.props.year, this.props.month + 1, 0).getDate();
    }
    dayClick(i) {;
        this.props.onday(i);
    }
    render() {
        const tdCount = 7;
        const trCount = Math.ceil(this.getDaysInMonth()/tdCount);
        let content = [];
        let index = 1;
        let end = this.getDaysInMonth();
        for(var i = 0; i < trCount; i++){
            let row = [];
            for(var j = 0; j < tdCount; j++) {
                if(index > end) {
                    row.push(<td key={index}></td>);
                }else {
                    let classes = 'btn text-center rounded border-secondary w-100';
                    if(this.props.day == index) {
                        classes += ' btn-light'
                    }else {
                        classes += ' btn-dark'
                    }
                    row.push(<td key={index} className='text-center'><button className={classes} onClick={this.dayClick.bind(this, index)} style={{width: '50px', height:'50px'}}>{index}</button></td>);
                }
                index++;
            }
            content.push(<tr key={index}>{row}</tr>);
        }

        return (
            <div className='' style={{height: '370px'}}>
                <table className='table mt-3 table-dark table-borderless rounded' style={{backgroundColor: '#343a40'}}>
                    <tbody>
                    {content}
                    </tbody>
                </table>
            </div>

        );

    }
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            records: this.props.records,
            curYear: new Date().getFullYear(),
            curMonth: new Date().getMonth(),
            curDay: new Date().getDate(),
            showTasks: true,
            newText: '',
        }
    }
    newTaskChanged(task){
        this.setState({
            newText: task
        });
    }
    addTask(){
        const year = this.state.curYear;
        const month = this.state.curMonth + 1;
        const day = this.state.curDay;
        if(day != 0) {
            if(records[year] === undefined){
                records[year] = {};
                records[year][month] = {};
                records[year][month][day] = [];
            }else {
                if(records[year][month] === undefined) {
                    records[year][month] = {};
                    records[year][month][day] = [];
                }else {

                    if(records[year][month][day] === undefined) {
                        records[year][month][day] = [];
                    }

                }
            }
            records[year][month][day].push(this.state.newText);
            this.setState({
                records: this.state.records
            });
        }
        this.setState({
            newText: '',
        });

    }
    nextMonth() {
        this.setState({
            newText: ''
        });
        if(this.state.curMonth === 11) {
            this.setState({
                curYear: this.state.curYear + 1,
                curMonth: 0
            });
        }else {
            this.setState({
                curMonth: this.state.curMonth + 1
            });
        }
        this.setState({
            curDay: 0,
            showTasks: false,
        });
    }
    previousMonth() {
        if(this.state.curMonth == 0) {
            this.setState({
                curYear: this.state.curYear - 1,
                curMonth: 11
            });
        }else {
            this.setState({
                curMonth: this.state.curMonth - 1
            });
        }
        this.setState({
            curDay: 0,
            showTasks: false,
        });
        this.setState({
            newText: ''
        });
    }
    changeCurDay(day){
        this.setState({
            newText: ''
        });
        this.setState({
            curDay: day,
        });
    }
    deleteTask(index){
        const year = this.state.curYear;
        const month = this.state.curMonth + 1;
        const day = this.state.curDay;
        this.state.records[year][month][day].splice(index,1);
        this.setState({
            records: this.state.records
        });
    }
    updateTask(index, text) {
        const year = this.state.curYear;
        const month = this.state.curMonth + 1;
        const day = this.state.curDay;
        this.state.records[year][month][day][index] = text;
        this.setState({
            records: this.state.records
        });
    }
    render() {
        let propsTask = [];
        if(this.props.records[this.state.curYear] !== undefined) {
            if(this.props.records[this.state.curYear][this.state.curMonth+1] !== undefined) {
                if(this.props.records[this.state.curYear][this.state.curMonth+1][this.state.curDay] !== undefined) {
                    propsTask = this.props.records[this.state.curYear][this.state.curMonth+1][this.state.curDay];
                }
            }
        }


        return (
            <div className='text-center mt-3'>
                <div className="mx-3 card card-body border-secondary pb-0  ml-lg-auto mr-xs-auto mr-lg-auto ml-xs-auto" style={{maxWidth:'1110px'}}>
                    <nav className="navbar navbar-dark bg-dark rounded justify-content-center">
                        <a className="navbar-brand" href="#">
                            <i className='fab fa-react fa-lg'></i> Organizer
                        </a>
                    </nav>
                    <div className="row mb-3">
                        <div className="col-12 col-lg-6 col-xs-6">
                            <nav className="navbar navbar-dark bg-dark rounded mt-3" style={{width: 'auto'}}>
                                <button className='btn btn-dark' onClick={this.previousMonth.bind(this)}><i className='fas fa-angle-left'></i></button>
                                <h4 className='text-white d-inline mt-2'>{month_names[this.state.curMonth]}, {this.state.curYear}</h4>
                                <button className='btn btn-dark' onClick={this.nextMonth.bind(this)}><i className='fas fa-angle-right'></i></button>
                            </nav>
                            <Month
                                year={this.state.curYear}
                                month={this.state.curMonth}
                                day={this.state.curDay}
                                onday={this.changeCurDay.bind(this)}
                            />
                        </div>
                        <div className="col-12 col-lg-6 col-xs-6">
                            <Tasks
                                tasks={propsTask}
                                newTaskText={this.state.newText}
                                newTaskChanged={this.newTaskChanged.bind(this)}
                                showTasks={this.state.showTasks}
                                addNewTask={this.addTask.bind(this)}
                                editTask={this.updateTask.bind(this)}
                                deleteTask={this.deleteTask.bind(this)}
                            />
                        </div>
                    </div>



                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App records={records}/>,
    document.querySelector('#app')
);