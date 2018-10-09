
class Task extends React.Component {
    constructor(props){
        super(props);


    };
    componentDidMount() {
        this.state = {edit:false,text:props.text,show: true,checked: false};
    }
    edit() {
        this.setState({edit:true});
    }
    save() {
        this.setState({edit:false,text:this.refs.newvalue.value});
    }
    // delete() {
    //     this.setState({
    //         show: false
    //     });
    // }
    check() {
        this.setState({
            checked: !this.state.checked,
        });
    }
    render() {
        if(this.state.show){
            if(this.state.edit) {
                return (
                    <div className="task list-group-item row">
                        <div className="input-group">
                            <input ref='newvalue' type="text" className='task-text form-control' defaultValue={this.state.text}/>
                            <div className="input-group-append"><button className='btn btn-success' onClick={this.save.bind(this)}><i className="fas fa-save"></i></button></div>
                        </div>
                    </div>
                );
            }else {
                return (
                    <div className="task list-group-item row">
                        <div className="row">
                            <input type='checkbox' className='custom-control-input' />
                            <h5 className='task-text mt-2 col' style={this.state.checked ? {'text-decoration': 'line-through'}:{}}>{this.state.text}</h5>
                            <div className="btn-group col-3">
                                <button className='btn btn-info' onClick={this.edit.bind(this)}><i className="fas fa-pen-square"></i></button>
                                <button className='btn btn-danger' onClick={this.props.ondel.bind(null, this.props.i)}><i className="fas fa-trash"></i></button>
                                <button className='btn btn-success' data-toggle="button" onClick={this.check.bind(this)}><i className='fas fa-check'></i></button>
                            </div>
                        </div>
                    </div>
                );
            }
        }else {
            return null;
        }
    }
}
class Taskerold extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tasks: ['Feed the cat', 'Buy a milk', 'Become coolest programmer'],
            new_task: ''};
    };
    handleNewTask(e){
        this.setState({
            new_task: e.target.value
        });
        console.log(this.state.tasks);
    };
    addTask(e){
        this.setState({
            tasks: this.state.tasks.concat([this.state.new_task]),
            new_task: ''
        });
    };
    showTask() {
        return this.state.tasks.map((task,i) => <Task text={task} />);
    }
    deleteTask(index) {
        this.state.tasks.splice(index,1);
        console.log(index);
        console.log(this.state.tasks);
        this.setState({
            tasks: this.state.tasks
        });
    }
    render () {
        const mytasks = this.state.tasks.map((task, i) => {
            return (<Task key={i} text={task} i={i} ondel={this.deleteTask.bind(this)} />)
        });
        return (
            <div className='app card cardbody pt-4 pb-4 pl-5 pr-5'>
                <h1>Tasks</h1>
                <div className='row form-group'>
                    <div className='input-group'>
                        <input type="text" placeholder='Enter task' value={this.state.new_task} onChange={this.handleNewTask.bind(this)} className='form-control'/>
                        <div className="input-group-append"><button className='btn btn-primary' onClick={this.addTask.bind(this)}><i className="fas fa-plus-square"></i></button></div>
                    </div>

                </div>
                <div className="task-list list-group">
                    {mytasks}
                </div>
            </div>
        )
    };
}

const tasks = ['Feed the cat', 'Buy a milk', 'Become coolest programmer'];
ReactDOM.render(
    <Taskerold tasks={tasks} />,
    document.querySelector('#app')
);
