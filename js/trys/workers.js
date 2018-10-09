
class App extends React.Component{
    constructor(props){
        super(props)
    }
    render () {
        return (
            <div className='container card card-body'>
                <h2>Таблица работников</h2>
                  <table className='table'>
                      <tr>
                          <th>Имя</th>
                          <th>Фамилия</th>
                          <th>Ставка за день</th>
                          <th>Кол-во дней</th>
                          <th>Зарплата</th>
                      </tr>
                      {
                          this.props.workers.map((item,i) =>
                              <Worker data={item}/>
                          )
                      }
                  </table>
            </div>
        );
    }
}

class Worker extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.data.name,
            lastname:this.props.data.lastname,
            oneday: this.props.data.oneday,
            daysworked: this.props.data.daysworked,
            zp: this.props.data.oneday * this.props.data.daysworked
        };
        this.handleZp = this.handleZp.bind(this);
    }
    handleZp(e){
        var name = e.target.getAttribute('name');
        if(name == 'oneday') {
            this.setState({
                oneday: e.target.value,
                zp: e.target.value * this.state.daysworked
            });
        }else if(name == 'daysworked'){
            this.setState({
                daysworked: e.target.value,
                zp: this.state.oneday * e.target.value
            });
        }

    }
    render(){
        return (
            <tr>
                <td>{this.state.name}</td>
                <td>{this.state.lastname}</td>
                <td><input className='form-control' name='oneday' value={this.state.oneday} onChange={this.handleZp}/></td>
                <td><input className='form-control' name='daysworked' value={this.state.daysworked} onChange={this.handleZp}/></td>
                <td>{this.state.zp}</td>
            </tr>
        )
    }
}

var workers = [
    {
        name: 'Tom',
        lastname: 'Anderson',
        oneday: 1000,
        daysworked: 5
    },
    {
        name: 'Roma',
        lastname: 'Makhalov',
        oneday: 800,
        daysworked: 3
    },
    {
        name: 'Gelya',
        lastname: 'Dusha',
        oneday: 500,
        daysworked: 10
    },
    {
        name: 'Vasya',
        lastname: 'Herov',
        oneday: 300,
        daysworked: 15
    }
];

ReactDOM.render(
    <App workers={workers} />,
    document.querySelector('#app')
);