import React,{ Component } from 'react'

export default class Counter extends Component{

    increment = ()=>{
        const {select_number} = this.refs
        this.props.increment(select_number.value*1)

    }

    decrement = ()=>{
        const {select_number} = this.refs
        this.props.decrement(select_number.value*1)

    }

    incrementIfOdd = ()=>{
        // const {select_number} = this.refs

    }

    incrementAsync = ()=>{
        // const {select_number} = this.refs

    }

    render(){
        return(
            <div>
                <span>count is {this.props.count}</span><br/>
                <select ref="select_number">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
                <button onClick={this.incrementAsync}>increment async</button>
            </div>
        )
    }
}